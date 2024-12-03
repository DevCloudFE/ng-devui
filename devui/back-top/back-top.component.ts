import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'd-back-top',
  templateUrl: './back-top.component.html',
  styleUrls: ['./back-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class BackTopComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {
  @Input() customTemplate: TemplateRef<any>;
  @Input() visibleHeight = 300;
  @Input() bottom = '50px';
  @Input() right = '30px';
  @Input() scrollTarget: HTMLElement;
  @Input() draggable = false;
  @Output() backTopEvent = new EventEmitter<boolean>();
  @Output() dragEvent = new EventEmitter<boolean>();

  currScrollTop = 0;
  duration = 0;
  cursorTimer: any;
  dragBoundary: any;
  moveCursor = false;
  moveToggle = false;
  isVisible = false;
  target: HTMLElement | Window;
  subs: Subscription = new Subscription();
  document: Document;

  SCROLL_REFRESH_INTERVAL = 100;
  MOUSEDOWN_DELAY = 180;
  RESIZE_DELAY = 300;

  constructor(private cdr: ChangeDetectorRef, private el: ElementRef, @Inject(DOCUMENT) private doc: any) {
    this.document = this.doc;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.scrollTarget) {
      if (this.subs) {
        this.subs.unsubscribe();
      }
      this.subs = new Subscription();
      this.addScrollEvent();
    }
  }

  ngOnInit(): void {
    this.addScrollEvent();
    this.showButton();
  }

  ngAfterViewInit(): void {
    if (this.draggable) {
      // 窗口大小改变时，如缩放比例或组件超出显示范围重置到默认位置
      this.subs.add(
        fromEvent(window, 'resize')
          .pipe(debounceTime(this.RESIZE_DELAY))
          .subscribe(() => {
            const dom = this.dragBoundary?.dom || this.el.nativeElement.querySelector('div.devui-backtop');
            if (dom) {
              // 不显示时无法获取getBoundingClientRect,使用style获取
              const style = getComputedStyle(dom);
              const left = parseInt(style.left, 10) || 0;
              const top = parseInt(style.top, 10) || 0;
              if (window.devicePixelRatio !== 1 || left > window.innerWidth || top > window.innerHeight) {
                this.onMouseUp();
                this.duration = 0;
                dom.style.left = 'unset';
                dom.style.top = 'unset';
              }
            }
          })
      );
    }
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  addScrollEvent() {
    this.subs.add(
      fromEvent(this.getScrollTarget(), 'scroll')
        .pipe(debounceTime(this.SCROLL_REFRESH_INTERVAL))
        .subscribe(() => {
          this.showButton();
          this.cdr.detectChanges();
        })
    );
  }

  getScrollTarget() {
    if (this.scrollTarget) {
      this.el.nativeElement.querySelector('.devui-backtop').style.position = 'absolute';
      this.scrollTarget.parentElement.style.position = 'relative';
    }
    this.target = this.scrollTarget || window;
    return this.target;
  }

  showButton() {
    this.currScrollTop =
      this.target === window
        ? window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop
        : this.scrollTarget.scrollTop;
    if (this.isVisible !== this.currScrollTop >= this.visibleHeight) {
      this.isVisible = !this.isVisible;
    }
  }

  goTop() {
    if (this.draggable && this.duration > this.MOUSEDOWN_DELAY) {
      this.duration = 0;
      return;
    }
    if (this.target === window) {
      this.document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      this.document.body.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    } else {
      this.scrollTarget.style.scrollBehavior = 'smooth';
      this.scrollTarget.scrollTop = 0;
    }
    this.duration = 0;
    this.backTopEvent.emit(true);
  }

  setDragBoundary() {
    const dom = this.el.nativeElement.querySelector('div.devui-backtop');
    let boxRect;
    let minLeft;
    let minTop;
    let maxLeft;
    let maxTop;
    if (dom) {
      const { width, height } = dom.getBoundingClientRect();
      if (this.scrollTarget) {
        boxRect = this.scrollTarget.getBoundingClientRect();
        minLeft = -1 * boxRect.x;
        minTop = -1 * boxRect.y;
        maxLeft = window.innerWidth - boxRect.x - width;
        maxTop = window.innerHeight - boxRect.y - height;
      } else {
        boxRect = { x: 0, y: 0 };
        minLeft = 0;
        minTop = 0;
        maxLeft = window.innerWidth - width;
        maxTop = window.innerHeight - height;
      }
      this.dragBoundary = { dom, boxRect, minLeft, minTop, maxLeft, maxTop };
    }
  }

  // mousedown mouseup click 按顺序触发且前一个结束触发下一个
  mousedownEvent(event: MouseEvent) {
    if (this.draggable) {
      event.preventDefault();
      this.setDragBoundary();
      this.duration = new Date().getTime();
      this.moveToggle = true;
      this.cursorTimer = setTimeout(() => {
        this.moveCursor = true;
        this.dragEvent.emit(true);
      }, this.MOUSEDOWN_DELAY);
    }
  }

  mouseleaveEvent() {
    if (this.draggable && this.cursorTimer) {
      clearTimeout(this.cursorTimer);
    }
  }

  @HostListener('document:mouseup', [])
  onMouseUp() {
    if (this.draggable) {
      if (this.cursorTimer) {
        clearTimeout(this.cursorTimer);
      }
      if (this.moveToggle) {
        this.moveToggle = false;
        this.moveCursor = false;
        this.dragEvent.emit(false);
      }
      this.duration = this.duration && new Date().getTime() - this.duration;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.draggable && this.moveToggle && this.dragBoundary) {
      // 先判断再执行阻止默认事件，否则可能影响鼠标拖选功能
      event.preventDefault();
      this.moveCursor = true;
      const posX = event.movementX;
      const posY = event.movementY;
      const rect = this.dragBoundary.dom.getBoundingClientRect();
      const left = rect.x - this.dragBoundary.boxRect.x + posX;
      const top = rect.y - this.dragBoundary.boxRect.y + posY;
      const isLeft = left < this.dragBoundary.minLeft;
      const isRight = left > this.dragBoundary.maxLeft;
      const isTop = top < this.dragBoundary.minTop;
      const isBottom = top > this.dragBoundary.maxTop;
      const leftResult = isLeft ? this.dragBoundary.minLeft : left;
      const topResult = isTop ? this.dragBoundary.minTop : top;
      this.dragBoundary.dom.style.left = `${isRight ? this.dragBoundary.maxLeft : leftResult}px`;
      this.dragBoundary.dom.style.top = `${isBottom ? this.dragBoundary.maxTop : topResult}px`;
      // 如到达边界释放拖拽动作，避免鼠标偏移较大距离后返回主视窗仍可拖拽
      if ([isLeft, isRight, isTop, isBottom].includes(true)) {
        this.onMouseUp();
        this.duration = 0;
      }
    }
  }
}
