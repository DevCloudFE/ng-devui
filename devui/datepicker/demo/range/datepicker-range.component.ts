import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'd-datepicker-range',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datepicker-range.component.html',
  styleUrls: ['./datepicker-range.component.css']
})
export class DatepickerRangeComponent implements OnInit {
  datePicker1: any;

  startDate = new Date();
  endDate = null;
  ngOnInit() {
  }
  getValue(value) {
    console.log(value);
  }
  getDay(num: number, str = '-') {
    const day = new Date();
    const nowTime = day.getTime();
    const ms = 24 * 3600 * 1000 * num;
    day.setTime(Math.floor(nowTime + ms));
    const oYear = day.getFullYear();
    let oMoth = (day.getMonth() + 1).toString();
    if (oMoth.length <= 1) { oMoth = '0' + oMoth; }
    let oDay = day.getDate().toString();
    if (oDay.length <= 1) { oDay = '0' + oDay; }
    return oYear + str + oMoth + str + oDay;
  }

  getNextWeekday(num: number, str = '-') {
    const day = this.startDate;
    const nowTime = day.getTime();
    const ms = 24 * 3600 * 1000 * num;
    day.setTime(Math.floor(nowTime + ms));
    const oYear = day.getFullYear();
    let oMoth = (day.getMonth() + 1).toString();
    if (oMoth.length <= 1) { oMoth = '0' + oMoth; }
    let oDay = day.getDate().toString();
    if (oDay.length <= 1) { oDay = '0' + oDay; }
    return oYear + str + oMoth + str + oDay;
  }

}
