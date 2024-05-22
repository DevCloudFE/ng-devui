import {
  AfterViewInit,
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
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EN_US, I18nFormat, I18nInterface, I18nService } from 'ng-devui/i18n';
import { DefaultDateConverter, DevConfigService, WithConfig } from 'ng-devui/utils';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { DatepickerProService } from './datepicker-pro.service';
import { DateConfig } from './lib/datepicker-pro.type';

@Component({
  selector: 'd-datepicker-pro',
  templateUrl: './datepicker-pro.component.html',
  styleUrls: ['./datepicker-pro.component.scss'],
  providers: [
    DatepickerProService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerProComponent),
      multi: true
    }
  ],
  preserveWhitespaces: false,
})
export class DatepickerProComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input() mode: 'year' | 'month' | 'date' = 'date';
  @Input() showTime = false;
  @Input() disabled = false;
  @Input() autoOpen = false;
  @Input() format: string;
  @Input() cssClass: string;
  @Input() showAnimation = true;
  @Input() appendToBody = true;
  @Input() width: string;
  @Input() placeholder: string;
  @Input() allowClear = true;
  @Output() dropdownToggle = new EventEmitter<boolean>();
  @Output() confirmEvent = new EventEmitter<Date>();
  @Input() @WithConfig() showGlowStyle = true;
  @HostBinding('class.devui-glow-style') get hasGlowStyle () {
    return this.showGlowStyle;
  };
  @Input() set calenderRange (value) {
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
  };
  @Input() set markedDateList(value: Date[]) {
    this.pickerSrv.markedDateList = value;
  }
  @ContentChild('customTemplate') customTemplate: TemplateRef<any>;
  @ContentChild('footerTemplate') footerTemplate: TemplateRef<any>;
  @ContentChild('hostTemplate') hostTemplate: TemplateRef<any>;
  @ContentChild('markDateInfoTemplate') set markDateInfoTemplate(tmp: TemplateRef<any>) {
    this.pickerSrv.markDateInfoTemplate = tmp;
  };
  @ViewChild('dateInput') datepickerInput: ElementRef;

  private i18nLocale: I18nInterface['locale'];

  i18nText;
  i18nFormat;
  dateValue = '';
  datepickerConvert: DefaultDateConverter;
  unsubscribe$ = new Subject<void>();
  isOpen = false;

  get dateConfig(): DateConfig {
    return {
      dateConverter: this.datepickerConvert,
      min: this.pickerSrv.minDate || new Date(this.pickerSrv.calendarRange[0] + '-01-01'),
      max: this.pickerSrv.maxDate || new Date(this.pickerSrv.calendarRange[1] + '-12-31'),
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

  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor(private i18n: I18nService, private pickerSrv: DatepickerProService, private devConfigService: DevConfigService) {
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
    this.pickerSrv.isRange = false;
  }

  private initObservable() {
    this.pickerSrv.selectedDateChange.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(change => {
      this.dateValue = this.formatDateToString(change.value as Date);
      this.pickerSrv.curDate = change.value as Date;
      this.onChange(change.value);
    });

    this.pickerSrv.selectedTimeChange.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(time => {
      if (this.dateValue) {
        const curTime = this.datepickerConvert.parse(this.dateValue, this.curFormat).setHours(time.hour, time.min, time.seconds);
        const curDate = new Date(curTime);
        this.pickerSrv.curDate = curDate;
        this.dateValue = this.formatDateToString(curDate);
        this.onChange(curDate);
      } else {
        this.writeValue(new Date(new Date().setHours(time.hour, time.min, time.seconds)));
        this.onChange(this.pickerSrv.curDate);
      }
    });

    this.pickerSrv.closeDropdownEvent.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(isConfirm => {
      this.isOpen = false;
      this.dropdownToggle.emit(false);
      if (isConfirm) {
        this.confirmEvent.emit(this.pickerSrv.curDate);
      }
    });

    if (!this.hostTemplate) {
      fromEvent(this.datepickerInput.nativeElement, 'input').pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(300)
      ).subscribe((event: InputEvent) => {
        if (!this.dateValue) {
          return;
        }

        const inputDate = this.datepickerConvert.parse(this.dateValue, this.curFormat);
        if (inputDate instanceof Date && inputDate.getTime() === this.pickerSrv.curDate?.getTime()) {
          return;
        }

        if (this.validateDate(this.dateValue)) {
          this.pickerSrv.curDate = inputDate;
          this.pickerSrv.updateDateValue.next({
            type: 'single',
            value: inputDate
          });

          this.onChange(inputDate);

          if (this.showTime) {
            this.pickerSrv.updateTimeChange.next({
              hour: inputDate.getHours(),
              min: inputDate.getMinutes(),
              seconds: inputDate.getSeconds()
            });
          }
        }
      });

      fromEvent(this.datepickerInput.nativeElement, 'blur').pipe(
        takeUntil(this.unsubscribe$),
      ).subscribe(() => {
        if (!this.validateDate(this.dateValue)) {
          this.dateValue = this.pickerSrv.curDate ?
            this.datepickerConvert.format(this.pickerSrv.curDate, this.curFormat, this.i18nLocale) :
            '';
        }
      });
    }
  }

  private setI18nText() {
    this.setI18nTextDetail(this.i18n.getI18nText());
    this.i18n
      .langChange()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.setI18nTextDetail(data);
        if (this.pickerSrv.curDate) {
          this.dateValue = this.formatDateToString(this.pickerSrv.curDate);
        }
      });
  }

  private setI18nTextDetail(data) {
    this.i18nText = data.datePickerPro;
    this.i18nLocale = data.locale;
    this.i18nFormat = I18nFormat.localFormat[this.i18nLocale];
  }

  validateDate(value: string) {
    const valueDate = this.datepickerConvert.parse(value, this.curFormat);
    const valueFormat = valueDate && !isNaN(valueDate.getTime()) &&
      this.datepickerConvert.format(valueDate, this.curFormat, this.i18nLocale);
    if (
      !valueDate || value !== valueFormat ||
      (value === valueFormat && !this.pickerSrv.dateInRange(valueDate))
    ) {
      return false;
    } else {
      return true;
    }
  }

  formatDateToString(date: Date): string {
    return this.datepickerConvert.format(date, this.curFormat);
  }

  clear(event?: MouseEvent, isHandle?: boolean) {
    if (event) {
      event.stopPropagation();
    }

    if (this.disabled && isHandle) {
      return;
    }
    this.pickerSrv.updateDateValue.next({
      type: 'single',
      value: null
    });

    this.pickerSrv.updateTimeChange.next({
      hour: null,
      min: null,
      seconds: null
    });
    this.dateValue = null;
    this.pickerSrv.curDate = null;

    if (event) {
      this.onChange(this.pickerSrv.curDate);
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

    setTimeout(() => {
      if (this.datepickerInput?.nativeElement) { this.datepickerInput.nativeElement.focus(); }
    });
  }

  writeValue(value: Date) {
    if (!value) {
      this.clear();
      return;
    }
    this.dateValue = this.formatDateToString(value);
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
