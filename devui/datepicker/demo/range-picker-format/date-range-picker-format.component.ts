import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

@Component({
    selector: 'd-datepicker-range-format',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: `./date-range-picker-format.component.html`,
    styleUrls: [`./date-range-picker-format.component.scss`],
    standalone: false
})
export class DateRangePickerFormatComponent {
  dateRange1 = [null, null];
  dateRange2 = [null, null];
  dateFormatOptions = ['y-MM-dd HH:mm:ss', 'yy.MM.dd HH:mm', 'MM/dd/y HH:mm:ss', 'MM/dd/yy HH:mm'];
  splitterOptions = ['  -  ', ' ~ ', ' -- ', ' == '];
  dateFormat = 'y-MM-dd HH:mm:ss';
  splitter = '  -  ';
  dateConfig = {
    timePicker: true,
    dateConverter: null,
    min: 2019,
    max: 2020,
    format: {
      date: 'MM.dd.y',
      time: 'y-MM-dd HH:mm:ss'
    }
  };

  everyRange(range) {
    return range.every(_ => !!_);
  }

  getValue(value) {
    console.log(value);
  }

}
