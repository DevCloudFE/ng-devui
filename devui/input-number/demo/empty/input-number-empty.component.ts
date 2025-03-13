import { Component } from '@angular/core';

@Component({
    selector: 'd-input-number-empty',
    templateUrl: './input-number-empty.component.html',
    styleUrls: ['./input-number-empty.component.css'],
    standalone: false
})
export class InputNumberEmptyComponent {
  min = -100;
  max = 1000;
  step = 1;
  value = null;

  constructor() {
  }

  showValue($event, text = null) {
    console.log(text ? text + ' ' + $event : $event);
  }

  blurDetection($event: FocusEvent) {
    console.log('input number blurred');
  }
}
