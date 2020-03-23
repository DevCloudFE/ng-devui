import {
    Renderer, Renderer2, Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnDestroy, AfterViewInit, HostBinding, NgZone
} from '@angular/core';
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

    @Output() resize: EventEmitter<any> = new EventEmitter();
    @Output() beginResize: EventEmitter<any> = new EventEmitter();
    @Output() resizingEvent: EventEmitter<any> = new EventEmitter();
    element: HTMLElement;
    subscription: Subscription;
    resizing = false;
    resizeNodeEvent: any;
    resizeOverlay: HTMLElement;
    // resizeBarNode: HTMLSpanElement;
    nextElement: any;
    moveCount: number;
    initialWidth: number;
    totalWidth: number;
    nextElementWidth: number;
    mouseDownScreenX: number;
    constructor(element: ElementRef, private renderer: Renderer, private renderer2: Renderer2, private zone: NgZone) {
        this.element = element.nativeElement;
    }

    ngAfterViewInit(): void {
        if (this.resizeEnabled && !this.unresizable) {
            const node = this.renderer.createElement(this.element, 'span');
            this.renderer.setElementClass(node, 'resize-handle', true);
            this.renderer.attachViewAfter(this.element, node);
            this.resizeNodeEvent = this.renderer.listen(node, 'click', (event) => event.stopPropagation());
        }
    }

    ngOnDestroy(): void {
        this._destroySubscription();
        if (this.resizeNodeEvent) {
            this.resizeNodeEvent();
        }
    }

    onMouseup(event: MouseEvent): void {
        this.zone.run(() => {
            const movementX = event.clientX - this.mouseDownScreenX;
            const newWidth = this.initialWidth + movementX;

            const finalWidth = this.getFinalWidth(newWidth);
            this.setElementWidth(finalWidth);
            this.resizing = false;

            // destroy overlay
            this.renderer.detachView([this.resizeOverlay]);
            // this.renderer.destroyView(this.element, [this.resizeOverlay]);
            this.renderer2.removeChild(this.element, this.resizeOverlay);

            this.renderer.setElementClass(this.tableViewRefElement.nativeElement, 'table-view-selector', false);

            this.renderer.setElementClass(this.element, 'hover-bg', false);
            this.renderer.setElementStyle(this.resizeBarRefElement.nativeElement, 'display', 'none');

            this.resize.emit({width: finalWidth, nextElementWidth: this.nextElementWidth});
        });
        if (this.subscription && !this.subscription.closed) {
            this._destroySubscription();
        }

        window.document.removeEventListener('mousemove', this.bindMousemove);
    }

    @HostListener('mousedown', ['$event'])
    onMousedown(event: MouseEvent): void {
        this.moveCount = 0;
        const isHandle = (<HTMLElement>(event.target)).classList.contains('resize-handle');

        if (isHandle && !this.unresizable) {
            this.beginResize.emit(event); // emit begin resize event

            this.initialWidth = this.element.clientWidth;
            const initialOffset = this.element.offsetLeft;
            this.mouseDownScreenX = event.clientX;
            event.stopPropagation();
            this.nextElement = this.element.nextElementSibling;
            this.resizing = true;
            this.totalWidth = this.nextElement ? this.initialWidth + this.nextElement.clientWidth : this.initialWidth;

            // create resizeOverlay
            this.resizeOverlay = this.renderer.createElement(this.element, 'div');
            this.renderer.setElementClass(this.resizeOverlay, 'resize-overlay', true);
            this.renderer.listen(this.resizeOverlay, 'click', (clickEvent: Event) => clickEvent.stopPropagation());

            this.renderer.setElementClass(this.tableViewRefElement.nativeElement, 'table-view-selector', true);

            this.renderer.setElementStyle(this.resizeBarRefElement.nativeElement, 'display', 'block');
            this.renderer.setElementStyle(this.resizeBarRefElement.nativeElement, 'left',
                (initialOffset + this.initialWidth) + 'px');

            this.renderer.setElementClass(this.element, 'hover-bg', true);

            const mouseup = fromEvent(document, 'mouseup');
            this.subscription = mouseup
                .subscribe((ev: MouseEvent) => this.onMouseup(ev));

            this.zone.runOutsideAngular(() => {
                window.document.addEventListener('mousemove', this.bindMousemove);
            });
        }
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
        this.setElementWidth(finalWidth);
        this.renderer.setElementStyle(this.resizeBarRefElement.nativeElement, 'left', `${finalWidth + this.element.offsetLeft}px`);
        this.resizingEvent.emit({ width: finalWidth, nextElementWidth: this.nextElementWidth });
    }

    private setElementWidth(finalWidth: number) {
        if (this.nextElement) {
            this.renderer.setElementStyle(this.nextElement, 'width', `${this.nextElementWidth}px`);
        }
        this.renderer.setElementStyle(this.element, 'width', `${finalWidth}px`);
    }

    private getFinalWidth(newWidth: number): number {
        const minWidth = this.handleWidth(this.minWidth);
        const maxWidth = this.handleWidth(this.maxWidth);

        const overMinWidth = !this.minWidth || newWidth >= minWidth;
        const underMaxWidth = !this.maxWidth || newWidth <= maxWidth;

        let finalWidth = !overMinWidth ? minWidth : (!underMaxWidth ? maxWidth : newWidth);
        if (this.nextElement) {
            const nextWidth = this.totalWidth - finalWidth;
            const nMinWidth = this.handleWidth(this.nextElement.getAttribute('minWidth'));
            this.nextElementWidth = (!nMinWidth || nextWidth >= nMinWidth) ? nextWidth : nMinWidth;
            finalWidth =  this.totalWidth - this.nextElementWidth;
        }
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
