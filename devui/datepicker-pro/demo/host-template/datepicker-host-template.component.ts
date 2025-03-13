import {
  Component, ViewChild
} from '@angular/core';
import { DatepickerProComponent, RangeDatepickerProComponent } from 'ng-devui/datepicker-pro';

@Component({
    selector: 'd-datepicker-pro-host',
    templateUrl: './datepicker-host-template.component.html',
    standalone: false
})
export class DatepickerProHostComponent {
  @ViewChild(RangeDatepickerProComponent) rangePicker: RangeDatepickerProComponent;
  @ViewChild(DatepickerProComponent) singlePicker: DatepickerProComponent;
  value1 = new Date();
  value2 = [];
  constructor() {
  }

}
