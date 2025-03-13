import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'd-carousel-with-transition-progress',
    templateUrl: './with-transition-progress.component.html',
    styleUrls: ['../demo-common.scss'],
    standalone: false
})
export class WithTransitionProgressComponent implements OnInit {
  array = [1, 2, 3, 4];
  height = '200px';
  activeIndex = 0;

  getIndex(index) {
    console.log(this.activeIndex);
    console.log(index);
  }

  constructor() {}

  ngOnInit(): void {}
}
