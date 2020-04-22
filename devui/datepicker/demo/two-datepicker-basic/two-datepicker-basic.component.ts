import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'd-two-datepicker-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./two-datepicker-basic.component.html`,
  styleUrls: [`./two-datepicker-basic.component.css`]
})
export class TwoDatepickerBasicComponent implements OnInit {
  rangeStart;
  rangeEnd;

  ngOnInit() {
  }

  selectStart(value) {
    console.log('start', value);
  }
  selectEnd(value) {
    console.log('end', value);
  }
  selectRange(value) {
    console.log(value);
  }
}
