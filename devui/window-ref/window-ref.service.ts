import { ElementRef, Injectable } from '@angular/core';
import { DocumentRef } from './document-ref.service';

@Injectable()
export class WindowRef {

  constructor(private  documentRef: DocumentRef) {
  }

  get document(): any {
    return this.documentRef;
  }

  get pageXOffset() {
    return window.pageXOffset;
  }

  get pageYOffset() {
    return window.pageYOffset;
  }

  get innerHeight() {
    return window.innerHeight;
  }

  get innerWidth() {
    return window.innerWidth;
  }

  getComputedStyle(element) {
    return window.getComputedStyle(element);
  }

  getBoundingClientRect(elementRef: ElementRef) {
    return elementRef.nativeElement && elementRef.nativeElement.getBoundingClientRect();
  }

}
