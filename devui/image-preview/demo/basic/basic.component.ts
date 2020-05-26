import { Component } from '@angular/core';
import { JPGTESTIMG, JPGTESTIMG2 } from '../fakedata';

@Component({
  selector: 'd-image-preview-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent  {

  imageDatas = [
    { src: JPGTESTIMG},
    { src: JPGTESTIMG2 }
  ];

}
