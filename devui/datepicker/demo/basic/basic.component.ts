import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'd-basic',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './basic.component.html'
})
export class DatepickerDemoBasicComponent implements OnInit {
  datePicker1: any;
  selectedDate2 = null;
  ngOnInit() {
  }

  getValue(value) {
    console.log(value);
  }
}
