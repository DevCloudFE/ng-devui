import {Component} from '@angular/core';

@Component({
  selector: 'd-input-number-reg',
  templateUrl: './input-number-reg.component.html',
  styleUrls: ['./input-number-reg.component.css']
})
export class InputNumberRegComponent {
  reg = /^(-|\+)?\d*$/;
  regStr = '^(-|\\+)*\\d*$';
  value = 2;

  showValue($event, text = null) {
    console.log(text ? text + ' ' + $event : $event);
  }

  blurDetection($event: FocusEvent) {
    console.log('input number blurred');
  }
}
