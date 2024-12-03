import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EN_US, I18nFormat, I18nInterface, I18nService } from 'ng-devui/i18n';
import { DefaultDateConverter, DevConfigService, WithConfig } from 'ng-devui/utils';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { DatepickerProService } from './datepicker-pro.service';
import { DateConfig } from './lib/datepicker-pro.type';

@Component({
  selector: 'd-range-datepicker-pro',
  templateUrl: './range-datepicker-pro.component.html',
  styleUrls: ['./range-datepicker-pro.component.scss'],
  providers: [
    DatepickerProService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeDatepickerProComponent),
      multi: true,
    },
  ],
  preserveWhitespaces: false,
})
export class RangeDatepickerProComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
  @Input() mode: 'year' | 'month' | 'date' | 'week' = 'date';
  @Input() showTime = false;
  @Input() disabled = false;
  @Input() autoOpen = false;
  @Input() format: string;
  @Input() locale: string;
  @Input() cssClass: string;
  @Input() splitter = '-';
  @Input() width: string;
  @Input() startIndexOfWeek = 0;
  @Input() appendToBody = true;
  @Input() placeholder: string[];
  @Input() allowClear = true;
  @Input() set calenderRange(value) {
    this.pickerSrv.calendarRange = value || [1970, 2099];
  }
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
  }
  @Input() set markedDateList(value: Date[]) {
    this.pickerSrv.markedDateList = value;
  }
  @Input() @WithConfig() showGlowStyle = true;
  @HostBinding('class.devui-glow-style') get hasGlowStyle() {
    return this.showGlowStyle;
  }
  @Output() dropdownToggle = new EventEmitter<boolean>();
  @Output() confirmEvent = new EventEmitter<Date[]>();
  @ContentChild('customTemplate') customTemplate: TemplateRef<any>;
  @ContentChild('footerTemplate') footerTemplate: TemplateRef<any>;
  @ContentChild('hostTemplate') hostTemplate: TemplateRef<any>;
  @ContentChild('markDateInfoTemplate') set markDateInfoTemplate(tmp: TemplateRef<any>) {
    this.pickerSrv.markDateInfoTemplate = tmp;
  }
  @ViewChild('dateInputStart') datepickerInputStart: ElementRef;
  @ViewChild('dateInputEnd') datepickerInputEnd: ElementRef;

  private i18nLocale: I18nInterface['locale'];

  i18nText;
  i18nFormat;
  _dateValue = [];
  datepickerConvert: DefaultDateConverter;
  unsubscribe$ = new Subject<void>();
  isOpen = false;
  strWidth = 0;

  get dateValue() {
    return this._dateValue;
  }

  set dateValue(value: string[]) {
    this._dateValue = value;
    this.getStrWidth();
  }

  set currentActiveInput(value: 'start' | 'end') {
    this.pickerSrv.currentActiveInput = value;
  }

  get currentActiveInput(): 'start' | 'end' {
    return this.pickerSrv.currentActiveInput;
  }

  get dateConfig(): DateConfig {
    return {
      dateConverter: this.datepickerConvert,
      min: this.pickerSrv.minDate || new Date(this.pickerSrv.calendarRange[0] + '/01/01'),
      max: this.pickerSrv.maxDate || new Date(this.pickerSrv.calendarRange[1] + '/12/31'),
      format: {
        date: this.format || this.i18nFormat.short,
        time: this.format || this.i18nFormat.long,
        month: this.format || (this.i18nLocale === EN_US ? 'MMM dd' : this.i18nFormat.ultraShort),
        year: 'y',
      },
    };
  }

  get curFormat(): string {
    if (this.mode === 'year') {
      return this.dateConfig.format.year;
    } else if (this.mode === 'month') {
      return this.dateConfig.format.month;
    } else {
      return this.showTime ? this.dateConfig.format.time : this.dateConfig.format.date;
    }
  }

  get curActiveDate(): Date {
    if (this.pickerSrv.currentActiveInput === 'start') {
      return this.pickerSrv.curRangeDate[0] || this.pickerSrv.curRangeDate[1] || new Date();
    } else {
      return this.pickerSrv.curRangeDate[1] || this.pickerSrv.curRangeDate[0] || new Date();
    }
  }

  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor(
    private i18n: I18nService,
    private pickerSrv: DatepickerProService,
    private cdr: ChangeDetectorRef,
    private devConfigService: DevConfigService
  ) {
    this.i18nText = this.i18n.getI18nText().datePickerPro;
    this.datepickerConvert = new DefaultDateConverter();
  }

  ngOnInit() {
    this.initSrvStatus();
    this.setI18nText();
    setTimeout(() => {
      this.isOpen = this.autoOpen;
    });
  }

  ngAfterViewInit(): void {
    this.initObservable();
  }

  private initSrvStatus() {
    this.pickerSrv.showTime = this.showTime;
    this.pickerSrv.isRange = true;
    this.pickerSrv.startIndexOfWeek = this.startIndexOfWeek;
  }

  private initObservable() {
    this.pickerSrv.selectedDateChange.pipe(takeUntil(this.unsubscribe$)).subscribe((change) => {
      this.pickerSrv.curRangeDate = change.value as Date[];
      this.dateValue = (change.value as Date[]).map((d) => this.formatDateToString(d));
      this.onChange(change.value);
    });

    this.pickerSrv.closeDropdownEvent.pipe(takeUntil(this.unsubscribe$)).subscribe((isConfirm) => {
      this.isOpen = false;
      this.dropdownToggle.emit(false);
      if (isConfirm) {
        this.confirmEvent.emit(this.pickerSrv.curRangeDate);
        if (this.dateValue.length !== this.pickerSrv.curRangeDate.length) {
          this.onChange(this.pickerSrv.curRangeDate);
        }
        this.dateValue = this.pickerSrv.curRangeDate.map((d) => this.formatDateToString(d));
      }
    });

    this.pickerSrv.activeInputChange.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.getStrWidth();
    });

    if (!this.hostTemplate) {
      fromEvent(this.datepickerInputStart.nativeElement, 'input')
        .pipe(
          takeUntil(this.unsubscribe$),
          map((t) => {
            this.getStrWidth();
            return 'start';
          }),
          debounceTime(300)
        )
        .subscribe(this.inputChangeCallback);

      fromEvent(this.datepickerInputEnd.nativeElement, 'input')
        .pipe(
          takeUntil(this.unsubscribe$),
          map((t) => {
            this.getStrWidth();
            return 'end';
          }),
          debounceTime(300)
        )
        .subscribe(this.inputChangeCallback);

      fromEvent(this.datepickerInputStart.nativeElement, 'blur')
        .pipe(
          takeUntil(this.unsubscribe$),
          map((t) => 'start')
        )
        .subscribe(this.inputBlurCallback);

      fromEvent(this.datepickerInputEnd.nativeElement, 'blur')
        .pipe(
          takeUntil(this.unsubscribe$),
          map((t) => 'end')
        )
        .subscribe(this.inputBlurCallback);
    }

    if (this.showTime) {
      this.pickerSrv.selectedTimeChange.pipe(takeUntil(this.unsubscribe$)).subscribe((change) => {
        const curTime = new Date(this.curActiveDate.getTime()).setHours(change.hour, change.min, change.seconds);
        const curDate = new Date(curTime);
        if (change.activeInput === 'start') {
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
      });
    }
  }

  isSameDateAndTimeWrong(): boolean {
    if (this.pickerSrv.curRangeDate[0]?.toDateString() === this.pickerSrv.curRangeDate[1]?.toDateString()) {
      return this.pickerSrv.curRangeDate[0].getTime() > this.pickerSrv.curRangeDate[1].getTime();
    }
    return false;
  }

  getStrWidth() {
    let str = this.pickerSrv.currentActiveInput === 'start' ? this.dateValue[0] : this.dateValue[1];
    if (!str || !str.length) {
      str = this.pickerSrv.currentActiveInput === 'start' ? this.i18nText.startPlaceholder : this.i18nText.endPlaceholder;
    }
    this.strWidth = this.pickerSrv.mearsureStrWidth(str);
  }

  private formatDateToString(date: Date): string {
    if (!date) {
      return '';
    }
    return this.datepickerConvert.format(date, this.curFormat);
  }

  private setI18nText() {
    this.setI18nTextDetail(this.i18n.getI18nText());
    this.i18n
      .langChange()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.setI18nTextDetail(data);
        this.dateValue = this.pickerSrv.curRangeDate.map((d) => this.formatDateToString(d));
      });
  }

  private setI18nTextDetail(data) {
    this.i18nText = data.datePickerPro;
    this.i18nLocale = data.locale;
    this.i18nFormat = I18nFormat.localFormat[this.i18nLocale];
  }

  inputChangeCallback = (type) => {
    const targetValue = type === 'start' ? this.dateValue[0] : this.dateValue[1];
    if (!targetValue) {
      return;
    }
    const inputDate = this.datepickerConvert.parse(targetValue, this.curFormat);
    const curDate = type === 'start' ? this.pickerSrv.curRangeDate[0] : this.pickerSrv.curRangeDate[1];
    if (inputDate instanceof Date && inputDate.getTime() === curDate?.getTime()) {
      return;
    }

    if (this.validateDate(targetValue)) {
      if (type === 'start') {
        this.pickerSrv.curRangeDate[0] = inputDate;
      } else {
        this.pickerSrv.curRangeDate[1] = inputDate;
      }

      this.pickerSrv.updateDateValue.next({
        type: 'range',
        value: this.pickerSrv.curRangeDate,
      });
      this.onChange(this.pickerSrv.curRangeDate);

      if (this.showTime) {
        this.pickerSrv.updateTimeChange.next({
          activeInput: type,
          hour: inputDate.getHours(),
          min: inputDate.getMinutes(),
          seconds: inputDate.getSeconds(),
        });
      }
    }
  };

  inputBlurCallback = (type) => {
    const targetValue = type === 'start' ? this.dateValue[0] : this.dateValue[1];
    if (this.dateValue.length !== this.pickerSrv.curRangeDate.length) {
      this.onChange(this.pickerSrv.curRangeDate);
    }
    if (!this.validateDate(targetValue)) {
      if (type === 'start' && this.pickerSrv.curRangeDate[0]) {
        this.dateValue[0] = this.datepickerConvert.format(this.pickerSrv.curRangeDate[0], this.curFormat, this.locale || this.i18nLocale);
      } else if (type === 'end' && this.pickerSrv.curRangeDate[1]) {
        this.dateValue[1] = this.datepickerConvert.format(this.pickerSrv.curRangeDate[1], this.curFormat, this.locale || this.i18nLocale);
      }
    }
    this.getStrWidth();
  };

  public focusChange(type: 'start' | 'end') {
    if (this.disabled) {
      return;
    }
    if (!this.isOpen) {
      type = 'start';
    }
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

  validateDate(value: string) {
    const valueDate = this.datepickerConvert.parse(value, this.curFormat);
    const valueFormat =
      valueDate && !isNaN(valueDate.getTime()) && this.datepickerConvert.format(valueDate, this.curFormat, this.locale || this.i18nLocale);
    if (!valueDate || value !== valueFormat || (value === valueFormat && !this.pickerSrv.dateInRange(valueDate))) {
      return false;
    } else {
      return true;
    }
  }

  onToggle(isOpen) {
    if (isOpen !== this.isOpen || isOpen) {
      this.dropdownToggle.emit(isOpen);
    }
    this.isOpen = isOpen;
    this.pickerSrv.toggleEvent.next(isOpen);
  }

  openDropdown(event: Event) {
    if (this.isOpen) {
      event.stopPropagation();
    }

    if (this.disabled) {
      return;
    }

    this.isOpen = true;
  }

  clear(event?: MouseEvent, isHandle?: boolean) {
    if (event) {
      event.stopPropagation();
    }
    if (this.disabled && isHandle) {
      return;
    }
    this.pickerSrv.updateDateValue.next({
      type: 'range',
      value: [],
    });

    this.pickerSrv.updateTimeChange.next({
      hour: null,
      min: null,
      seconds: null,
    });
    this.dateValue = [];
    this.pickerSrv.curRangeDate = [];
    this.currentActiveInput = 'start';
    if (event) {
      this.onChange(this.pickerSrv.curRangeDate);
    }
  }

  writeValue(value: Date[]) {
    if (!value || !value.length) {
      this.clear();
      return;
    }

    this.dateValue = value.map((d) => {
      return d ? this.datepickerConvert.format(d, this.curFormat) : '';
    });
    this.pickerSrv.curRangeDate = value;
    this.pickerSrv.updateDateValue.next({
      type: 'range',
      value,
    });
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
