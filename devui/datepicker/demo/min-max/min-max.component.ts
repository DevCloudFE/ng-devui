import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'd-min-max',
    styleUrls: [`./min-max.component.scss`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './min-max.component.html'
})
export class DatepickerDemoMinMaxComponent {
  selectedDate1 = null;
  selectedDate2 = null;
  selectedDate3 = null;
  today = new Date();
  min = new Date(this.today.setDate(this.today.getDate() - 1));
  max = new Date(this.today.setDate(this.today.getDate() + 1));

  getValue(value) {
    console.log(value);
  }
}
