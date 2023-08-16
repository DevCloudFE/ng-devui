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
  minDate = new Date('2023/4/19 20:30:30');
  maxDate = new Date().setHours(21);
  constructor() {

  }

  onChange(dateList) {
    console.log(dateList);
  }

}
