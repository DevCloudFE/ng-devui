import {
  Component,
  ChangeDetectionStrategy,
  HostBinding
} from '@angular/core';

@Component({
    selector: 'd-range-clear-button',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'range-clear-button.component.html',
    styleUrls: ['./range-clear-button.component.css']
})
export class RangeClearButtonComponent {
  dateRange = [null, null];
  dateRange2 = [new Date('11/03/2017 00:00'), new Date('01/02/2019 00:00')];

  getValue(value) {
    console.log(value);
  }

}
