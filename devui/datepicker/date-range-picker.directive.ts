import { CdkOverlayOrigin, ConnectedOverlayPositionChange, VerticalConnectionPos } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import {
  DateConverter,
  DefaultDateConverter,
  DevConfigService,
  WithConfig,
  addClassToOrigin,
  fadeInOut,
  formWithDropDown,
  removeClassFromOrigin,
} from 'ng-devui/utils';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { DatePickerConfigService as DatePickerConfig } from './date-picker.config.service';
import { SelectDateRangeChangeEventArgs, SelectDateRangeChangeReason } from './date-range-change-event-args.model';
import { DateRangePickerComponent } from './date-range-picker.component';

@Component({
  /* eslint-disable-next-line @angular-eslint/component-selector*/
  selector: '[dDateRangePicker]',
  providers: [
    {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateRangePickerDirective),
      multi: true,
    },
  ],
  exportAs: 'dateRangePicker',
  templateUrl: './date-range-picker.directive.html',
  styleUrls: ['./date-range-picker.component.scss'],
  animations: [fadeInOut],
  preserveWhitespaces: false,
})
// tslint:disable-next-line: component-class-suffix
export class DateRangePickerDirective implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() locale: string;
  @Input() cssClass: string;
  @Input() disabled: boolean;
  @Input() dateConverter: DateConverter;
  @Input() hideOnRangeSelected = false;
  @Input() customViewTemplate: TemplateRef<any>;
  @Input() splitter = '  -  ';
  @Input() @WithConfig() showAnimation = true;
  @Output() selectedRangeChange = new EventEmitter<SelectDateRangeChangeEventArgs>();
  @ViewChild('dateRangePicker') dateRangePicker: ComponentRef<DateRangePickerComponent>;
  private _maxDate: Date;
  private _minDate: Date;
  _selectedRange = [null, null];
  private _isOpen = false;
  private _dateConfig: any;
  private _dateFormat: string;
  private _showTime: boolean;
  public cdkConnectedOverlayOrigin: any;
  public i18nLocale: I18nInterface['locale'];
  private i18nSubscription: Subscription;
  private valueChangeSubscrip: Subscription;
  datepickerPosition: VerticalConnectionPos = 'bottom';
  valueList = [];
  startAnimation = false;
  document: Document;
  private onChange = (_: any) => null;
  private onTouched = () => null;

  @Input() set maxDate(date: Date | any) {
    this._maxDate = date;
  }

  get maxDate() {
    if ((this.dateRangePicker as any)?.maxDate) {
      return (this.dateRangePicker as any).maxDate;
    } else {
      return this._maxDate;
    }
  }

  @Input() set minDate(date: Date | any) {
    this._minDate = date;
  }

  get minDate() {
    if ((this.dateRangePicker as any)?.minDate) {
      return (this.dateRangePicker as any).minDate;
    } else {
      return this._minDate;
    }
  }

  @Input() set selectedRange(range: Array<Date | null>) {
    if (Array.isArray(range) && range.every((_) => !!_ || _ === null)) {
      this._selectedRange = range;
    }
  }

  get selectedRange() {
    return this._selectedRange;
  }

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
    this._dateFormat = this.showTime ? this._dateConfig.format.time : this._dateConfig.format.date;
  }

  get dateConfig() {
    return this._dateConfig;
  }

  @Input() set dateFormat(dateFormat: string) {
    if (dateFormat && this._dateFormat !== dateFormat) {
      this._dateFormat = dateFormat;
    }
  }

  get dateFormat() {
    return this._dateFormat || this.datePickerConfig.defaultFormat;
  }

  set rangeStart(rangeStart: Date) {
    if (this.dateRangePicker) {
      (this.dateRangePicker as any).rangeStart = rangeStart;
    }
  }

  get rangeEnd() {
    if (this.dateRangePicker) {
      return (this.dateRangePicker as any).rangeEnd;
    }
  }

  set isOpen(isOpen: boolean) {
    if (this._isOpen !== isOpen) {
      this._isOpen = isOpen;
      if (!isOpen && !this.rangeEnd) {
        this.rangeStart = null;
      }
      if (!isOpen) {
        this.startAnimation = false;
        removeClassFromOrigin(this.elementRef);
        this.document.removeEventListener('click', this.onDocumentClick);
      } else {
        setTimeout(() => {
          addClassToOrigin(this.elementRef);
          this.document.addEventListener('click', this.onDocumentClick);
          this.startAnimation = true;
          this.cdr.detectChanges();
        });
      }
    }
  }

  get isOpen() {
    return this._isOpen;
  }
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private datePickerConfig: DatePickerConfig,
    private i18n: I18nService,
    private cdr: ChangeDetectorRef,
    private devConfigService: DevConfigService,
    @Inject(DOCUMENT) private doc: any
  ) {
    this._dateConfig = datePickerConfig.dateConfig;
    this.dateConverter = datePickerConfig.dateConfig.dateConverter || new DefaultDateConverter();
    this._minDate = this.minDate ? new Date(this.minDate) : new Date(this.dateConfig.min, 0, 1, 0, 0, 0);
    this._maxDate = this.maxDate ? new Date(this.maxDate) : new Date(this.dateConfig.max, 11, 31, 23, 59, 59);
    this.setI18nText();
    this.document = this.doc;
  }

  @HostListener('blur', ['$event'])
  onBlur($event) {
    this.onTouched();
    if (!this.validateDate(this.elementRef.nativeElement.value)) {
      this.resetValue();
    }
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

  ngOnInit() {
    this.updateCdkConnectedOverlayOrigin();
    this.initInputChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  initInputChanges(): void {
    this.valueChangeSubscrip = fromEvent(this.elementRef.nativeElement, 'keyup')
      .pipe(
      map((e: any) => e.target.value),
      filter(() => !this.disabled),
      debounceTime(300)
      )
      .subscribe((value) => {
      this.transUserInputToDatepicker(value);
    });
  }

  writeValue(selectedRange): void {
    this._selectedRange = selectedRange;
    if (selectedRange) {
      this.writeModelValue(selectedRange);
    }
  }

  setI18nText() {
    this.i18nLocale = this.i18n.getI18nText().locale;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nLocale = data.locale;
    });
  }

  chooseDate = (range, reason?, hide = true) => {
    if ((this.dateRangePicker as any)?.chooseDate) {
      (this.dateRangePicker as any).chooseDate(range, reason);
    } else {
      this._selectedRange = [...range];
      this.notifyValueChange({
        reason: reason,
        selectedRange: [...range],
      });
    }
    if (!this.showTime && this.hideOnRangeSelected && hide) {
      this.hide();
    }
  };

  updateCdkConnectedOverlayOrigin() {
    if (this.elementRef.nativeElement) {
      this.cdkConnectedOverlayOrigin = new CdkOverlayOrigin(formWithDropDown(this.elementRef) || this.elementRef.nativeElement);
    }
  }

  toggle(clickShow?: boolean) {
    if (clickShow === undefined) {
      this.isOpen = !this.isOpen;
    } else {
      this.isOpen = clickShow;
    }
  }

  public hide(event?) {
    if (event !== false) {
      this.isOpen = false;
    }
  }

  private writeModelValue(input) {
    if (Array.isArray(input) && input.every((_) => !!_)) {
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.formatDateRange(input));
    } else {
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', '');
    }
  }

  private formatDateRange(arr) {
    return arr
      .map((date, i) => {
        return date ? this.dateConverter.format(date, this.dateFormat, this.locale || this.i18nLocale) : ['Start', 'End'][i];
      })
      .join(this.splitter);
  }

  onDocumentClick = ($event) => {
    let templateWrap;
    if ((this.dateRangePicker as any)?.templateWrap) {
      templateWrap = (this.dateRangePicker as any).templateWrap;
    }
    if (templateWrap && templateWrap.nativeElement.contains($event.target) && !this.hideOnRangeSelected) {
      this.isOpen = true;
    } else if (this.elementRef.nativeElement !== $event.target) {
      this.isOpen = false;
    }
    this.cdr.markForCheck();
  };

  onPositionChange(position: ConnectedOverlayPositionChange) {
    switch (position.connectionPair.overlayY) {
    case 'top':
    case 'center':
      this.datepickerPosition = 'bottom';
      break;
    case 'bottom':
      this.datepickerPosition = 'top';
      break;
    default:
    }
  }

  notifyValueChange(dateObj) {
    this.writeValue(dateObj.selectedRange);
    this.onChange(dateObj.selectedRange);
    this.onTouched();
    this.selectedRangeChange.emit({
      reason: dateObj.reason,
      selectedRange: dateObj.selectedRange,
    });
    if (!this.showTime && this.hideOnRangeSelected) {
      this.hide();
    }
  }

  private transUserInputToDatepicker(value?: string) {
    if (!this.showTime && !this.disabled) {
      const _value: string = value || this.elementRef.nativeElement.value;
      if (!_value && !this.selectedRange.every((val) => !!val)) {
        this.clearAll(undefined, false);
        return;
      }
      if (!_value) {
        this.clearAll(undefined, false);
        return;
      }
      if (this.validateDate(_value)) {
        this.chooseDate(this.valueList, undefined, false);
      }
    } else {
      this.resetValue();
    }
  }

  resetValue(): void {
    this.writeValue(this.selectedRange);
  }

  validateDate(value: string): boolean {
    if (!value) {
      return true;
    }
    this.valueList = value.split(this.splitter);
    let valueFormat;
    // 如果拆出来6个，则为日期间分隔符和年月日间分隔符相同的情况，此情况允许
    if (this.valueList.length === 6 && this.valueList.every((val) => !!val)) {
      const curValueList = [];
      this.valueList.forEach((val, index) => {
        // 根据下标，前三个组装在一起，后三个组装在一起，不需要考虑分隔符，后面会format
        if ((index + 1) % 3 === 1) {
          curValueList.push(val);
        } else {
          curValueList[Math.ceil(index / 3) - 1] = curValueList[Math.ceil(index / 3) - 1] + '-' + val;
        }
      });
      this.valueList = curValueList;
    }
    // 不管拆出来是6还是2个，都需要组装成2个日期
    if (
      this.valueList.length === 2 &&
      this.valueList.every((val) => !!val) &&
      this.valueList.every((val, index) => new Date(val).getTime() === new Date(this.selectedRange[index]).getTime())
    ) {
      this.valueList = this.valueList.map((t) => new Date(t));
      return true;
    }
    if (!this.valueList.every((val) => new Date(val).getTime())) {
      return false;
    }
    if (this.valueList.length === 2 && this.valueList.every((val) => !!val)) {
      const valueTimeList = this.valueList.map((val) => new Date(`${val} 00:00:00`).getTime());
      valueFormat = this.formatDateRange(this.valueList.map((numValue) => new Date(numValue)));
      if (
        value === valueFormat &&
        !valueTimeList.every((val) => {
          return val >= this.minDate.getTime() && val <= this.maxDate.getTime();
        })
      ) {
        return false;
      } else {
        // 判断前后俩日期是否大于最小，小于最大，若是则合法，进行如下操作
        // 此时包括value为NaN既日期格式不正确的情况，对其进行处理下方判断会过滤掉
        this.valueList = this.valueList
          .map((val) => new Date(val).getTime())
          .sort((a, b) => a - b)
          .map((numValue) => new Date(numValue));
      }
      if (valueFormat && value === valueFormat) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.hide();
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
    if (this.valueChangeSubscrip) {
      this.valueChangeSubscrip.unsubscribe();
    }
    this.document.removeEventListener('click', this.onDocumentClick);
  }

  clearAll = (reason?: SelectDateRangeChangeReason, hide?: boolean) => {
    const currentReason = typeof reason === 'number' ? reason : SelectDateRangeChangeReason.custom;
    this.chooseDate([null, null], currentReason, hide);
  };

}
