import { ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Injector, Input,
  OnDestroy,
  ViewContainerRef } from '@angular/core';
import { OverlayContainerRef } from '../overlay-container';
import { PositionType } from '../tooltip';
import { PopoverComponent } from './popover.component';

@Directive({
  selector: '[avePopover]',
  exportAs: 'avePopover',
})
export class PopoverDirective implements OnDestroy {
  popoverComponentRef: ComponentRef<PopoverComponent>;
  _content: string | HTMLElement;
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
   * 悬浮框的触发方式
   */
  @Input() trigger = 'manual';
  /**
   * 将废弃
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
  /**
   * 手动控制弹出框显示
   */
  @Input() set visible(_visible: boolean) {
    if (_visible) {
      // when set value and create component at the same time，should wait after ng2 dirty check done
      setTimeout(() => this.show(), 0);
    } else {
      this.hide();
    }
  }
  /**
   * 将废弃
   */
  @Input() set isShow(_isShow: boolean) {
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

  @HostListener('click') onClick() {
    if (this.trigger === 'click' || this.controlled) {
      this.show();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event) {
    event.stopPropagation();
    if ((this.trigger === 'click' || this.controlled) &&
    !this.triggerElementRef.nativeElement.contains(event.target) &&
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
      scrollElement: this.scrollElement,
      appendToBody: this.appendToBody,
      zIndex: this.zIndex
    });
  }

  show() {
    this.hide();

    if (!this.popoverComponentRef) {
      this.createPopover();
      // setTimeout(() => this.popoverComponentRef.instance.updatePosition());
    }

    if (this.showAnimate) {
      this.popoverComponentRef.instance.show();
    }
  }

  destroy() {
    if (this.popoverComponentRef) {
      this.popoverComponentRef.destroy();
      this.popoverComponentRef = null;
    }
  }

  ngOnDestroy() {
    this.destroy();
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
