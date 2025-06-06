import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'd-basic',
    styleUrls: [`./basic.component.scss`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './basic.component.html',
    standalone: false
})
export class DatepickerDemoBasicComponent {
  selectedDate1 = new Date();
  selectedDate2 = null;
  selectedDate3 = null;
  disabled = true;
  dateConfig = {
    timePicker: true,
    dateConverter: null,
    min: 2019,
    max: 2040,
    format: {
      date: 'MM.dd.y',
      time: 'y-MM-dd HH:mm:ss'
    }
  };

  getValue(value) {
    console.log(value);
  }
}
