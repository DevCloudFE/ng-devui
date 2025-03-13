import {
  ChangeDetectionStrategy,
  Component,
  HostBinding
} from '@angular/core';
import { SelectDateRangeChangeReason } from 'ng-devui/datepicker';

@Component({
    selector: 'd-range-clear-button',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'range-clear-button.component.html',
    styleUrls: ['./range-clear-button.component.scss'],
    standalone: false
})
export class RangeClearButtonComponent {
  dateRange = [null, null];
  dateRange2 = [new Date('11/03/2017 00:00'), new Date('01/02/2019 00:00')];
  changeReason = SelectDateRangeChangeReason;

  everyRange(range) {
    return range.every(_ => !!_);
  }

  getValue(value) {
    console.log(value);
  }

}
