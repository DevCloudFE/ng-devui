import {Component} from '@angular/core';

@Component({
    selector: 'd-input-number-disabled',
    templateUrl: './input-number-disabled.component.html',
    styleUrls: ['./input-number-disabled.component.css'],
    standalone: false
})
export class InputNumberDisabledComponent {
  min = 1;
  max = 10;
  value = 6;
}
