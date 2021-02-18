import { Component, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { JPGTESTIMG, JPGTESTIMG2 } from '../fakedata';
import { images } from '../image-mock';

@Component({
  selector: 'd-image-preview-custom-open',
  templateUrl: './custom-open.component.html'
})
export class CustomOpenComponent {
  images = images;

  customSub = new Subject();
  imageDatas = [
    { src: JPGTESTIMG},
    { src: JPGTESTIMG2 }
  ];
  constructor(private elementRef: ElementRef) {

  }

  open() {
    this.customSub.next(this.elementRef.nativeElement.querySelector('img'));
  }

}
