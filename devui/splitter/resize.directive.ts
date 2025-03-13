import { Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
    selector: '[dResize]',
    standalone: false
})
export class ResizeDirective implements OnInit, OnDestroy {
  // 是否允许拖动
  @Input() enableResize = true;
  // 按下事件，mousedown，touchstart等
  @Output() pressEvent = new EventEmitter<any>();
  // 拖动中事件，mousemove，touchmove等
  @Output() dragEvent = new EventEmitter<any>();
  // 释放事件，mouseup，touchend等
  @Output() releaseEvent = new EventEmitter<any>();
  constructor(private el: ElementRef, private ngZone: NgZone) {}

  ngOnInit() {
    if (this.enableResize) {
      this.ngZone.runOutsideAngular(() => {
        this.bindEvent();
      });
    }
  }

  ngOnDestroy() {
    if (this.enableResize) {
      this.unbind(this.el.nativeElement, 'mousedown', this.mousedown);
      this.unbind(this.el.nativeElement, 'touchstart', this.touchstart);
    }
  }

  bind = (el, event, callback) => el.addEventListener && el.addEventListener(event, callback);

  unbind = (el, event, callback) => el && el.removeEventListener && el.removeEventListener(event, callback);

  bindEvent() {
    const element = this.el.nativeElement;
    // 绑定mousedown事件
    this.bind(element, 'mousedown', this.mousedown);
    // 绑定触屏事件
    this.bind(element, 'touchstart', this.touchstart);
  }

  mousedown = (e) => {
    this.bind(document, 'mousemove', this.mousemove);
    this.bind(document, 'mouseup', this.mouseup);
    this.pressEvent.emit(this.normalizeEvent(e));
  };

  mousemove = (e) => {
    this.dragEvent.emit(this.normalizeEvent(e));
  };

  mouseup = (e) => {
    this.unbind(document, 'mousemove', this.mousemove);
    this.unbind(document, 'mouseup', this.mouseup);
    this.releaseEvent.emit(this.normalizeEvent(e));
  };

  touchstart = (e) => {
    this.bind(document, 'touchmove', this.touchmove);
    this.bind(document, 'touchend', this.touchend);
    if (e.touches.length === 1) {
      this.pressEvent.emit(this.normalizeEvent(e));
    }
  };

  touchmove = (e) => {
    if (e.touches.length === 1) {
      this.dragEvent.emit(this.normalizeEvent(e));
    }
  };

  touchend = (e) => {
    this.unbind(document, 'touchmove', this.touchmove);
    this.unbind(document, 'touchend', this.touchend);
    if (e.touches.length === 0) {
      this.releaseEvent.emit(this.normalizeEvent(e));
    }
  };

  // 返回常用位置信息
  normalizeEvent(e) {
    // 判断事件类型，用于计算位置坐标
    if (e.type.match(/touch/)) {
      return {
        pageX: e.changedTouches[0].pageX,
        pageY: e.changedTouches[0].pageY,
        clientX: e.changedTouches[0].clientX,
        clientY: e.changedTouches[0].clientY,
        type: e.type,
        originalEvent: e,
        isTouch: true
      };
    }
    return {
      pageX: e.pageX,
      pageY: e.pageY,
      clientX: e.clientX,
      clientY: e.clientY,
      offsetX: e.offsetX,
      offsetY: e.offsetY,
      type: e.type,
      originalEvent: e
    };
  }
}
