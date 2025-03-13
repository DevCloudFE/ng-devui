import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

@Component({
    selector: 'd-datepicker-range-time',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: `./date-range-picker-time.component.html`,
    styleUrls: [`./date-range-picker-time.component.scss`],
    standalone: false
})
export class DateRangePickerTimeComponent {
  dateRange = [null, null];
  dateRange2 = [new Date('07/07/2019 00:07:00'), new Date('09/01/2019 00:08:00')];

  everyRange(range) {
    return range.every(_ => !!_);
  }

  getValue(value) {
    console.log(value);
  }

}
