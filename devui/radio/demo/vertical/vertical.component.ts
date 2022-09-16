import { Component } from '@angular/core';

@Component({
  selector: 'd-vertical',
  templateUrl: './vertical.component.html',
})
export class VerticalComponent {
  values = ['Spring', 'Summer', 'Autumn', 'Winter'];
  choose = 'Summer';
  constructor() {}

  log($event) {
    console.log($event);
  }
}
