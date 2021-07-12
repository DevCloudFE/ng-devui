import {
  AfterViewInit,
  Component, ContentChild, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, TemplateRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatepickerProService } from './datepicker-pro.service';

@Component({
  selector: 'd-datepicker-calendar',
  templateUrl: './datepicker-pro-calendar.component.html',
  styleUrls: ['./datepicker-pro-calendar.component.scss'],
  providers: [
    DatepickerProService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerProCalendarComponent),
      multi: true
    }
  ],
  preserveWhitespaces: false,
})
export class DatepickerProCalendarComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() isRangeType = false;
  @Input() showTime = false;
  @Input() mode: 'year' | 'month' | 'date' | 'week' = 'date';
  @Input() startIndexOfWeek = 0;
  @Input() set activeRangeType(type: 'start' | 'end') {
    this.pickerSrv.currentActiveInput = type;
    this.pickerSrv.activeInputChange.next(type);
  }

  @Output() confirmEvent = new EventEmitter<Date | Date[]>();

  @ContentChild('customTemplate') customTemplate: TemplateRef<any>;
  @ContentChild('footerTemplate') footerTemplate: TemplateRef<any>;

  get curActiveDate(): Date {
    if (this.pickerSrv.currentActiveInput === 'start') {
      return this.pickerSrv.curRangeDate[0] || this.pickerSrv.curRangeDate[1] || new Date();
    } else {
      return this.pickerSrv.curRangeDate[1] || this.pickerSrv.curRangeDate[0] || new Date();
    }
  }

  unsubscribe$ = new Subject();

  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor(
    private pickerSrv: DatepickerProService
  ) {
  }

  ngOnInit() {
    this.initSrvStatus();
    this.initObservable();
  }

  ngAfterViewInit(): void {
    this.updateCurPosition();
  }

  public updateCurPosition() {
    this.pickerSrv.toggleEvent.next(true);
  }

  clear() {
    this.pickerSrv.updateDateValue.next({
      type: this.isRangeType ? 'range' : 'single',
      value: this.isRangeType ? [] : null
    });

    this.pickerSrv.updateTimeChange.next({
      hour: null,
      min: null,
      seconds: null
    });
    if (this.isRangeType) {
      this.pickerSrv.curRangeDate = [];
      this.onChange(this.pickerSrv.curRangeDate);
    } else {
      this.pickerSrv.curDate = null;
      this.onChange(this.pickerSrv.curDate);
    }
  }

  private initSrvStatus() {
    this.pickerSrv.showTime = this.showTime;
    this.pickerSrv.isRange = this.isRangeType;
    this.pickerSrv.startIndexOfWeek = this.startIndexOfWeek;
  }

  private initObservable() {
    this.pickerSrv.selectedDateChange.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(change => {
      if (this.isRangeType) {
        this.pickerSrv.curRangeDate = change.value as Date[];
        this.onChange(this.pickerSrv.curRangeDate);
      } else {
        this.pickerSrv.curDate = change.value as Date;
        this.onChange(change.value);
      }

    });

    this.pickerSrv.selectedTimeChange.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(time => {
      if (this.isRangeType) {
        const curTime = new Date(this.curActiveDate.getTime()).setHours(time.hour, time.min, time.seconds);
        const curDate = new Date(curTime);
        if (time.activeInput === 'start') {
          this.pickerSrv.curRangeDate[0] = curDate;
          if (this.isSameDateAndTimeWrong()) {
            this.pickerSrv.curRangeDate[1] = curDate;
          }
        } else {
          this.pickerSrv.curRangeDate[1] = curDate;
          if (this.isSameDateAndTimeWrong()) {
            this.pickerSrv.curRangeDate[0] = curDate;
          }
        }
        this.onChange(this.pickerSrv.curRangeDate);
      } else {
        const curDate = new Date((this.pickerSrv.curDate || new Date()).setHours(time.hour, time.min, time.seconds));
        this.pickerSrv.curDate = curDate;
        this.onChange(curDate);
      }

    });

    this.pickerSrv.closeDropdownEvent.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(isConfirm => {
      if (isConfirm) {
        this.confirmEvent.emit(this.pickerSrv.curDate || this.pickerSrv.curRangeDate);
      }
    });
  }

  isSameDateAndTimeWrong(): boolean {
    if (this.pickerSrv.curRangeDate[0]?.toDateString() === this.pickerSrv.curRangeDate[1]?.toDateString()) {
      return this.pickerSrv.curRangeDate[0].getTime() > this.pickerSrv.curRangeDate[1].getTime();
    }
    return false;
  }

  writeValue(value: Date | Date[]) {
    if (this.isRangeType) {
      this.writeRangeValue(value as Date[]);
    } else {
      this.writeSingleValue(value as Date);
    }
  }

  writeRangeValue(value: Date[]) {
    if (!value || !value.length) {
      return;
    }

    if (value.find(t => !this.pickerSrv.dateInRange(t))) {
      return;
    }

    this.pickerSrv.curRangeDate = value;
    this.pickerSrv.updateDateValue.next({
      type: 'range',
      value
    });
  }

  writeSingleValue(value: Date) {
    if (!value) {
      return;
    }
    if (!this.pickerSrv.dateInRange(new Date(value))) {
      this.clear();
      return;
    }
    this.pickerSrv.curDate = value;
    this.pickerSrv.updateDateValue.next({
      type: 'single',
      value
    });

    if (this.showTime) {
      this.pickerSrv.updateTimeChange.next({
        hour: value.getHours(),
        min: value.getMinutes(),
        seconds: value.getSeconds()
      });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
