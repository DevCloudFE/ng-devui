import { Component, ViewChildren } from '@angular/core';

@Component({
  selector: 'd-carousel-demo-custom',
  templateUrl: './carousel-demo-custom.component.html',
  styleUrls: ['../demo-common.scss']
})
export class CarouselDemoCustomComponent {
  array = [1, 2, 3, 4];
  height = '200px';
  showDots = true;
  arrowTrigger = 'never';
}
