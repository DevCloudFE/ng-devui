import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-carousel-item',
  template: `<ng-content></ng-content>`
})
export class CarouselItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
