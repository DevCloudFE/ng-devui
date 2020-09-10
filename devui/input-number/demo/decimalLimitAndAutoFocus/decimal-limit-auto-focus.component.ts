import {Component} from '@angular/core';

@Component({
  selector: 'd-decimal-limit-auto-focus',
  templateUrl: './decimal-limit-auto-focus.component.html',
  styleUrls: ['./decimal-limit-auto-focus.component.css']
})
export class DecimalLimitAutoFocusComponent {
  value = 2;

  showValue($event, text = null) {
    console.log(text ? text + ' ' + $event : $event);
  }
}
