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
    // tslint:disable-next-line:no-console
    console.info('start', value);
  }
  selectEnd(value) {
    // tslint:disable-next-line:no-console
    console.info('end', value);
  }
  selectRange(value) {
    // tslint:disable-next-line:no-console
    console.info(value);
  }
}
