import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'd-datepicker-button',
  styleUrls: [`./button.component.css`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.component.html',
})
export class DatepickerButtonComponent {
  datePicker1: any;
  selectedDate2 = null;

  getValue(value) {
    console.log(value);
  }
}
