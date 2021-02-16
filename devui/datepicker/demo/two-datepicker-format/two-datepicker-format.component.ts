import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit
} from '@angular/core';

@Component({
  selector: 'd-two-datepicker-format',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./two-datepicker-format.component.html`,
  styleUrls: [`./two-datepicker-format.component.scss`]
})
export class TwoDatepickerFormatComponent implements OnInit {
  dateFormatOptions = ['y-MM-dd HH:mm:ss', 'yy.MM.dd HH:mm', 'MM/dd/y HH:mm:ss', 'MM/dd/yy HH:mm'];
  dateFormat: string;
  rangeStart1;
  rangeEnd1;
  rangeStart2;
  rangeEnd2;
  dateConfig = {
    dateConverter: null,
    min: 2019,
    max: 2020,
    format: {
      date: 'MM.dd.y',
      time: 'y-MM-dd HH:mm:ss'
    }
  };

  ngOnInit() {
    this.dateFormat = this.dateFormatOptions[0];
  }

  selectStart(value) {
    console.log('start', value);
  }
  selectEnd(value) {
    console.log('end', value);
  }
  selectRange(value) {
    console.log(value);
  }
}
