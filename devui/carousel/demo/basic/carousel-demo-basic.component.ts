import { Component } from '@angular/core';

@Component({
  selector: 'd-carousel-demo-basic',
  templateUrl: './carousel-demo-basic.component.html',
  styleUrls: ['../demo-common.scss']
})
export class CarouselDemoBasicComponent {
  array = [1, 2, 3, 4];
  height = '200px';
  activeIndex = 0;

  getIndex(index) {
    console.log(this.activeIndex);
    console.log(index);
  }
}
