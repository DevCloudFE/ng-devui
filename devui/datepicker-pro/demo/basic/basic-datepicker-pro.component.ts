import {
  Component
} from '@angular/core';

@Component({
selector: 'd-basic-datepicker-pro',
templateUrl: './basic-datepicker-pro.component.html',
})
export class BasicDatepickerProComponent {
  value1;
  value2 = new Date();
  value3 = new Date();
  value4 = new Date('2021/04/01');
  minDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 2));
  constructor() {
  }

  onChange(date) {
    console.log(date);
  }

}
