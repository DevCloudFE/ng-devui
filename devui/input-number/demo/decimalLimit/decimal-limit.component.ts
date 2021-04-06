import { Component } from '@angular/core';

@Component({
  selector: 'd-decimal-limit',
  templateUrl: './decimal-limit.component.html',
  styleUrls: ['./decimal-limit.component.css']
})
export class DecimalLimitComponent {
  value = 2;

  showValue($event, text = null) {
    console.log(text ? text + ' ' + $event : $event);
  }
}
