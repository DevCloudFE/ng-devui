import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[dMovable]',
})
export class MovableDirective implements OnInit, OnChanges {
  topStart = 0;
  leftStart = 0;
  _allowDrag = false;
  md: boolean;
  @Input() handle: HTMLElement;
  @Input() moveEl: HTMLElement;
  public element: any;

  constructor(public el: ElementRef) {}

  ngOnInit() {
    this.element = this.moveEl || this.el.nativeElement;
    // css changes
    if (this._allowDrag) {
      this.element.style.position = 'relative';
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const { moveEl, handle } = changes;
    if (moveEl) {
      this.element = this.moveEl || this.el.nativeElement;
    }
    if (handle) {
      this.allowDrag = this._allowDrag;
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (event.button === 2 || !this.checkHandleTarget(event.target, this.handle)) {
      return; // prevents right click drag, remove his if you don't want it
    }
    this.md = true;
    this.topStart = event.clientY - this.element.style.top.replace('px', '');
    this.leftStart = event.clientX - this.element.style.left.replace('px', '');
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.md = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (typeof window !== 'undefined' && this.md && this._allowDrag) {
      // 阻止拖动过程中文字被选中
      event.stopPropagation();
      event.preventDefault();
      // 判断边界条件
      const modalRect = this.element.getBoundingClientRect();
      const parentRect = this.element.parentNode.getBoundingClientRect();
      const [translateX, translateY] = this.element.style.transform.match(/\d+/g)?.map((item) => Number(item)) || [0, 0];
      // 当前偏移量
      let currentTop = event.clientY - this.topStart;
      let currentLeft = event.clientX - this.leftStart;
      // 计算上下距离，按照parentNode的位置计算偏移量，后续parentNode存在偏移量，需要考虑偏移量
      const maxTop = window.innerHeight - parentRect.top - modalRect.height;
      currentTop =
        (parentRect.top + currentTop + translateY <= 0 && -parentRect.top - translateY) ||
        (maxTop - currentTop - translateY <= 0 && maxTop - translateY) ||
        currentTop;
      const halfWidth = (window.innerWidth - modalRect.width) / 2;
      // 计算左右距离，默认居中，后续parentNode存在偏移量，需要考虑偏移量
      currentLeft =
        (currentLeft + halfWidth + translateX <= 0 && -halfWidth - translateX) ||
        (halfWidth - currentLeft - translateX <= 0 && halfWidth - translateX) ||
        currentLeft;
      this.element.style.top = currentTop + 'px';
      this.element.style.left = currentLeft + 'px';
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: any) {
    this.md = true;
    this.topStart = event.changedTouches[0].clientY - this.element.style.top.replace('px', '');
    this.leftStart = event.changedTouches[0].clientX - this.element.style.left.replace('px', '');
    event.stopPropagation();
  }

  @HostListener('document:touchend')
  onTouchEnd() {
    this.md = false;
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: any) {
    if (this.md && this._allowDrag) {
      this.element.style.top = `${event.changedTouches[0].clientY - this.topStart}px`;
      this.element.style.left = `${event.changedTouches[0].clientX - this.leftStart}px`;
    }
    event.stopPropagation();
  }

  checkHandleTarget = function (target, element) {
    if (!element) {
      return false;
    }
    // Checks if the target is the element clicked, then checks each child element of element as well
    // Ignores button clicks
    // Ignore elements of type button
    if (element.tagName === 'BUTTON') {
      return false;
    }
    // If the target was found, return true (handle was found)
    if (element === target) {
      return true;
    }
    // Recursively iterate this elements children
    for (const /** @type {?} */ child in element.children) {
      if (Object.prototype.hasOwnProperty.call(element.children, child)) {
        if (this.checkHandleTarget(target, element.children[child])) {
          return true;
        }
      }
    }
    // Handle was not found in this lineage
    // Note: return false is ignore unless it is the parent element
    return false;
  };

  @Input('dMovable')
  set allowDrag(value: boolean) {
    this._allowDrag = value;
    if (this._allowDrag && this.handle) {
      this.handle.style.cursor = 'move';
    }
  }
}
