import {  Renderer2, Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnDestroy, AfterViewInit, HostBinding, NgZone } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
@Directive({
  selector: '[dResizeable]'
})
export class ResizeableDirective implements OnDestroy, AfterViewInit {
    @HostBinding('class.resizeable') resizeEnabledClass = 'resizeEnabled';
    @Input() resizeEnabled = true;

    @Input() unresizable: boolean;

    @HostBinding('attr.minWidth')
    @Input() minWidth: string | number;

    @HostBinding('attr.maxWidth')
    @Input() maxWidth: string | number;
    @Input() resizeBarRefElement: ElementRef;
    @Input() tableViewRefElement: ElementRef;

    @Output() resizeEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() beginResizeEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() resizingEvent: EventEmitter<any> = new EventEmitter<any>();
    element: HTMLElement;
    subscription: Subscription;
    resizing = false;
    resizeNodeEvent: any;
    resizeOverlay: HTMLElement;
    nextElement: any;
    moveCount: number;
    initialWidth: number;
    totalWidth: number;
    nextElementWidth: number;
    mouseDownScreenX: number;
    constructor(element: ElementRef, private renderer2: Renderer2, private zone: NgZone) {
        this.element = element.nativeElement;
    }

    ngAfterViewInit(): void {
        if (this.resizeEnabled && !this.unresizable) {
            const node = this.renderer2.createElement('span');
            this.renderer2.addClass(node, 'resize-handle');
            this.renderer2.appendChild(this.element.firstElementChild, node);
            this.resizeNodeEvent = this.renderer2.listen(node, 'click', (event) => event.stopPropagation());
        }
    }

    ngOnDestroy(): void {
        this._destroySubscription();
        if (this.resizeNodeEvent) {
            this.resizeNodeEvent();
        }
    }

    @HostListener('mousedown', ['$event'])
    onMousedown(event: MouseEvent): void {
        this.moveCount = 0;
        const isHandle = (<HTMLElement>(event.target)).classList.contains('resize-handle');

        if (isHandle && !this.unresizable) {
            this.beginResizeEvent.emit(event); // emit begin resize event

            this.initialWidth = this.element.clientWidth;
            const initialOffset = this.element.offsetLeft;
            this.mouseDownScreenX = event.clientX;
            event.stopPropagation();
            this.nextElement = this.element.nextElementSibling;
            this.resizing = true;
            this.totalWidth = this.nextElement ? this.initialWidth + this.nextElement.clientWidth : this.initialWidth;

            // create resizeOverlay
            this.resizeOverlay = this.renderer2.createElement('div');
            this.renderer2.appendChild(this.element.firstElementChild, this.resizeOverlay);
            this.renderer2.addClass(this.resizeOverlay, 'resize-overlay');
            this.renderer2.listen(this.resizeOverlay, 'click', (clickEvent: Event) => clickEvent.stopPropagation());

            this.renderer2.addClass(this.tableViewRefElement.nativeElement, 'table-view-selector');

            this.renderer2.setStyle(this.resizeBarRefElement.nativeElement, 'display', 'block');
            this.renderer2.setStyle(this.resizeBarRefElement.nativeElement, 'left',
                (initialOffset + this.initialWidth) + 'px');

            this.renderer2.addClass(this.element, 'hover-bg');

            const mouseup = fromEvent(document, 'mouseup');
            this.subscription = mouseup
                .subscribe((ev: MouseEvent) => this.onMouseup(ev));

            this.zone.runOutsideAngular(() => {
                window.document.addEventListener('mousemove', this.bindMousemove);
            });
        }
    }

    onMouseup(event: MouseEvent): void {
        this.zone.run(() => {
            const movementX = event.clientX - this.mouseDownScreenX;
            const newWidth = this.initialWidth + movementX;

            const finalWidth = this.getFinalWidth(newWidth);
            this.resizing = false;

            // destroy overlay
            this.renderer2.removeChild(this.element, this.resizeOverlay);

            this.renderer2.removeClass(this.tableViewRefElement.nativeElement, 'table-view-selector');

            this.renderer2.removeClass(this.element, 'hover-bg');
            this.renderer2.setStyle(this.resizeBarRefElement.nativeElement, 'display', 'none');

            this.resizeEvent.emit({width: finalWidth, nextElementWidth: this.nextElementWidth});
        });
        if (this.subscription && !this.subscription.closed) {
            this._destroySubscription();
        }

        window.document.removeEventListener('mousemove', this.bindMousemove);
    }

    bindMousemove = (e) => {
        this.move(e);
    }

    move(event: MouseEvent): void {
        this.moveCount++;
        if (this.moveCount % 2 === 0 ) {  return; }

        const movementX = event.clientX - this.mouseDownScreenX;
        const newWidth = this.initialWidth + movementX;

        const finalWidth = this.getFinalWidth(newWidth);
        this.renderer2.setStyle(this.resizeBarRefElement.nativeElement, 'left', `${finalWidth + this.element.offsetLeft}px`);
        this.resizingEvent.emit({ width: finalWidth, nextElementWidth: this.nextElementWidth });
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
            const tableWidth = this.tableViewRefElement.nativeElement.clientWidth;
            return tableWidth * parseInt(width, 10) / 100;
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
