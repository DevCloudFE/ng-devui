import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { I18nFormat, I18nInterface, I18nService } from 'ng-devui/i18n';
import { DefaultDateConverter } from 'ng-devui/utils';
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
  @Input() set activeRangeType(type: 'start' | 'end') {
    this.pickerSrv.currentActiveInput = type;
    this.focusChange(type);
    this.pickerSrv.activeInputChange.next(type);
  }

  get curActiveDate(): Date {
    if (this.pickerSrv.currentActiveInput === 'start') {
      return this.pickerSrv.curRangeDate[0] || this.pickerSrv.curRangeDate[1] || new Date();
    } else {
      return this.pickerSrv.curRangeDate[1] || this.pickerSrv.curRangeDate[0] || new Date();
    }
  }

  set currentActiveInput(value: 'start' | 'end') {
    this.pickerSrv.currentActiveInput = value;
  }
  get currentActiveInput(): 'start' | 'end' {
    return this.pickerSrv.currentActiveInput;
  }

  get dateValue() {
    return this._dateValue;
  }

  set dateValue(value: string[]) {
    this._dateValue = value;
    this.getStrWidth();
  }

  get curFormat(): string {
    if (this.mode === 'year') {
      return 'y';
    } else if (this.mode === 'month') {
      return this.i18nFormat.ultraShort;
    } else {
      return this.showTime ? this.i18nFormat.long : this.i18nFormat.short;
    }
  }

  @Input() isRangeType = false;
  @Input() showTime = false;
  @Input() mode: 'year' | 'month' | 'date' | 'week' = 'date';
  @Input() startIndexOfWeek = 0;
  @Input() splitter = '-';
  @Input() showRangeHeader = true;
  @Input() placeholder: string[];
  @Input() allowClear = true;

  @Input() set minDate(value: Date) {
    if (!value) {
      this.pickerSrv.resetMin();
      return;
    }
    this.pickerSrv.minDate = value;
  }
  @Input() set maxDate(value: Date) {
    if (!value) {
      this.pickerSrv.resetMax();
      return;
    }
    this.pickerSrv.maxDate = value;
  }

  @Input() set markedRangeDateList(value: Date[][]) {
    this.pickerSrv.markedRangeDateList = value;
  };
  @Input() set markedDateList(value: Date[]) {
    this.pickerSrv.markedDateList = value;
  }

  @Output() confirmEvent = new EventEmitter<Date | Date[]>();
  @Output() cancelEvent = new EventEmitter<void>();

  @ContentChild('customTemplate') customTemplate: TemplateRef<any>;
  @ContentChild('footerTemplate') footerTemplate: TemplateRef<any>;
  @ContentChild('markDateInfoTemplate') set markDateInfoTemplate(tmp: TemplateRef<any>) {
    this.pickerSrv.markDateInfoTemplate = tmp;
  };

  @ViewChild('dateInputStart') datepickerInputStart: ElementRef;
  @ViewChild('dateInputEnd') datepickerInputEnd: ElementRef;

  strWidth = 0;
  _dateValue = [];
  i18nText: any;
  i18nFormat: any;
  datepickerConvert: DefaultDateConverter;
  unsubscribe$ = new Subject<void>();
  private i18nLocale: I18nInterface['locale'];

  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor(public pickerSrv: DatepickerProService, private i18n: I18nService) {
    this.datepickerConvert = new DefaultDateConverter();
  }

  ngOnInit() {
    this.setI18nText();
    this.initSrvStatus();
    this.initObservable();
  }

  ngAfterViewInit(): void {
    this.updateCurPosition();
  }

  private setI18nText() {
    this.setI18nTextDetail(this.i18n.getI18nText());
    this.i18n
      .langChange()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => this.setI18nTextDetail(data));
  }

  private setI18nTextDetail(data) {
    this.i18nText = data.datePickerPro;
    this.i18nLocale = data.locale;
    this.i18nFormat = I18nFormat.localFormat[this.i18nLocale];
  }

  public updateCurPosition() {
    this.pickerSrv.toggleEvent.next(true);
  }

  clear(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
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
      this.dateValue = [];
      this.pickerSrv.curRangeDate = [];
      this.currentActiveInput = 'start';
      if (event) {
        this.onChange(this.pickerSrv.curRangeDate);
      }
    } else {
      this.pickerSrv.curDate = null;
      if (event) {
        this.onChange(this.pickerSrv.curDate);
      }
    }
  }

  private initSrvStatus() {
    this.pickerSrv.showTime = this.showTime;
    this.pickerSrv.isRange = this.isRangeType;
    this.pickerSrv.startIndexOfWeek = this.startIndexOfWeek;
  }

  private formatDateToString(date: Date): string {
    if (!date) {
      return '';
    }
    return this.datepickerConvert.format(date, this.curFormat);
  }

  private initObservable() {
    this.pickerSrv.selectedDateChange.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(change => {
      if (this.isRangeType) {
        this.pickerSrv.curRangeDate = change.value as Date[];
        this.dateValue = (change.value as Date[]).map(d => this.formatDateToString(d));
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
            this.dateValue[1] = this.formatDateToString(curDate);
          }
          this.dateValue = [this.formatDateToString(curDate), this.dateValue[1]];
        } else {
          this.pickerSrv.curRangeDate[1] = curDate;
          if (this.isSameDateAndTimeWrong()) {
            this.pickerSrv.curRangeDate[0] = curDate;
            this.dateValue[0] = this.formatDateToString(curDate);
          }
          this.dateValue = [this.dateValue[0], this.formatDateToString(curDate)];
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
      } else {
        this.cancelEvent.emit();
      }
    });
  }

  focusChange(type: 'start' | 'end') {
    this.currentActiveInput = type;
    this.pickerSrv.activeInputChange.next(type);
    if (type === 'start') {
      setTimeout(() => {
        if (this.datepickerInputStart?.nativeElement) {
          this.datepickerInputStart.nativeElement.focus();
        }
      });
    } else {
      setTimeout(() => {
        if (this.datepickerInputEnd?.nativeElement) {
          this.datepickerInputEnd.nativeElement.focus();
        }
      });
    }
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
      this.clear();
      return;
    }

    this.dateValue = value.map(d => {
      return d ? this.datepickerConvert.format(d, this.curFormat) : '';
    });

    this.pickerSrv.curRangeDate = value;
    this.pickerSrv.updateDateValue.next({
      type: 'range',
      value
    });
  }

  writeSingleValue(value: Date) {
    if (!value) {
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

  getStrWidth() {
    let str = this.pickerSrv.currentActiveInput === 'start' ? this.dateValue[0] : this.dateValue[1];
    if (!str || !str.length) {
      str = this.pickerSrv.currentActiveInput === 'start' ? this.i18nText.startPlaceholder : this.i18nText.endPlaceholder;
    }
    this.strWidth = this.pickerSrv.mearsureStrWidth(str);
  }
}
