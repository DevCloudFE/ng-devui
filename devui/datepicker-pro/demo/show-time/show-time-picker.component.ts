import {
  Component
} from '@angular/core';

@Component({
  selector: 'd-show-time-datepicker-pro',
  templateUrl: './show-time-picker.component.html',
})
export class ShowTimeDatepickerProComponent {
  value = new Date();
  minDate = new Date('2023/4/19 20:30:30');
  maxDate = new Date(new Date().setHours(21));
  constructor() {
  }
}
