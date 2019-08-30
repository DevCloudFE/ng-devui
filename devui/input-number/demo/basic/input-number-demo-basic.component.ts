import {Component} from '@angular/core';

@Component({
  selector: 'd-input-number-demo-basic',
  templateUrl: './input-number-demo-basic.component.html',
  styleUrls: ['./input-number-demo-basic.component.css']
})
export class InputNumberDemoBasicComponent {
  min = -100;
  max = 1000;
  step = 1;
  value = 2;

  showValue($event, text = null) {
    console.log(text ? text + ' ' + $event : $event);
  }
}
