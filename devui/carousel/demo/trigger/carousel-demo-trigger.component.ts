import { Component } from '@angular/core';

@Component({
  selector: 'd-carousel-demo-trigger',
  templateUrl: './carousel-demo-trigger.component.html',
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
export class CarouselDemoTriggerComponent {
  array = [1, 2, 3, 4];
  height = '200px';
  dotTrigger = 'hover';
  arrowTrigger = 'always';
}
