import { DOCUMENT } from '@angular/common';
import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { throttle } from 'lodash-es';
import { Observable, Subscription } from 'rxjs';
import { StepsGuideComponent } from './steps-guide.component';
import { StepsGuideService } from './steps-guide.service';
import {
  ExtraConfig,
  GuideOptions,
  OperateResponse,
  StepItem,
  StepsGuidePositionType
} from './steps-guide.types';

@Directive({
  selector: '[dStepsGuide]',
})
export class StepsGuideDirective implements OnInit, OnDestroy {
  // 引导页面标示，用于记录不同页面的引导状态
  @Input() pageName: string;
  @Input() steps: Array<StepItem> = [];
  // 该步骤所属序号
  @Input() stepIndex: number;

  // 弹出位置 top|bottom|bottom-left|left|right
  _dStepsGuidePosition: StepsGuidePositionType;
  @Input() set dStepsGuidePosition(pos: StepsGuidePositionType) {
    this._dStepsGuidePosition = pos;
  }
  get dStepsGuidePosition(): StepsGuidePositionType {
    return this._dStepsGuidePosition || 'top';
  }

  /**
   * @deprecated Use dStepsGuidePosition to replace.
   */
  @Input() set position(pos: StepsGuidePositionType) {
    if (!this._dStepsGuidePosition) {
      this.dStepsGuidePosition = pos;
    }
  }

  // 可选，用于修正引导位置
  @Input() leftFix = 0;
  @Input() topFix = 0;
  @Input() zIndex = 1100;
  // 引导显示的目标dom,如果指定，不在使用指令所在的dom作为目标dom
  @Input() targetElement: any;
  @Input() scrollElement: any;
  // 是否自动滚动页面至目标
  @Input() scrollToTargetSwitch = true;
  // 引导向扩展配置
  @Input() extraConfig: ExtraConfig;
  // 允许用户指定一个dom反馈页面变化，通过MutationObserver监听该dom所属节点树变化触发resize事件使引导弹窗自动修正位置
  @Input() set observerDom(dom: HTMLElement) {
    if (dom) {
      this._observerDom = dom;
      // 创建监听实例，并限制回调方法在500ms内只响应一次，避免多次响应dom变化造成性能负担
      this.observer = new MutationObserver(
        throttle(
          this.mutationCallBack,
          this.MUTATION_OBSERVER_TIME,
          { 'leading': false, 'trailing': true }
        ));
      this.observer.observe(this._observerDom, this.MUTATION_OBSERVER_CONFIG);
    } else {
      this.destroyMutationObserver(true);
    }
  }
  @Input() beforeChange: (currentIndex, targetIndex) => boolean | Promise<boolean> | Observable<boolean>;
  // 点击引导操作触发，返回当前步骤和当前操作，比如上一步、下一步、关闭
  @Output() operateChange = new EventEmitter<OperateResponse>();
  _observerDom: any;
  stepRef: ComponentRef<StepsGuideComponent>;
  observer: any;
  toggle: any;
  currentIndex: number;
  sub: Subscription = new Subscription();
  // 监听dom变化的设置，监听属性变化和dom所属节点树变化
  MUTATION_OBSERVER_CONFIG = { attributes: true, subtree: true };
  MUTATION_OBSERVER_TIME = 500;
  document: Document;

  constructor(
    private stepService: StepsGuideService,
    private elm: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private overlayContainerRef: OverlayContainerRef,
    @Inject(DOCUMENT) private doc: any
  ) {
    this.document = this.doc;
  }

  ngOnInit() {
    // 监听当前索引变化，决定显示步骤
    this.sub.add(this.stepService.currentIndex.subscribe(index => {
      this.canChange(index).then((change) => {
        if (!change) {
          return;
        }
      });
      // 防止服务中的步骤被置空或默认为空
      const serviceSteps = this.stepService.getSteps() || [];
      this.steps = serviceSteps.length > 0 ? serviceSteps : this.steps;
      const state = localStorage.getItem(`devui_guide_${this.pageName}`) || '1';
      this.toggle = Number(state);
      this.currentIndex = index;
      const currentStep = this.steps.length > 0 && this.steps[this.currentIndex];
      // 当前步骤内容存在且未被屏蔽显示且为当前索引时插入操作指引弹窗
      if (currentStep && this.toggle && this.stepIndex === this.currentIndex) {
        const targetDom = this.targetElement || this.elm.nativeElement;
        if (this.scrollToTargetSwitch) {
          targetDom.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }
        // 如果该步骤设置了监听dom和监听实例，重启监听
        if (this._observerDom && this.observer) {
          this.observer.disconnect();
          this.observer.observe(this._observerDom, this.MUTATION_OBSERVER_CONFIG);
        }
        setTimeout(() => {
          this.insert({
            triggerElement: targetDom,
            scrollElement: this.scrollElement,
            pageName: this.pageName,
            title: currentStep.title,
            content: currentStep.content,
            stepsCount: this.steps.length,
            stepIndex: this.stepIndex,
            position: this.dStepsGuidePosition,
            leftFix: this.leftFix,
            topFix: this.topFix,
            zIndex: this.zIndex,
          });
        });
      }
    }));

    // 监听切换显示和隐藏
    this.sub.add(this.stepService.showGuideObs.subscribe(visible => {
      if (visible) {
        const currentIndex = this.stepService.getCurrentStep() || 0;
        localStorage.removeItem(`devui_guide_${this.pageName}`);
        this.stepService.setCurrentIndex(currentIndex);
      } else {
        try {
          localStorage.setItem(`devui_guide_${this.pageName}`, '0');
        } catch (error) {
          console.error(error);
        }
        this.destroyView();
      }
    }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.destroyView();
  }

  destroyView() {
    if (this.stepRef) {
      this.stepRef.hostView.destroy();
    }
    this.destroyMutationObserver();
  }

  insert(option: GuideOptions) {
    const hasGuide = this.document.querySelector('body>.devui-step-item');
    if (!hasGuide) {
      this.stepRef = this.overlayContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(StepsGuideComponent));
      Object.assign(this.stepRef.instance, option, { extraConfig: this.extraConfig });
      this.stepRef.instance.close = (step, type?) => {
        this.operateChange.emit({ clickType: type, currentIndex: step });
        this.destroyView();
      };
    }
  }

  // 监听dom变化的回调方法，即dom发生变化时触发resize事件
  mutationCallBack = () => {
    if (typeof window === 'undefined') {
      return;
    }
    const resizeEvt = this.document.createEvent('Event');
    resizeEvt.initEvent('resize', true, true);
    window.dispatchEvent(resizeEvt);
  };

  // 断开监听, 清空监听dom和实例
  destroyMutationObserver(destroyAll?: boolean) {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (destroyAll) {
      this._observerDom = undefined;
      this.observer = undefined;
    }
  }

  canChange(index) {
    let changeResult = Promise.resolve(true);
    const currentIndex = this.currentIndex >= 0 ? this.currentIndex : this.stepIndex;
    if (currentIndex === index && this.beforeChange) {
      const result: any = this.beforeChange(currentIndex, index);
      if (typeof result !== 'undefined') {
        if (result.then) {
          changeResult = result;
        } else if (result.subscribe) {
          changeResult = (result as Observable<boolean>).toPromise();
        } else {
          changeResult = Promise.resolve(result);
        }
      }
    }
    return changeResult;
  }
}
