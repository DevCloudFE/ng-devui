import {
  Component, ViewChild
} from '@angular/core';
import { RangeDatepickerProComponent } from 'ng-devui/datepicker-pro';

@Component({
    selector: 'd-range-template-picker',
    templateUrl: './range-template.component.html',
    styleUrls: ['./range-template.component.scss'],
    standalone: false
})
export class RangeTemplatePickerComponent {
  @ViewChild(RangeDatepickerProComponent) rangePicker: RangeDatepickerProComponent;
  value1 = [new Date('2020/03/01'), new Date('2020/04/20')];
  today = new Date();
  constructor() {
  }

  setDate(days: number) {
    this.value1 = [
      new Date(this.today.getTime() + days * 24 * 3600 * 1000),
      this.today
    ];
  }

  selectThisWeek() {
    const start = new Date(new Date().setDate(this.today.getDate() - this.today.getDay()));
    const end = new Date(new Date().setDate(start.getDate() + 6));
    this.value1 = [
      start,
      end
    ];
  }

  clearStart() {
    this.value1 = [null, this.value1[1]];
    this.rangePicker.focusChange('start');
  }

  clearEnd() {
    this.value1 = [this.value1[0], null];
    this.rangePicker.focusChange('end');
  }

}
