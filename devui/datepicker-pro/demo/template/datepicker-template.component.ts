import {
  Component, ViewChild
} from '@angular/core';
import { DatepickerProComponent } from 'ng-devui/datepicker-pro';

@Component({
  selector: 'd-datepicker-pro-template',
  styleUrls: ['./datepicker-template.component.scss'],
  templateUrl: './datepicker-template.component.html',
})
export class DatepickerProTemplateComponent {
  @ViewChild('datepicker') datepickerPro: DatepickerProComponent;
  value = new Date();
  today = new Date();

  constructor() {
  }

  setDate(days: number) {
    this.value = new Date(this.today.getTime() + days * 24 * 3600 * 1000);
  }

  clear() {
    this.datepickerPro.clear();
  }

  getDateString(days: number): string {
    const date = new Date(this.today.getTime() + days * 24 * 3600 * 1000);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  }

}
