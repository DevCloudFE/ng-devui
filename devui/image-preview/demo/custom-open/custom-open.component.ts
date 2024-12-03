import { Component, ElementRef } from '@angular/core';
import { IImagePreviewToolbar } from 'ng-devui/image-preview';
import { Subject } from 'rxjs';
import { JPGTESTIMG, JPGTESTIMG2 } from '../fakedata';
import { images } from '../image-mock';

@Component({
  selector: 'd-image-preview-custom-open',
  templateUrl: './custom-open.component.html',
})
export class CustomOpenComponent {
  customSub = new Subject<HTMLElement>();
  images = images;
  imageDatas = [{ src: JPGTESTIMG }, { src: JPGTESTIMG2 }];
  toolbar: IImagePreviewToolbar = { rotate: false, download: false };

  constructor(private elementRef: ElementRef) {}

  open() {
    this.customSub.next(this.elementRef.nativeElement.querySelector('img'));
  }
}
