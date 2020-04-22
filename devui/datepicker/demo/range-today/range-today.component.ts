import {
  Component,
  ChangeDetectionStrategy,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'd-range-today',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './range-today.component.html',
  styleUrls: ['./range-today.component.css']
})
export class RangePickerTodayComponent {
  dateRange = [null, null];
  dateRange2 = [new Date('11/03/2017 00:00'), new Date('01/02/2019 00:00')];


  getValue(value) {
    console.log(value);
  }

  getDay(num: number) {
    const day = new Date();
    const nowTime = day.getTime();
    const ms = 24 * 3600 * 1000 * num;
    day.setTime(Math.floor(nowTime + ms));
    return new Date(day);
  }
}
