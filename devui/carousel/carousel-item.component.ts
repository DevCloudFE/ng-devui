import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-carousel-item',
  template: `<ng-content></ng-content>`,
  preserveWhitespaces: false,
})
export class CarouselItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
