import {
  Component
} from '@angular/core';

@Component({
selector: 'd-show-time-datepicker-pro',
templateUrl: './show-time-picker.component.html',
})
export class ShowTimeDatepickerProComponent {
  value = new Date();
  minDate = new Date(new Date().setMonth(0));
  constructor() {
  }
}
