import {
  AfterViewInit,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';
import { TooltipComponent } from './tooltip.component';
import { PositionType } from './tooltip.types';

@Directive({
  selector: '[dTooltip]',
  exportAs: 'dTooltip',
})
export class TooltipDirective implements OnChanges, AfterViewInit, OnDestroy {
  @Input() content: string;
  @Input() position: PositionType | PositionType[] = 'top';
  @Input() @WithConfig() showAnimation = true;
  /**
   * @deprecated Use showAnimation to replace.
   */
  @Input() set showAnimate(isShowAnimate: any) {
    this.showAnimation = isShowAnimate;
  }
  // 防止每次鼠标不小心经过目标元素就会显示出Tooltip的内容，所以增加适当的延迟。
  @Input() mouseEnterDelay = 150;
  // 因为鼠标移出之后如果立刻消失会很突然，所以增加略小一些的延迟，使得既不突然也反应灵敏
  @Input() mouseLeaveDelay = 100;
  isEnter: boolean;
  unsubscribe$ = new Subject<void>();
  unsubscribeT$ = new Subject<void>();
  tooltipComponentRef: ComponentRef<TooltipComponent>;
  constructor(
    private triggerElementRef: ElementRef,
    private overlayContainerRef: OverlayContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private devConfigService: DevConfigService
  ) {}

  @HostListener('focus') onFocus() {
    this.show();
  }

  @HostListener('blur') onBlur() {
    this.hide();
  }

  createTooltip() {
    this.tooltipComponentRef = this.overlayContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(TooltipComponent)
    );

    this.instanceAssignValue(['content', 'position', 'showAnimation', 'triggerElementRef']);

    // 对创建的ToolTip组件添加鼠标移入和移出的监听事件
    if ((this.tooltipComponentRef.instance as any).tooltip.nativeElement) {
      this.bindMouseEvent((this.tooltipComponentRef.instance as any).tooltip.nativeElement, this.unsubscribeT$);
    }
  }

  bindMouseEvent(eventTarget: HTMLElement, unsubscribe$: Subject<unknown>) {
    fromEvent(eventTarget, 'mouseenter')
      .pipe(
        map((event) => {
          this.isEnter = true;
          return event;
        }),
        debounceTime(this.mouseEnterDelay),
        filter((event) => this.isEnter),
        takeUntil(unsubscribe$)
      )
      .subscribe(() => {
        if (!this.tooltipComponentRef) {
          this.show();
        }
      });
    fromEvent(eventTarget, 'mouseleave')
      .pipe(
        map((event) => {
          this.isEnter = false;
          return event;
        }),
        debounceTime(this.mouseLeaveDelay),
        filter((event) => !this.isEnter),
        takeUntil(unsubscribe$)
      )
      .subscribe(() => {
        this.hide();
      });
  }

  show() {
    if (!this.content) {
      return;
    }

    if (this.tooltipComponentRef) {
      this.destroy();
    }

    this.createTooltip();
    this.tooltipComponentRef.instance.onShow();
  }

  destroy() {
    if (this.tooltipComponentRef) {
      this.tooltipComponentRef.destroy();
      this.tooltipComponentRef = null;
    }
    if (this.unsubscribeT$) {
      this.unsubscribeT$.next();
      this.unsubscribeT$.complete();
    }
  }

  hide() {
    if (this.tooltipComponentRef) {
      this.tooltipComponentRef.instance.onHide();
      if (!this.showAnimation) {
        this.destroy();
        return;
      }
      this.tooltipComponentRef.instance.onHidden = () => {
        this.destroy();
      };
    }
    if (this.unsubscribeT$) {
      this.unsubscribeT$.next();
      this.unsubscribeT$.complete();
    }
  }

  instanceAssignValue(key: string | string[]): void {
    const keyArr = typeof key === 'string' ? [key] : key;
    const obj: any = {};
    keyArr.forEach((item) => {
      obj[item] = this[item];
    });
    Object.assign(this.tooltipComponentRef.instance, obj);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.tooltipComponentRef) {
      const { content, position, showAnimation } = changes;
      if (!content.currentValue) {
        this.hide();
      }

      if (content) {
        this.instanceAssignValue('content');
      }
      if (position) {
        this.instanceAssignValue('position');
      }
      if (showAnimation) {
        this.instanceAssignValue('showAnimation');
      }
    }
  }

  ngAfterViewInit() {
    if (this.triggerElementRef.nativeElement) {
      this.bindMouseEvent(this.triggerElementRef.nativeElement, this.unsubscribe$);
    }
  }

  ngOnDestroy() {
    if (this.unsubscribeT$) {
      this.unsubscribeT$.next();
      this.unsubscribeT$.complete();
    }
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.destroy();
  }
}
