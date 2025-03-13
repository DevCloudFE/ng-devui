import { Component } from '@angular/core';

@Component({
    selector: 'd-input-number-placeholder-maxlength',
    templateUrl: './input-number-placeholder-maxLength.component.html',
    styleUrls: ['./input-number-placeholder-maxLength.component.css'],
    standalone: false
})
export class InputNumberPlaceholderAndMaxLengthComponent {
  min = -100;
  max = 1000;
  step = 1;
  value = 3;

  constructor() {
  }

  showValue($event, text = null) {
    console.log(text ? text + ' ' + $event : $event);
  }

  blurDetection($event: FocusEvent) {
    console.log('input number blurred');
  }
}
