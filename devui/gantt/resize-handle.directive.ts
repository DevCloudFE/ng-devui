import { Directive, Input, ElementRef, EventEmitter, Output,
  Renderer2, NgZone, HostListener } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[dResizeHandle]'
})
export class ResizeHandleDirective {
  @Input() containerElement: Element;
  @Input() minWidth: string;
  @Input() maxWidth: string;

  @Output() resizeStartEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() resizingEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() resizeEndEvent: EventEmitter<any> = new EventEmitter<any>();

  element: HTMLElement;
  moveCount: number;
  initialWidth: number;
  totalWidth: number;
  mouseDownScreenX: number;
  resizeHandle: HTMLElement;
  resizeOverlay: HTMLElement;
  resizeBarRefElement: HTMLElement;
  mouseUpSubscription: Subscription;
  resizeHandleEnter: any;
  resizeHandleLeave: any;
  resizeHandleClick: any;
  preventRemoveHandle = false;
  constructor(element: ElementRef, private renderer2: Renderer2, private zone: NgZone) {
    this.element = element.nativeElement;
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent) {
    if (!this.resizeHandle) {
      this.resizeHandle = this.renderer2.createElement('div');
      this.renderer2.appendChild(this.containerElement, this.resizeHandle);
      this.renderer2.addClass(this.resizeHandle, 'resize-handle');
      this.renderer2.setStyle(this.resizeHandle, 'left', this.element.offsetLeft + this.element.clientWidth + 'px');
      this.resizeHandleEnter = this.renderer2.listen(this.resizeHandle, 'mouseenter', this.onHandleMouseEnter.bind(this));
      this.resizeHandleLeave = this.renderer2.listen(this.resizeHandle, 'mouseleave', this.onHandleMouseLeave.bind(this));
      this.resizeHandleClick = this.renderer2.listen(this.resizeHandle, 'mousedown', this.onMousedown.bind(this));
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    setTimeout(() => {
      if (!this.preventRemoveHandle) {
        if (this.resizeHandle) {
          this.renderer2.removeChild(this.containerElement, this.resizeHandle);
          this.resizeHandle = null;
        }
        if (this.resizeHandleClick) {
          this.resizeHandleClick();
        }
      }
    }, 100);
  }

  private onHandleMouseEnter() {
    this.preventRemoveHandle = true;
  }

  private onHandleMouseLeave() {
    this.preventRemoveHandle = false;
    if (this.resizeHandle) {
      this.renderer2.removeChild(this.containerElement, this.resizeHandle);
      this.resizeHandle = null;
    }
    if (this.resizeHandleClick) {
      this.resizeHandleClick();
    }
  }

  onMousedown(event: MouseEvent): void {
    this.moveCount = 0;

    this.resizeStartEvent.emit(event); // emit begin resize event

    this.initialWidth = this.element.clientWidth;
    const initialOffset = this.element.offsetLeft;
    this.mouseDownScreenX = event.clientX;
    event.stopPropagation();

    // create resizeOverlay
    this.resizeOverlay = this.renderer2.createElement('div');
    this.renderer2.appendChild(this.containerElement, this.resizeOverlay);
    this.renderer2.addClass(this.resizeOverlay, 'resize-overlay');
    this.renderer2.listen(this.resizeOverlay, 'click', (clickEvent: Event) => clickEvent.stopPropagation());

    // this.renderer2.addClass(this.containerElement, 'table-view-selector');

    const resizeBar = this.renderer2.createElement('div');
    this.renderer2.addClass(resizeBar, 'resize-bar');
    this.resizeBarRefElement = resizeBar;
    this.renderer2.appendChild(this.containerElement, resizeBar);
    this.renderer2.setStyle(this.resizeBarRefElement, 'display', 'block');
    this.renderer2.setStyle(this.resizeBarRefElement, 'left', (initialOffset + this.initialWidth) + 'px');

    const mouseup = fromEvent(document, 'mouseup');
    this.mouseUpSubscription = mouseup.subscribe((ev: MouseEvent) => this.onMouseup(ev));

    this.zone.runOutsideAngular(() => {
        window.document.addEventListener('mousemove', this.bindMousemove);
    });
  }

  onMouseup(event: MouseEvent): void {
    const movementX = event.clientX - this.mouseDownScreenX;
    const newWidth = this.initialWidth + movementX;

    const finalWidth = this.getFinalWidth(newWidth);

    // destroy overlay
    this.renderer2.removeChild(this.element, this.resizeOverlay);

    this.renderer2.removeChild(this.containerElement, this.resizeBarRefElement);

    this.resizeEndEvent.emit({ width: finalWidth });

    if (this.mouseUpSubscription && !this.mouseUpSubscription.closed) {
        this._destroySubscription();
    }

    window.document.removeEventListener('mousemove', this.bindMousemove);
  }

  bindMousemove = (e) => {
      this.move(e);
  }

  move(event: MouseEvent): void {
      this.moveCount++;
      if (this.moveCount % 2 === 0) { return; }

      const movementX = event.clientX - this.mouseDownScreenX;
      const newWidth = this.initialWidth + movementX;

      const finalWidth = this.getFinalWidth(newWidth);
      this.renderer2.setStyle(this.resizeBarRefElement, 'left', `${finalWidth + this.element.offsetLeft}px`);
      this.resizingEvent.emit({ width: finalWidth });
  }

  private getFinalWidth(newWidth: number): number {
      const minWidth = this.handleWidth(this.minWidth);
      const maxWidth = this.handleWidth(this.maxWidth);

      const overMinWidth = !this.minWidth || newWidth >= minWidth;
      const underMaxWidth = !this.maxWidth || newWidth <= maxWidth;

      const finalWidth = !overMinWidth ? minWidth : (!underMaxWidth ? maxWidth : newWidth);
      return finalWidth;
  }

  private handleWidth(width: string | number) {
      if (!width) {
          return;
      }
      if (typeof width === 'number') {
          return width;
      }
      if (width.includes('%')) {
          const tableWidth = this.containerElement.clientWidth;
          return tableWidth * parseInt(width, 10) / 100;
      }
      return parseInt(width.replace(/[^\d]+/, ''), 10);
  }

  private _destroySubscription() {
      if (this.mouseUpSubscription) {
          this.mouseUpSubscription.unsubscribe();
          this.mouseUpSubscription = undefined;
      }
  }
}
