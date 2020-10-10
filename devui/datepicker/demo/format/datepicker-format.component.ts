import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'd-datepicker-format',
    templateUrl: './datepicker-format.component.html',
    styleUrls: [`./datepicker-format.component.scss`]
})
export class DatepickerFormatComponent implements OnInit {
  dateFormatOptions = ['y/MM/dd HH:mm:ss', 'y-MM-dd HH:mm:ss', 'yy.MM.dd HH:mm', 'MM/dd/y HH:mm:ss', 'MM/dd/yy HH:mm'];
  dateFormat: string;
  selectedDate3 = new Date('01/02/2017 09:11');
  maxDate = new Date('12/31/2017 09:11');
  minDate = new Date('01/02/2016 09:11');

  ngOnInit() {
    this.dateFormat = this.dateFormatOptions[0];
  }
}
