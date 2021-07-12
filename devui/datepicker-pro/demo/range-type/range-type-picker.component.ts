import {
  Component
} from '@angular/core';

@Component({
selector: 'd-range-type-picker',
templateUrl: './range-type-picker.component.html',
})
export class RangeTypepickerProComponent {
  value1 = [new Date('2020/03/01'), new Date('2020/04/20')];
  value2 = [new Date('2020/03/01'), new Date('2020/04/20')];
  value3 = [];
  value4 = [];
  value5 = [];
  minDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 2));
  constructor() {

  }

  onChange(dateList) {
    console.log(dateList);
  }

}
