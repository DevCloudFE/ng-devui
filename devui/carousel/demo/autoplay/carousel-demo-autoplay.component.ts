import { Component } from '@angular/core';
import { imageArray } from './image-mock';
@Component({
  selector: 'd-carousel-demo-autoplay',
  templateUrl: './carousel-demo-autoplay.component.html',
  styles: [
    `
    d-carousel-item {
      text-align: center;
    }
    `
  ]
})
export class CarouselDemoAutoPlayComponent {
  // imageUrl 数组
  imageArray = imageArray;
  height = '500px';
  autoplay = true;
  autoplaySpeed = 3000;
  transitionSpeed = 1000;
}
