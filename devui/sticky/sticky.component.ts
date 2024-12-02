import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { WindowRef } from 'ng-devui/window-ref';
import { Subscription, fromEvent } from 'rxjs';
import { filter, throttleTime } from 'rxjs/operators';

export type StickyStatus = 'normal' | 'follow' | 'stay' | 'remain';

@Component({
  selector: 'd-sticky',
  template: `
    <div #stickyWrapper [style.zIndex]="zIndex">
      <ng-content></ng-content>
    </div>
  `,
  preserveWhitespaces: false,
})
export class StickyComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('style.position') hostPosition = 'relative';
  @Input() zIndex: number;
  @Input() container: Element; // 默认值父容器
  @Input() view: {
    top?: number;
    bottom?: number;
  };
  @Input() scrollTarget;

  @Output() statusChange: EventEmitter<StickyStatus> = new EventEmitter<StickyStatus>();
  @ViewChild('stickyWrapper', { static: true }) wrapper;

  _prevStatus: StickyStatus = undefined;
  _status: StickyStatus = 'normal';
  set status(status: StickyStatus) {
    if (status !== this._status) {
      this._prevStatus = this._status;
      this._status = status;
      this.statusChange.emit(this._status);
      this.statusProcess(this._status);
    }
  }
  get status() {
    return this._status;
  }

  parentNode;
  containerLeft; // 用于监听是否是横向滚动

  private THROTTLE_DELAY = 16;
  private THROTTLE_TRIGGER = 100;
  private scrollPreStart;
  private scrollTimer;
  subscription: Subscription;

  constructor(private el: ElementRef, private windowRef: WindowRef) {}

  ngOnInit() {
    this.parentNode = this.el.nativeElement.parentNode;
    if (!this.container) {
      this.container = this.parentNode;
    }
  }

  ngAfterViewInit() {
    this.scrollTarget = this.scrollTarget || this.windowRef.window; // window有scroll事件，document.documentElement没有scroll事件
    this.scrollTarget.addEventListener('scroll', this.throttle);
    this.initScrollStatus(this.scrollTarget);
    if (this.scrollTarget !== this.windowRef.window) {
      this.subscription = fromEvent<Event>(this.windowRef.window, 'scroll')
        .pipe(
          throttleTime(100, undefined, { leading: true, trailing: true }),
          filter(
            (event) =>
              event.target !== this.scrollTarget &&
              (event.target === this.windowRef.window ||
                event.target === this.windowRef.document || // fix ie11 document.contains is not defined
                ((<HTMLElement>event.target).contains && (<HTMLElement>event.target).contains(this.scrollTarget)))
          )
        )
        .subscribe((event) => {
          this.statusProcess(this._status);
        });
    }
  }

  ngOnDestroy() {
    this.scrollTarget.removeEventListener('scroll', this.throttle);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  statusProcess(status) {
    switch (status) {
    case 'normal':
      this.wrapper.nativeElement.style.top = 'auto';
      this.wrapper.nativeElement.style.left = 'auto';
      this.wrapper.nativeElement.style.position = 'static';
      break;
    case 'follow': {
      const viewOffset =
        this.scrollTarget && this.scrollTarget !== this.windowRef.window ? this.scrollTarget.getBoundingClientRect().top : 0;
      this.wrapper.nativeElement.style.top = Number(viewOffset) + ((this.view && this.view.top) || 0) + 'px';
      this.wrapper.nativeElement.style.left = this.wrapper.nativeElement.getBoundingClientRect().left + 'px';
      this.wrapper.nativeElement.style.position = 'fixed';
      break;
    }
    case 'stay': {
      this.wrapper.nativeElement.style.top = this.calculateRelativePosition(this.wrapper.nativeElement, this.parentNode, 'top') + 'px';
      this.wrapper.nativeElement.style.left = 'auto';
      this.wrapper.nativeElement.style.position = 'relative';
      break;
    }
    case 'remain': {
      if (this.wrapper.nativeElement.style.position !== 'fixed' || this.wrapper.nativeElement.style.position !== 'absolute') {
        this.wrapper.nativeElement.style.top = this.calculateRelativePosition(this.wrapper.nativeElement, this.parentNode, 'top') + 'px';
        this.wrapper.nativeElement.style.left = 'auto';
        this.wrapper.nativeElement.style.position = 'absolute'; // 要先转为absolute再计算，否则如果处于非fixed影响计算
      }
      this.wrapper.nativeElement.style.top =
        this.calculateRemainPosition(this.wrapper.nativeElement, this.parentNode, this.container) + 'px';
      this.wrapper.nativeElement.style.left = this.calculateRelativePosition(this.wrapper.nativeElement, this.parentNode, 'left') + 'px';
      this.wrapper.nativeElement.style.position = 'relative';
      break;
    }
    default:
    }
  }

  @HostListener('window:resize')
  throttle = () => {
    const fn = this.scrollAndResizeHock;
    const time = Date.now();
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }
    if (!this.scrollPreStart) {
      this.scrollPreStart = time;
    }
    if (time - this.scrollPreStart > this.THROTTLE_TRIGGER) {
      fn();
      this.scrollPreStart = null;
      this.scrollTimer = null;
    } else {
      this.scrollTimer = setTimeout(() => {
        fn();
        this.scrollPreStart = null;
        this.scrollTimer = null;
      }, this.THROTTLE_DELAY);
    }
  };
  scrollAndResizeHock = () => {
    if (this.container.getBoundingClientRect().left - (this.containerLeft || 0) !== 0) {
      this.status = 'stay';
      this.containerLeft = this.container.getBoundingClientRect().left;
    } else {
      this.scrollHandler();
    }
  };

  scrollHandler = () => {
    const viewOffsetTop =
      this.scrollTarget && this.scrollTarget !== this.windowRef.window ? this.scrollTarget.getBoundingClientRect().top : 0;
    const computedStyle = this.windowRef.window.getComputedStyle(this.container);
    if (this.parentNode.getBoundingClientRect().top - viewOffsetTop > ((this.view && this.view.top) || 0)) {
      this.status = 'normal'; // 全局滑动（container!==parentNode）时候增加预判
    } else if (
      this.container.getBoundingClientRect().top +
        parseInt(computedStyle.paddingTop, 10) +
        parseInt(computedStyle.borderTopWidth, 10) -
        viewOffsetTop >=
      ((this.view && this.view.top) || 0)
    ) {
      this.status = 'normal';
    } else if (
      this.container.getBoundingClientRect().bottom -
        parseInt(computedStyle.paddingBottom, 10) -
        parseInt(computedStyle.borderBottomWidth, 10) <
      viewOffsetTop +
        ((this.view && this.view.top) || 0) +
        this.wrapper.nativeElement.getBoundingClientRect().height +
        ((this.view && this.view.bottom) || 0)
    ) {
      this.status = 'remain';
    } else if (
      this.container.getBoundingClientRect().top + parseInt(computedStyle.paddingTop, 10) - viewOffsetTop <
      ((this.view && this.view.top) || 0)
    ) {
      this.status = 'follow';
    }
  };

  calculateRelativePosition(element, relativeElement, direction) {
    const key = {
      left: ['left', 'Left'],
      top: ['top', 'Top'],
    };
    if (this.windowRef.window && this.windowRef.window.getComputedStyle) {
      const computedStyle = this.windowRef.window.getComputedStyle(relativeElement);
      return (
        element.getBoundingClientRect()[key[direction][0]] -
        relativeElement.getBoundingClientRect()[key[direction][0]] -
        parseInt(computedStyle['padding' + key[direction][1]], 10) -
        parseInt(computedStyle['border' + key[direction][1] + 'Width'], 10)
      );
    }
  }
  calculateRemainPosition(element, relativeElement, container) {
    if (this.windowRef.window && this.windowRef.window.getComputedStyle) {
      const computedStyle = this.windowRef.window.getComputedStyle(container);
      const result =
        container.getBoundingClientRect().height -
        element.getBoundingClientRect().height +
        container.getBoundingClientRect().top -
        relativeElement.getBoundingClientRect().top -
        parseInt(computedStyle.paddingTop, 10) -
        parseInt(computedStyle.borderTopWidth, 10) -
        parseInt(computedStyle.paddingBottom, 10) -
        parseInt(computedStyle.borderBottomWidth, 10);
      return result < 0 ? 0 : result;
    }
  }

  initScrollStatus(target) {
    const scrollTargets =
      target === this.windowRef.window ? [this.windowRef.document.documentElement, this.windowRef.document.body] : [target];
    let flag = false;
    scrollTargets.forEach((scrollTarget) => {
      if (scrollTarget.scrollTop && scrollTarget.scrollTop > 0) {
        flag = true;
      }
    });
    if (flag) {
      setTimeout(this.scrollHandler);
    }
  }

  /**
   * 提供给业务自己触发
   * 用法：
   * 1.捕获所有sticky：```@ViewChildren(StickyComponent) stickies;```
   * 2.触发刷新：当需要手动触发更新的时候，比如订阅数据返回后页面高度发生变化可以调用 ```stickies.forEach(sticky => sticky.recalculatePosition());```
   * 慎用，少用， 使用太多会影响性能。
   */
  public recalculatePosition() {
    this.initScrollStatus(this.scrollTarget);
  }
}
// TODO: 重构梳理状态
