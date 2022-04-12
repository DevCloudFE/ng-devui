import { Component } from '@angular/core';

@Component({
  selector: 'd-set-mode',
  templateUrl: './set-mode.component.html',
  styleUrls: ['./set-mode.component.scss']
})
export class SetModeComponent {
  selectedDate1 = null;
  selectedDate2 = null;
  maxDate = new Date().setMonth(8);
  getValue(value) {
    // 当[mode]="'year'",返回值是当年第一天的日期对象，请右键检查打开console查看
    // 当[mode]="'month'",返回值是当月第一天的日期对象，请右键检查打开console查看
    console.log(value);
  }

}
