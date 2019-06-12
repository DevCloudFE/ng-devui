import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ave-datepicker-demo-format',
    templateUrl: './datepicker-demo-format.component.html'
})
export class DatepickerDemoFormatComponent implements OnInit {
  dateFormatOptions = ['YYYY-MM-DD HH:mm', 'YY-MM-DD HH:mm', 'MM/DD/YYYY HH:mm', 'MM/DD/YY HH:mm'];
  dateFormat: string;
  selectedDate3 = new Date('01/02/2017 09:11');
  maxDate = new Date('12/31/2017 09:11');
  minDate = new Date('01/02/2016 09:11');

  ngOnInit() {
    this.dateFormat = this.dateFormatOptions[0];
  }
}
