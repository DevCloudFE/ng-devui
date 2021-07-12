import { ElementRef, Injectable } from '@angular/core';
import { DocumentRef } from './document-ref.service';

@Injectable()
export class WindowRef {

  constructor(private documentRef: DocumentRef) {
  }

  get window(): Window | null {
    return this.document.defaultView;
  }

  get document(): any {
    return this.documentRef.document;
  }

  get pageXOffset() {
    return this.window.pageXOffset;
  }

  get pageYOffset() {
    return this.window.pageYOffset;
  }

  get innerHeight() {
    return this.window.innerHeight;
  }

  get innerWidth() {
    return this.window.innerWidth;
  }

  getComputedStyle(element) {
    return this.window.getComputedStyle(element);
  }

  getBoundingClientRect(elementRef: ElementRef) {
    return elementRef.nativeElement && elementRef.nativeElement.getBoundingClientRect();
  }

}
