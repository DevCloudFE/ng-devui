import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';

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
    // tslint:disable-next-line:no-console
    console.info(value);
  }
}
