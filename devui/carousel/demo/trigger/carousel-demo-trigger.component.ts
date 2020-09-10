import { Component } from '@angular/core';

@Component({
  selector: 'd-carousel-demo-trigger',
  templateUrl: './carousel-demo-trigger.component.html',
  styleUrls: ['../carousel-demo.component.scss']
})
export class CarouselDemoTriggerComponent {
  array = [1, 2, 3, 4];
  height = '200px';
  dotTrigger = 'hover';
  arrowTrigger = 'always';
}
