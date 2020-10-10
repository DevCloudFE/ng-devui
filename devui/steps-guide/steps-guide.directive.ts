import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { throttle } from 'lodash-es';
import { Subscription } from 'rxjs';
import { StepsGuideService } from './steps-guide.service';
import { StepsGuideComponent } from './steps-guide.component';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { StepItem, ExtraConfig, GuideOptions, OperateResponse, StepsGuidePositionType } from './steps-guide.types';


@Directive({
  selector: '[dStepsGuide]'
})
export class StepsGuideDirective implements OnInit, OnDestroy {
  // 引导页面标示，用于记录不同页面的引导状态
  @Input() pageName: string;
  @Input() steps: Array<StepItem> = [];
  // 该步骤所属序号
  @Input() stepIndex: number;
  // 弹出位置 top|bottom|bottom-left|left|right
  @Input() position: StepsGuidePositionType = 'top';
  // 可选，用于修正引导位置
  @Input() leftFix = 0;
  @Input() topFix = 0;
  @Input() zIndex = 1100;
  // 引导显示的目标dom,如果指定，不在使用指令所在的dom作为目标dom
  @Input() targetElement;
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

  constructor(
    private stepService: StepsGuideService,
    private elm: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private overlayContainerRef: OverlayContainerRef
  ) { }

  ngOnInit() {
    // 监听当前索引变化，决定显示步骤
    this.sub.add(this.stepService.currentIndex.subscribe(index => {
      // 防止服务中的步骤被置空或默认为空
      const serviceSteps = this.stepService.getSteps() || [];
      this.steps = serviceSteps.length > 0 ? serviceSteps : this.steps;
      const state = localStorage.getItem(`devui_guide_${this.pageName}`) || 1;
      this.toggle = Number(state);
      this.currentIndex = index;
      // 当前步骤内容存在且未被屏蔽显示且为当前索引时插入操作指引弹窗
      if (this.steps.length > 0 && this.toggle && this.stepIndex === this.currentIndex) {
        const targetDom = this.targetElement || this.elm.nativeElement;
        if (this.scrollToTargetSwitch) {
          targetDom.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }
        // 如果该步骤设置了监听dom和监听实例，重启监听
        if (this._observerDom && this.observer) {
          this.observer.disconnect();
          this.observer.observe(this._observerDom, this.MUTATION_OBSERVER_CONFIG);
        }
        setTimeout(() => {
          this.insert({
            triggerElement: targetDom,
            pageName: this.pageName,
            title: this.steps[this.stepIndex].title,
            content: this.steps[this.stepIndex].content,
            stepsCount: this.steps.length,
            stepIndex: this.stepIndex,
            position: this.position,
            leftFix: this.leftFix,
            topFix: this.topFix,
            zIndex: this.zIndex
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
        localStorage.setItem(`devui_guide_${this.pageName}`, '0');
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
    const bodyDoms = Array.from(document.body.childNodes);
    const hasGuide = bodyDoms && bodyDoms.find((dom: HTMLElement) => dom.className && dom.className.indexOf('devui-step-item') >= 0);
    if (!hasGuide) {
      this.stepRef = this.overlayContainerRef.createComponent(
        this.componentFactoryResolver.resolveComponentFactory(StepsGuideComponent)
      );
      Object.assign(this.stepRef.instance, option, { extraConfig: this.extraConfig });
      this.stepRef.instance.close = (step, type?) => {
        this.operateChange.emit({ clickType: type, currentIndex: step });
        this.destroyView();
      };
    }
  }

  // 监听dom变化的回调方法，即dom发生变化时触发resize事件
  mutationCallBack() {
    const resizeEvt = new Event('resize');
    window.dispatchEvent(resizeEvt);
  }

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
}
