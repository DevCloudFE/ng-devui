import { DOCUMENT } from '@angular/common';
import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';
import { PopoverComponent } from './popover.component';
import { PopoverType, PositionType, TriggerType } from './popover.types';

@Directive({
  selector: '[dPopover]',
  exportAs: 'dPopover',
})
export class PopoverDirective implements OnInit, OnDestroy {
  popoverComponentRef: ComponentRef<PopoverComponent>;
  _content: string | HTMLElement | TemplateRef<any>;
  private subscription: Subscription = new Subscription();
  /**
   * popover内容
   */
  @Input() set content(_popoverContent) {
    this._content = _popoverContent;
    if (this.popoverComponentRef) {
      this.popoverComponentRef.instance.content = _popoverContent;
      setTimeout(() => {
        if (this.popoverComponentRef) {
          this.popoverComponentRef.instance.updatePosition();
        }
      });
    }
  }
  /**
   * 是否通过visible来控制popover状态
   */
  @Input() controlled: boolean;
  /**
   * popover显示位置
   */
  @Input() position: PositionType | PositionType[] = ['top', 'right', 'bottom', 'left'];
  /**
   * 是否显示动画
   */
  @Input() @WithConfig() showAnimation = true;

  /**
   * @deprecated Use showAnimation to replace.
   */
  @Input() set showAnimate(isShowAnimate: any) {
    this.showAnimation = isShowAnimate;
  }

  /**
   * `scrollElement` 默认值是 `window `, 可以不传，只有当页面的滚动不在 window 且`appendToBody`属性为`true`上的时候才需要传递
   */
  @Input() scrollElement: Element;
  /**
   * 自动隐藏系数，弹出框超出已设置的 scrollELment 边界时会自动隐藏，该值与弹出框的宽或高乘积控制超出边界多少后自动隐藏，为负数时不隐藏
   */
  @Input() autoHideCoefficient = 0;
  /**
   * `appendToBody`默认可以不传，仅当popover绑定元素外层宽高不够时，overflow为hidden，不想popover的弹出框被一并隐藏掉。
   */
  @Input() appendToBody = true;
  @Input() zIndex = 1060;
  @Input() popType: PopoverType = 'default';
  @Input() popMaxWidth: number;
  // 触发 popover 的方式（点击/鼠标悬停等）
  @Input() trigger: TriggerType = 'click';

  /**
   * @deprecated
   * 是否可以移入popover内部
   */
  @Input() hoverToContent = false;

  /**
   * @deprecated Use mouseLeaveDelay to replace.
   * 曾经是触发移入popover内部的延迟时间
   * 废弃,现在使用参数mouseLeaveDelay代替
   */
  @Input() set hoverDelayTime(delayTime: any) {
    this.mouseLeaveDelay = delayTime;
  }

  // 设置样式
  @Input() popoverStyle: object;

  // 防止每次鼠标不小心经过目标元素就会显示出PopOver的内容，所以增加适当的延迟。
  @Input() mouseEnterDelay = 150;

  // 因为鼠标移出之后如果立刻消失会很突然，所以增加略小一些的延迟，使得既不突然也反应灵敏
  @Input() mouseLeaveDelay = 100;
  isEnter: boolean;
  unsubscribe$ = new Subject<void>();
  unsubscribeP$ = new Subject<void>();
  document: Document;
  @Input() set visible(_isShow: boolean) {
    if (_isShow) {
      // when set value and create component at the same time，should wait after ng2 dirty check done
      setTimeout(() => this.show(), 0);
    } else {
      this.hide();
    }
  }

  private get eleAppendToBody() {
    return this.appendToBody || this.triggerElementRef.nativeElement.style.position === 'fixed';
  }

  constructor(
    private triggerElementRef: ElementRef,
    private overlayContainerRef: OverlayContainerRef,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private devConfigService: DevConfigService,
    @Inject(DOCUMENT) private doc: any
  ) {
    this.document = this.doc;
  }

  onDocumentClick = (event) => {
    event.stopPropagation();
    if (this.controlled && !this.triggerElementRef.nativeElement.contains(event.target) &&
      !(this.popoverComponentRef && this.popoverComponentRef.instance.elementRef.nativeElement.contains(event.target))) {
      this.hide();
    }
  };

  createPopover() {
    if (this.eleAppendToBody) {
      this.popoverComponentRef = this.overlayContainerRef.createComponent(
        this.componentFactoryResolver.resolveComponentFactory(PopoverComponent)
      );
    } else {
      this.popoverComponentRef = this.viewContainerRef.createComponent(
        this.componentFactoryResolver.resolveComponentFactory(PopoverComponent),
        this.viewContainerRef.length,
        this.injector
      );
    }

    Object.assign(this.popoverComponentRef.instance, {
      content: this._content,
      triggerElementRef: this.triggerElementRef,
      position: this.position,
      popType: this.popType,
      popMaxWidth: this.popMaxWidth,
      scrollElement: this.scrollElement,
      appendToBody: this.eleAppendToBody,
      zIndex: this.zIndex,
      showAnimation: this.showAnimation,
      popoverStyle: this.popoverStyle,
      autoHideCoefficient: this.autoHideCoefficient,
    });

    // 对创建的ToolTip组件添加鼠标移入和移出的监听事件
    if (this.popoverComponentRef.instance.elementRef.nativeElement && this.trigger === 'hover') {
      this.addMouseEvent();
    }
  }
  addMouseEvent() {
    const el = this.popoverComponentRef.instance.elementRef.nativeElement;
    fromEvent(el, 'mouseenter')
      .pipe(
        map((event) => {
          this.isEnter = true;
          return event;
        }),
        debounceTime(0),
        filter((event) => this.isEnter),
        takeUntil(this.unsubscribeP$)
      )
      .subscribe(() => {
        if (!this.popoverComponentRef) {
          this.show();
        }
      });
    fromEvent(el, 'mouseleave')
      .pipe(
        map((event) => {
          this.isEnter = false;
          return event;
        }),
        debounceTime(this.mouseLeaveDelay),
        filter((event) => !this.isEnter),
        takeUntil(this.unsubscribeP$)
      )
      .subscribe(() => {
        this.hide();
      });
  }

  show() {
    this.hide();
    if (!this.popoverComponentRef) {
      this.createPopover();
    }

    this.popoverComponentRef.instance.show();
    this.document.addEventListener('click', this.onDocumentClick);
  }

  destroy() {
    if (this.popoverComponentRef) {
      this.popoverComponentRef.destroy();
      this.popoverComponentRef = null;
    }
    this.document.removeEventListener('click', this.onDocumentClick);
    if (this.unsubscribeP$) {
      this.unsubscribeP$.next();
      this.unsubscribeP$.complete();
    }
  }

  ngOnInit() {
    const element = this.triggerElementRef.nativeElement;
    if (this.trigger === 'click') {
      this.subscription.add(
        fromEvent(element, 'click').subscribe((event) => {
          if (this.controlled) {
            this.show();
          }
        })
      );
    } else if (this.trigger === 'hover') {
      fromEvent(element, 'mouseenter')
        .pipe(
          map((event) => {
            this.isEnter = true;
            return event;
          }),
          debounceTime(this.mouseEnterDelay),
          filter((event) => this.isEnter),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(() => {
          if (!this.popoverComponentRef && this.controlled) {
            this.show();
          }
        });

      fromEvent(element, 'mouseleave')
        .pipe(
          map((event) => {
            this.isEnter = false;
            return event;
          }),
          debounceTime(this.mouseLeaveDelay),
          filter((event) => !this.isEnter),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(() => {
          if (this.controlled) {
            this.hide();
          }
        });
    }
  }

  ngOnDestroy() {
    if (this.unsubscribeP$) {
      this.unsubscribeP$.next();
      this.unsubscribeP$.complete();
    }
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.destroy();
    this.subscription.unsubscribe();
  }

  hide() {
    if (this.popoverComponentRef) {
      if (!this.showAnimation) {
        this.destroy();
        return;
      }

      this.popoverComponentRef.instance.hide();
      this.popoverComponentRef.instance.onHidden = () => {
        this.destroy();
      };
    }
    if (this.unsubscribeP$) {
      this.unsubscribeP$.next();
      this.unsubscribeP$.complete();
    }
  }
}
