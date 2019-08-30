import {
  Renderer2, Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnDestroy, AfterViewInit, HostBinding
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[dResizeable]'
})
export class ResizeableDirective implements OnDestroy, AfterViewInit {
  @HostBinding('class.resizeable') resizeEnabledClass = 'resizeEnabled';
  @Input() resizeEnabled = true;

  @HostBinding('attr.minWidth')
  @Input() minWidth: string | number;

  @HostBinding('attr.maxWidth')
  @Input() maxWidth: string | number;
  @Input() resizeBarRefElement: ElementRef;
  @Input() tableViewRefElement: ElementRef;

  @Output() resize: EventEmitter<any> = new EventEmitter();
  element: HTMLElement;
  subscription: Subscription;
  resizing = false;
  resizeNodeEvent: any;
  resizeOverlay: HTMLElement;
  // resizeBarNode: HTMLSpanElement;
  nextElement: any;
  constructor(element: ElementRef, private renderer: Renderer2) {
    this.element = element.nativeElement;
  }

  ngAfterViewInit(): void {
    if (this.resizeEnabled) {
      const node = this.renderer.createElement('span');
      this.renderer.addClass(node, 'resize-handle');
      this.renderer.appendChild(this.element, node);
      this.resizeNodeEvent = this.renderer.listen(node, 'click', (event) => event.stopPropagation());
    }
  }

  ngOnDestroy(): void {
    this._destroySubscription();
    if (this.resizeNodeEvent) {
      this.resizeNodeEvent();
    }
  }

  onMouseup(event: MouseEvent, initialWidth: number, mouseDownScreenX: number): void {
    const movementX = event.clientX - mouseDownScreenX;
    const newWidth = initialWidth + movementX;
    const nextElement = this.element.nextElementSibling;

    const minWidth = this.handleWidth(this.minWidth);
    const maxWidth = this.handleWidth(this.maxWidth);

    const overMinWidth = !this.minWidth || newWidth >= minWidth;
    const underMaxWidth = !this.maxWidth || newWidth <= maxWidth;

    let finalWidth = !overMinWidth ? minWidth : (!underMaxWidth ? maxWidth : newWidth);
    if (this.nextElement) {
      let nextWidth = this.nextElement.clientWidth + initialWidth - finalWidth;
      const nMinWidth = this.handleWidth(this.nextElement.getAttribute('minWidth'));
      nextWidth = (!nMinWidth || nextWidth >= nMinWidth) ? nextWidth : nMinWidth;
      finalWidth = this.nextElement.clientWidth - nextWidth + initialWidth;
      this.renderer.setStyle(this.nextElement, 'width', `${nextWidth}px`);
    }
    this.renderer.setStyle(this.element, 'width', `${finalWidth}px`);
    this.resizing = false;

    // destroy overlay
    // this.renderer.detachView([this.resizeOverlay]);
    // this.renderer.destroyView(this.element, [this.resizeOverlay]);
    this.renderer.removeChild(this.element, this.resizeOverlay);


    this.renderer.setStyle(this.tableViewRefElement.nativeElement, '-webkit-user-select', null);
    this.renderer.setStyle(this.tableViewRefElement.nativeElement, '-moz-user-select', null);
    this.renderer.setStyle(this.tableViewRefElement.nativeElement, '-ms-user-select', null);
    this.renderer.setStyle(this.tableViewRefElement.nativeElement, 'user-select', null);
    this.renderer.setStyle(this.tableViewRefElement.nativeElement, 'cursor', null);

    if (this.subscription && !this.subscription.closed) {
      this._destroySubscription();
      this.resize.emit(this.element.style.width);
      this.renderer.setStyle(this.resizeBarRefElement.nativeElement, 'display', 'none');
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent): void {
    const isHandle = (<HTMLElement>(event.target)).classList.contains('resize-handle');

    if (isHandle) {
      const initialWidth = this.element.clientWidth;
      const initialOffset = this.element.offsetLeft;
      const mouseDownScreenX = event.clientX;
      event.stopPropagation();
      this.nextElement = this.element.nextElementSibling;
      this.resizing = true;

      // create resizeOverlay
      this.resizeOverlay = this.renderer.createElement('div');
      this.renderer.addClass(this.resizeOverlay, 'resize-overlay');
      this.renderer.listen(this.resizeOverlay, 'click', (ev: Event) => ev.stopPropagation());

      this.renderer.setStyle(this.tableViewRefElement.nativeElement, '-webkit-user-select', 'none');
      this.renderer.setStyle(this.tableViewRefElement.nativeElement, '-moz-user-select', 'none');
      this.renderer.setStyle(this.tableViewRefElement.nativeElement, '-ms-user-select', 'none');
      this.renderer.setStyle(this.tableViewRefElement.nativeElement, 'user-select', 'none');
      this.renderer.setStyle(this.tableViewRefElement.nativeElement, 'cursor', 'col-resize');

      this.renderer.setStyle(this.resizeBarRefElement.nativeElement, 'display', 'block');
      this.renderer.setStyle(this.resizeBarRefElement.nativeElement, 'left',
        (initialOffset + initialWidth) + 'px');

      const mouseup = fromEvent(document, 'mouseup');
      this.subscription = mouseup
        .subscribe((ev: MouseEvent) => this.onMouseup(ev, initialWidth, mouseDownScreenX));

      const mouseMoveSub = fromEvent(document, 'mousemove')
        .pipe(
          takeUntil(mouseup)
        )
        .subscribe((ev: MouseEvent) => this.move(ev, initialWidth, mouseDownScreenX));

      this.subscription.add(mouseMoveSub);
    }
  }

  move(event: MouseEvent, initialWidth: number, mouseDownScreenX: number): void {
    const movementX = event.clientX - mouseDownScreenX;
    const newWidth = initialWidth + movementX;

    const minWidth = this.handleWidth(this.minWidth);
    const maxWidth = this.handleWidth(this.maxWidth);

    const overMinWidth = !this.minWidth || newWidth >= minWidth;
    const underMaxWidth = !this.maxWidth || newWidth <= maxWidth;

    if (!overMinWidth) {
      this.renderer.setStyle(this.resizeBarRefElement.nativeElement, 'left', `${minWidth + this.element.offsetLeft}px`);
    } else if (!underMaxWidth) {
      // this.renderer.setStyle(this.resizeBarNode, 'left', `${maxWidth}px`);
      this.renderer.setStyle(this.resizeBarRefElement.nativeElement, 'left', `${maxWidth + this.element.offsetLeft}px`);
    } else {
      // this.renderer.setStyle(this.resizeBarNode, 'left', `${newWidth - 3}px`);
      this.renderer.setStyle(this.resizeBarRefElement.nativeElement, 'left', `${newWidth + this.element.offsetLeft}px`);
    }
  }

  private handleWidth(width: string | number) {
    if (!width) {
      return;
    }
    if (typeof width === 'number') {
      return width;
    }
    return parseInt(width.replace(/[^\d]+/, ''), 10);
  }

  private _destroySubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
