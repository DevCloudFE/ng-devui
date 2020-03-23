import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'd-clear-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './clear-button.component.html',
  styleUrls: ['./clear-button.component.css']
})
export class DatepickerClearButtonComponent implements OnInit {
  datePicker1: any;
  selectedDate2 = null;
  ngOnInit() {
  }
  getValue(value) {
    // tslint:disable-next-line:no-console
    console.info(value);
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

}
