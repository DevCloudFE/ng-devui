import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'd-datepicker-range-disabled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./date-range-picker-disabled.component.html`,
  styleUrls: [`./date-range-picker-disabled.component.css`]
})
export class DateRangePickerDisabledComponent {
  dateRange = [new Date('11/03/2017 00:00'), new Date('01/02/2019 00:00')];
  disabled = true;

  getValue(value) {
    // tslint:disable-next-line:no-console
    console.info(value);
  }

}
