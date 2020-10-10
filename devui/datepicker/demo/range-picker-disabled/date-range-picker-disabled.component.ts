import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'd-datepicker-range-disabled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./date-range-picker-disabled.component.html`,
  styleUrls: [`./date-range-picker-disabled.component.scss`]
})
export class DateRangePickerDisabledComponent {
  dateRange = [new Date('11/03/2017 00:00'), new Date('01/02/2019 00:00')];
  disabled = true;

  everyRange(range) {
    return range.every(_ => !!_);
  }

  getValue(value) {
    console.log(value);
  }

  toggleDatePicker(dateRangePicker, $event, open?) {
    if (this.disabled) {
      return;
    }
    dateRangePicker.toggle($event, open);
  }
}
