import {Component} from '@angular/core';

@Component({
  selector: 'd-input-number-demo-disabled',
  templateUrl: './input-number-demo-disabled.component.html',
  styleUrls: ['./input-number-demo-disabled.component.css']
})
export class InputNumberDemoDisabledComponent {
  min = 1;
  max = 10;
  value = 6;
}
