import {Directive, EventEmitter, HostListener, ElementRef, OnInit, Input} from '@angular/core';

@Directive({
  selector: '[dMovable]'
})
export class MovableDirective implements OnInit {
    topStart = 0;
    leftStart = 0;
    _allowDrag = false;
    md: boolean;
    @Input() handle: HTMLElement;

    constructor(public element: ElementRef) {}

    ngOnInit() {
      // css changes
      if (this._allowDrag) {
        this.element.nativeElement.style.position = 'relative';
        // this.element.nativeElement.className += ' cursor-draggable';
      }
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
      if (event.button === 2 || !this.checkHandleTarget(event.target, this.handle)) {
        return; // prevents right click drag, remove his if you don't want it
      }
      this.md = true;
      this.topStart = event.clientY - this.element.nativeElement.style.top.replace('px', '');
      this.leftStart = event.clientX - this.element.nativeElement.style.left.replace('px', '');
    }

    @HostListener('document:mouseup', ['$event'])
    onMouseUp(event: MouseEvent) {
      this.md = false;
    }

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
      if (this.md && this._allowDrag) {
        this.element.nativeElement.style.top = (event.clientY - this.topStart) + 'px';
        this.element.nativeElement.style.left = (event.clientX - this.leftStart) + 'px';
      }
    }

    @HostListener('touchstart', ['$event'])
    onTouchStart(event: any) {
      this.md = true;
      this.topStart = event.changedTouches[0].clientY - this.element.nativeElement.style.top.replace('px', '');
      this.leftStart = event.changedTouches[0].clientX - this.element.nativeElement.style.left.replace('px', '');
      event.stopPropagation();
    }

    @HostListener('document:touchend')
    onTouchEnd() {
      this.md = false;
    }

    @HostListener('document:touchmove', ['$event'])
    onTouchMove(event: any) {
      if (this.md && this._allowDrag) {
        this.element.nativeElement.style.top = ( event.changedTouches[0].clientY - this.topStart ) + 'px';
        this.element.nativeElement.style.left = ( event.changedTouches[0].clientX - this.leftStart ) + 'px';
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
          if (element.children.hasOwnProperty(child)) {
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
      if (this._allowDrag) {
        this.handle.style.cursor = 'move';
      }
    }
}
