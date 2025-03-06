import {
  Component
} from '@angular/core';

@Component({
    selector: 'd-basic-datepicker-pro',
    templateUrl: './basic-datepicker-pro.component.html',
    standalone: false
})
export class BasicDatepickerProComponent {
  value1;
  value2 = new Date();
  value3 = new Date();
  value4 = new Date();
  minDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 2));
  constructor() {
  }

  onChange(date) {
    console.log(date);
  }

}
