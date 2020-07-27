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
  // 引导向扩展配置
  @Input() extraConfig: ExtraConfig;
  // 点击引导操作触发，返回当前步骤和当前操作，比如上一步、下一步、关闭
  @Output() operateChange = new EventEmitter<OperateResponse>();
  stepRef: ComponentRef<StepsGuideComponent>;
  toggle: any;
  currentIndex: number;
  sub: Subscription = new Subscription();

  constructor(
    private stepService: StepsGuideService,
    private elm: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private overlayContainerRef: OverlayContainerRef
  ) { }

  ngOnInit() {
    // 监听当前索引变化，决定显示步骤
    this.sub.add(this.stepService.currentIndex.subscribe(index => {
      const serviceSteps = this.stepService.getSteps() || [];
      this.steps = serviceSteps.length > 0 ? serviceSteps : this.steps;
      const state = localStorage.getItem(`devui_guide_${this.pageName}`) || 1;
      this.toggle = Number(state);
      this.currentIndex = index;
      if (this.toggle && this.stepIndex === this.currentIndex) {
        const targetDom = this.targetElement || this.elm.nativeElement;
        targetDom.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
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
        localStorage.removeItem(`devui_guide_${this.pageName}`);
        this.stepService.setCurrentIndex(this.stepService.getCurrentStep() || 0);
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
        this.stepRef.hostView.destroy();
      };
    }
  }
}
