import { Component } from '@angular/core';

@Component({
  selector: 'd-date-pipe',
  templateUrl: './date-pipe.component.html',
})
export class DatePipeDemoComponent {
  date = new Date(2014, 1, 11, 13, 1, 22);
  date1 = new Date(2015, 4, 5);
  constructor() {}
}
