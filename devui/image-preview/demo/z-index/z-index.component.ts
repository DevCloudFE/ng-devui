import { Component } from '@angular/core';
import { images } from '../image-mock';
@Component({
    selector: 'd-image-preview-z-index',
    templateUrl: './z-index.component.html',
    standalone: false
})
export class ZIndexComponent {
  zIndex = 1050;
  backDropZIndex = 1040;
  images = images;
  setZIndex(zIndex?: number) {
    this.zIndex = zIndex;
  }
  setBackDropZIndex(zIndex?: number) {
    this.backDropZIndex = zIndex;
  }
}
