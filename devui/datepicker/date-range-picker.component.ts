import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { DateConverter, DefaultDateConverter } from 'ng-devui/utils';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { DatePickerConfigService as DatePickerConfig } from './date-picker.config.service';
import { SelectDateRangeChangeEventArgs, SelectDateRangeChangeReason } from './date-range-change-event-args.model';

@Component({
  selector: 'd-date-range-picker',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangePickerComponent),
      multi: true,
    },
  ],
  exportAs: 'dateRangePicker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  preserveWhitespaces: false,
})
export class DateRangePickerComponent implements OnChanges, OnInit, ControlValueAccessor, OnDestroy {
  @Input() locale: string;
  @Input() cssClass: string;
  @Input() disabled: boolean;
  @Input() dateConverter: DateConverter;
  @Input() selectedRange = [null, null];
  @Input() dateFormat: string;
  @Input() customViewTemplate: TemplateRef<any>;
  @Output() selectedRangeChange = new EventEmitter<SelectDateRangeChangeEventArgs>();
  @Output() hide = new EventEmitter<boolean>();
  @ViewChild('leftPicker') leftPicker: ElementRef;
  @ViewChild('rightPicker') rightPicker: ElementRef;
  @ViewChild('templateWrap') templateWrap: ElementRef;
  private _dateConfig: any;
  private _maxDate: Date;
  private _minDate: Date;
  private _showTime: boolean;
  public currentCalendars = [null, null];
  public i18nLocale: I18nInterface['locale'];
  public i18nText: I18nInterface['datePicker'];
  private i18nSubscription: Subscription;
  hoverOnDate: Subject<object> = new Subject<object>();
  rangeStart;
  rangeEnd;
  private onChange = (_: any) => null;
  private onTouched = () => null;

  @Input() set showTime(showTime: boolean) {
    this._showTime = showTime;
  }

  get showTime() {
    return typeof this._showTime === 'boolean' ? this._showTime : this.dateConfig.timePicker;
  }

  @Input() set dateConfig(dateConfig: any) {
    if (this.checkDateConfig(dateConfig)) {
      this._dateConfig = dateConfig;
    } else {
      this._dateConfig = this.datePickerConfig.dateConfig;
    }
  }

  get dateConfig() {
    return this._dateConfig;
  }

  @Input() set maxDate(date: Date | any) {
    const parseDate = this.dateConverter.parse(date, this.dateFormat) || null;
    if (parseDate) {
      this._maxDate = parseDate;
    }
  }

  get maxDate() {
    return this._maxDate;
  }

  @Input() set minDate(date: Date | any) {
    const parseDate = this.dateConverter.parse(date, this.dateFormat) || null;
    if (parseDate) {
      this._minDate = parseDate;
    }
  }

  get minDate() {
    return this._minDate;
  }

  constructor(private datePickerConfig: DatePickerConfig, private i18n: I18nService) {
    this._dateConfig = datePickerConfig.dateConfig;
    this.dateConverter = datePickerConfig.dateConfig.dateConverter || new DefaultDateConverter();
    this.setI18nText();
  }

  checkDateConfig(dateConfig: any) {
    if (!dateConfig) {
      return false;
    }
    if (typeof dateConfig.timePicker !== 'boolean' || !dateConfig.max || !dateConfig.min || !dateConfig.format) {
      return false;
    }
    return true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.selectedRange?.currentValue) {
      this.writeValue(this.selectedRange);
    }
  }

  ngOnInit() {
    this._minDate = this.minDate ? new Date(this.minDate) : new Date(this.dateConfig.min, 0, 1, 0, 0, 0);
    this._maxDate = this.maxDate ? new Date(this.maxDate) : new Date(this.dateConfig.max, 11, 31, 23, 59, 59);
    this.subscribeHoverActions();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(selectedRange): void {
    if (selectedRange) {
      this.selectedRange = selectedRange;
      if (this.leftPicker) {
        (this.leftPicker as any).selectedRange = selectedRange;
      }
      if (this.rightPicker) {
        (this.rightPicker as any).selectedRange = selectedRange;
      }
      [this.rangeStart, this.rangeEnd] = this.selectedRange;
    }
  }

  setI18nText() {
    this.i18nLocale = this.i18n.getI18nText().locale;
    this.i18nText = this.i18n.getI18nText().datePicker;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nLocale = data.locale;
      this.i18nText = data.datePicker;
    });
  }

  rangeChange(data) {
    this.chooseDate(data.selectedRange, data.reason);
  }

  chooseDate = (range, reason?) => {
    const currentReason = typeof reason === 'number' ? reason : SelectDateRangeChangeReason.custom;
    this.writeValue(range);
    this.notifyValueChange(range, currentReason);
  };

  selectingDate(event) {
    this.hoverOnDate.next(event);
  }

  subscribeHoverActions() {
    this.hoverOnDate.pipe(distinctUntilChanged()).subscribe((date) => {
      this.previewRangeEnd(date);
    });
  }

  previewRangeEnd(date) {
    (this.leftPicker as any).previewEnd = date;
    (this.rightPicker as any).previewEnd = date;
  }

  syncRangeStart(rangeStart, picker: any) {
    picker.selectRange(rangeStart, true);
  }

  syncPickerPair(currentCalender: object, orientation: string) {
    switch (orientation) {
    case 'left':
      this.currentCalendars[0] = currentCalender;
      break;
    case 'right':
      this.currentCalendars[1] = currentCalender;
      break;
    default:
    }
  }

  notifyValueChange(range, reason) {
    this.onChange(range);
    this.onTouched();
    this.selectedRangeChange.emit({
      reason,
      selectedRange: range,
    });
  }

  consolidateTime() {
    const rangeStart = this.rangeStart;
    const rangeEnd = this.rangeEnd;
    const rangeStartTime = (this.leftPicker as any).currentTime;
    const rangeEndTime = (this.rightPicker as any).currentTime;
    this.rangeStart = new Date(
      rangeStart.getFullYear(),
      rangeStart.getMonth(),
      rangeStart.getDate(),
      rangeStartTime.hour,
      rangeStartTime.minute,
      rangeStartTime.second
    );
    this.rangeEnd = new Date(
      rangeEnd.getFullYear(),
      rangeEnd.getMonth(),
      rangeEnd.getDate(),
      rangeEndTime.hour,
      rangeEndTime.minute,
      rangeEndTime.second
    );
    const newRange = [this.rangeStart, this.rangeEnd];
    this.onTouched();
    this.writeValue(newRange);
    this.notifyValueChange(newRange, SelectDateRangeChangeReason.button);
    this.hide.emit(true);
  }

  ngOnDestroy(): void {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }

  clearAll = (reason?: SelectDateRangeChangeReason) => {
    const currentReason = typeof reason === 'number' ? reason : SelectDateRangeChangeReason.custom;
    this.chooseDate([null, null], currentReason);
  };
}
