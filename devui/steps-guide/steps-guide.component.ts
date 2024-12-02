import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, Inject, OnDestroy, OnInit, Renderer2, TemplateRef } from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { PositionService } from 'ng-devui/position';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';
import { StepsGuideService } from './steps-guide.service';
import { ExtraConfig } from './steps-guide.types';

@Component({
  templateUrl: './steps-guide.component.html',
  styleUrls: ['./steps-guide.component.scss'],
  preserveWhitespaces: false,
})
export class StepsGuideComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class')
  get class() {
    return 'devui-step-item ' + this.position;
  }
  @HostBinding('style.display')
  get display() {
    return 'block';
  }
  triggerElement: HTMLElement;
  scrollElement: HTMLElement;
  pageName: string; // 页面名称，用于标记当页帮助信息是否关闭
  title: string; // 引导标题
  content: string | TemplateRef<any>; // 引导介绍内容
  stepsCount: number; // 总步骤数
  stepIndex: number; // 该步骤序号
  position = 'top';
  leftFix: number;
  topFix: number;
  zIndex = 1100;
  extraConfig: ExtraConfig;
  dots: Array<undefined> = [];
  subScriber: Subscription;
  SCROLL_REFRESH_INTERVAL = 100;
  i18nCommonText: I18nInterface['stepsGuide'];
  DOT_HORIZONTAL_MARGIN = 27;
  DOT_VERTICAL_MARGIN = 22;
  document: Document;

  constructor(
    private stepService: StepsGuideService,
    private renderer: Renderer2,
    private positionService: PositionService,
    private elm: ElementRef,
    private i18n: I18nService,
    @Inject(DOCUMENT) private doc: any
  ) {
    this.document = this.doc;
  }

  ngOnInit() {
    this.dots = new Array(this.stepsCount);
    this.elm.nativeElement.style.zIndex = this.zIndex;
    this.i18nCommonText = this.i18n.getI18nText().stepsGuide;
    const i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.stepsGuide;
    });

    this.subScriber = fromEvent(window, 'resize')
      .pipe(debounceTime(this.SCROLL_REFRESH_INTERVAL))
      .subscribe(() => {
        this.updatePosition();
      });
    this.subScriber.add(i18nSubscription);
  }

  ngAfterViewInit() {
    this.updatePosition();
    if (!this.scrollElement) {
      const currentScrollElement = this.positionService.getScrollParent(this.triggerElement);
      this.scrollElement = currentScrollElement === this.document.body ? window : currentScrollElement;
    }
    const scrollSubscriber = fromEvent(this.scrollElement, 'scroll')
      .pipe(throttleTime(this.SCROLL_REFRESH_INTERVAL, undefined, { leading: true, trailing: true }))
      .subscribe(() => {
        this.updatePosition();
      });
    this.subScriber.add(scrollSubscriber);
  }

  ngOnDestroy() {
    if (this.subScriber) {
      this.subScriber.unsubscribe();
    }
  }

  updatePosition() {
    const resPosition = this.position === 'right' ? 'right-top' : this.position;
    const calcPosition = this.position === 'left' ? 'left-top' : resPosition;
    const rect = this.positionService.positionElements(this.triggerElement, this.elm.nativeElement, calcPosition, true);
    const targetRect = this.triggerElement.getBoundingClientRect();
    let left = rect.left;
    let top = rect.top;

    switch (rect.placementPrimary) {
    case 'top':
      left = targetRect.left + this.triggerElement.clientWidth / 2 - this.elm.nativeElement.clientWidth / 2;
      top = top + this.triggerElement.clientHeight / 2 - this.DOT_HORIZONTAL_MARGIN;
      break;
    case 'bottom':
      left = targetRect.left + this.triggerElement.clientWidth / 2 - this.elm.nativeElement.clientWidth / 2;
      top = top + this.DOT_HORIZONTAL_MARGIN / 2;
      break;
    case 'left':
      left = left + this.triggerElement.clientWidth / 2 - this.DOT_HORIZONTAL_MARGIN;
      top = top + this.triggerElement.clientHeight / 2 - this.DOT_VERTICAL_MARGIN;
      break;
    case 'right':
      left = left - this.triggerElement.clientWidth / 2 + this.DOT_HORIZONTAL_MARGIN;
      top = top + this.triggerElement.clientHeight / 2 - this.DOT_VERTICAL_MARGIN;
      break;
    default:
    }

    switch (rect.placementSecondary) {
    case 'left':
      left = targetRect.left;
      break;
    case 'right':
      left = targetRect.left - this.elm.nativeElement.clientWidth + this.triggerElement.clientWidth;
      break;
    default:
    }

    this.renderer.setStyle(this.elm.nativeElement, 'left', `${left}px`);
    this.renderer.setStyle(this.elm.nativeElement, 'top', `${top}px`);

    if (this.leftFix) {
      this.renderer.setStyle(this.elm.nativeElement, 'marginLeft', `${this.leftFix}px`);
    }
    if (this.topFix) {
      this.renderer.setStyle(this.elm.nativeElement, 'marginTop', `${this.topFix}px`);
    }
  }

  next() {
    const newStep = (this.stepIndex + 1 < this.stepsCount && this.stepIndex + 1) || this.stepsCount - 1;
    this.stepService.setCurrentIndex(newStep);
    this.close(newStep, 'next');
  }

  prev() {
    const newStep = (this.stepIndex - 1 > 0 && this.stepIndex - 1) || 0;
    this.stepService.setCurrentIndex(newStep);
    this.close(newStep, 'prev');
  }

  closeAll() {
    try {
      localStorage.setItem(`devui_guide_${this.pageName}`, '0');
    } catch (error) {
      console.error(error);
    }
    this.close(this.stepService.getCurrentStep(), 'close');
  }

  close(step, type?) {}
}
