import { Component } from '@angular/core';

@Component({
  selector: 'd-carousel-demo-basic',
  templateUrl: './carousel-demo-basic.component.html',
  styles: [
    `
    d-carousel-item {
      text-align: center;
      line-height: 200px;
      background: #f3f6f8;
    }
    `
  ]
})
export class CarouselDemoBasicComponent {
  array = [1, 2, 3, 4];
  height = '200px';
  activeIndex = 0;
}
