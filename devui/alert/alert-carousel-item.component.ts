import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'd-alert-carousel-item',
  styleUrls: ['./alert-carousel-item.component.scss'],
  template: `<ng-content></ng-content>`,
  preserveWhitespaces: false,
})
export class AlertCarouselItemComponent {
  constructor(public el: ElementRef) {}
}
