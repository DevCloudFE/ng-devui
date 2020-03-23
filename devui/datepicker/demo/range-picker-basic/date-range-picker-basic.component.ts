import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'd-datepicker-range-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./date-range-picker-basic.component.html`,
  styleUrls: [`./date-range-picker-basic.component.css`]
})
export class DateRangePickerBasicComponent {
  dateRange = [null, null];
  dateRange2 = [new Date('11/03/2017 00:00'), new Date('01/02/2019 00:00')];

  getValue(value) {
    // tslint:disable-next-line:no-console
    console.info(value);
  }

}
