import { Component, ViewChildren } from '@angular/core';

@Component({
  selector: 'd-carousel-demo-custom',
  templateUrl: './carousel-demo-custom.component.html',
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
export class CarouselDemoCustomComponent {
  array = [1, 2, 3, 4];
  height = '200px';
  showDots = true;
  arrowTrigger = 'never';
}
