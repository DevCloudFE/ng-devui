import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';

@Component({
  selector: 'd-datepicker-range-format',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./date-range-picker-format.component.html`,
  styleUrls: [`./date-range-picker-format.component.css`]
})
export class DateRangePickerFormatComponent implements OnInit {
  dateRange1 = [null, null];
  dateRange2 = [null, null];
  dateFormatOptions = ['y-MM-dd HH:mm:ss', 'yy.MM.dd HH:mm', 'MM/dd/y HH:mm:ss', 'MM/dd/yy HH:mm'];
  splitterOptions = ['  -  ', ' ~ ', ' -- ', ' == '];
  dateFormat: string;
  splitter: string;
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

  ngOnInit() {
    this.dateFormat = this.dateFormatOptions[0];
    this.splitter = this.splitterOptions[0];
  }

}
