import { Component } from '@angular/core';

const ONE_HOUR_TIME = 60 * 60 * 1000;
const ONE_DAY_TIME = ONE_HOUR_TIME * 24;
const ONE_WEEK_TIME = ONE_DAY_TIME * 7;
@Component({
  selector: 'd-demo-datepicker-pro-static-panel',
  templateUrl: './datepicker-pro-static-panel.component.html',
  styleUrls: ['./datepicker-pro-static-panel.component.scss'],
})
export class DatepickerProStaticPanelComponent {

  value1 = new Date();

  onClickEnsure(date) {
    console.log(date);
  }
}
