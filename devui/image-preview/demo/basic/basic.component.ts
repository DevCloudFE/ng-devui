import { Component } from '@angular/core';
import { JPGTESTIMG, JPGTESTIMG2 } from '../fakedata';
import { images } from '../image-mock';

@Component({
    selector: 'd-image-preview-basic',
    templateUrl: './basic.component.html',
    standalone: false
})
export class BasicComponent {
  images = images;

  imageDatas = [
    { src: JPGTESTIMG},
    { src: JPGTESTIMG2 }
  ];
}
