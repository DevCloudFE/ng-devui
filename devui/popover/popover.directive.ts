import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  Injector,
  Input,
  OnInit,
  OnDestroy,
  ViewContainerRef } from '@angular/core';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { PopoverComponent } from './popover.component';
import { fromEvent, Subscription,  merge } from 'rxjs';
import { PopoverType, PositionType, TriggerType } from './popover.types';

@Directive({
  selector: '[dPopover]',
  exportAs: 'dPopover',
})
export class PopoverDirective implements OnInit, OnDestroy {
  popoverComponentRef: ComponentRef<PopoverComponent>;
  _content: string | HTMLElement;
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
  @Input() position: PositionType = 'top';
  /**
   * 是否显示动画
   */
  @Input() showAnimate: boolean;
  /**
   * `scrollElement` 默认值是 `window `, 可以不传，只有当页面的滚动不在 window 且`appendToBody`属性为`true`上的时候才需要传递
   */
  @Input() scrollElement: Element;
  /**
   * `appendToBody`默认可以不传，仅当popover绑定元素外层宽高不够时，overflow为hidden，不想popover的弹出框被一并隐藏掉。
   */
  @Input() appendToBody = true;
  @Input() zIndex = 1060;

  @Input() popType: PopoverType = 'default';

  // 触发 popover 的方式（点击/鼠标悬停等）
  @Input() trigger: TriggerType = 'click';

  @Input() set visible(_isShow: boolean) {
    if (_isShow) {
      // when set value and create component at the same time，should wait after ng2 dirty check done
      setTimeout(() => this.show(), 0);
    } else {
      this.hide();
    }
  }

  constructor(private triggerElementRef: ElementRef,
              private overlayContainerRef: OverlayContainerRef,
              private viewContainerRef: ViewContainerRef,
              private injector: Injector,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }


  onDocumentClick = (event) => {
    event.stopPropagation();
    if (this.controlled && !this.triggerElementRef.nativeElement.contains(event.target) &&
      !(this.popoverComponentRef && this.popoverComponentRef.instance.elementRef.nativeElement.contains(event.target))) {
      this.hide();
    }
  }

  createPopover() {
    if (this.appendToBody) {
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
      scrollElement: this.scrollElement,
      appendToBody: this.appendToBody,
      zIndex: this.zIndex
    });
  }

  show() {
    this.hide();

    if (!this.popoverComponentRef) {
      this.createPopover();
    }

    if (this.showAnimate) {
      this.popoverComponentRef.instance.show();
    }
    document.addEventListener('click', this.onDocumentClick);
  }

  destroy() {
    if (this.popoverComponentRef) {
      this.popoverComponentRef.destroy();
      this.popoverComponentRef = null;
    }
    document.removeEventListener('click', this.onDocumentClick);
  }

  ngOnInit() {
    const element = this.triggerElementRef.nativeElement;
    if (this.trigger === 'click') {
      this.subscription.add(fromEvent(element, 'click').subscribe(event => {
        if (this.controlled) {
          this.show();
        }
      }));
    } else if (this.trigger === 'hover') {
      this.subscription.add(
        merge(
          fromEvent(element, 'mouseenter'),
          fromEvent(element, 'mouseleave')
        ).subscribe((event: MouseEvent) => {
          if (event.type === 'mouseenter' && this.controlled) {
            this.show();
          }
          if (event.type === 'mouseleave' && this.controlled) {
            this.hide();
          }
        })
      );
    }
  }

  ngOnDestroy() {
    this.destroy();
    this.subscription.unsubscribe();
  }

  hide() {
    if (this.popoverComponentRef) {
      if (!this.showAnimate) {
        this.destroy();
        return;
      }

      this.popoverComponentRef.instance.hide();
      this.popoverComponentRef.instance.onHidden = () => {
        this.destroy();
      };
    }
  }
}
