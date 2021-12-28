import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-datepicker-button',
  styleUrls: [`./button.component.css`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.component.html'
})
export class DatepickerButtonComponent implements OnInit {
  datePicker1: any;
  selectedDate2 = null;

  ngOnInit() {
  }

  getValue(value) {
    console.log(value);
  }
}
