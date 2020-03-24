import {Component} from '@angular/core';

@Component({
  selector: 'd-input-number-basic',
  templateUrl: './input-number-basic.component.html',
  styleUrls: ['./input-number-basic.component.css']
})
export class InputNumberBasicComponent {
  min = -100;
  max = 1000;
  step = 1;
  value = 2;

  showValue($event, text = null) {
    console.log(text ? text + ' ' + $event : $event);
  }
}
