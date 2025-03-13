import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
@Component({
    selector: 'd-scroll-element',
    templateUrl: './scroll-element.component.html',
    standalone: false
})
export class ScrollElementComponent {
  scrollElement: Element = this.doc.querySelector('.doc-viewer-container');
  constructor(@Inject(DOCUMENT) private doc: any) {
  }
}
