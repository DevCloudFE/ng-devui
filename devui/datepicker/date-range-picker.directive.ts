import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  Component,
  forwardRef,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  Renderer2,
  HostListener,
  ViewChild,
  OnDestroy,
  TemplateRef,
  ChangeDetectorRef,
  ComponentRef
} from '@angular/core';
import { DateConverter } from 'ng-devui/utils';
import { CdkOverlayOrigin, ConnectedOverlayPositionChange, VerticalConnectionPos } from '@angular/cdk/overlay';
import { SelectDateRangeChangeEventArgs, SelectDateRangeChangeReason } from './date-range-change-event-args.model';
import { DatePickerConfigService as DatePickerConfig } from './date-picker.config.service';
import { I18nService, I18nInterface } from 'ng-devui/i18n';
import { DefaultDateConverter, cornerFadeInOut } from 'ng-devui/utils';
import { Subscription } from 'rxjs';
import { DateRangePickerComponent } from './date-range-picker.component';

@Component({
  selector: '[dDateRangePicker]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateRangePickerDirective),
    multi: true
  }],
  exportAs: 'dateRangePicker',
  templateUrl: './date-range-picker.directive.html',
  styleUrls: ['./date-range-picker.component.scss'],
  animations: [
    cornerFadeInOut
  ],
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
  datepickerPosition: VerticalConnectionPos = 'bottom';
  private onChange = (_: any) => null;
  private onTouched = () => null;

  @Input() set maxDate(date: Date | any) {
    this._maxDate = date;
  }

  get maxDate() {
    if (this.dateRangePicker && this.dateRangePicker['maxDate']) {
      return this.dateRangePicker['maxDate'];
    } else {
      return this._maxDate;
    }
  }

  @Input() set minDate(date: Date | any) {
    this._minDate = date;
  }

  get minDate() {
    if (this.dateRangePicker && this.dateRangePicker['minDate']) {
      return this.dateRangePicker['minDate'];
    } else {
      return this._minDate;
    }
  }

  @Input() set selectedRange(range: Array<Date | null>) {
    if (Array.isArray(range) && range.every(_ => (!!_ || _ === null))) {
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
    return this._dateFormat;
  }

  set rangeStart(rangeStart: Date) {
    if (this.dateRangePicker) {
      this.dateRangePicker['rangeStart'] = rangeStart;
    }
  }

  get rangeEnd() {
    if (this.dateRangePicker) {
      return this.dateRangePicker['rangeEnd'];
    }
  }

  set isOpen(isOpen: boolean) {
    if (this._isOpen !== isOpen) {
      this._isOpen = isOpen;
      if (!isOpen && !this.rangeEnd) {
        this.rangeStart = null;
      }
      if (!isOpen) {
        document.removeEventListener('click', this.onDocumentClick);
        const ele = this.formWithDropDown();
        if (ele && ele.classList.contains('devui-dropdown-origin-open')) {
          ele.classList.remove('devui-dropdown-origin-open');
        }
        if (ele && ele.classList.contains('devui-dropdown-origin-top')) {
          ele.classList.remove('devui-dropdown-origin-top');
        }
        if (ele && ele.classList.contains('devui-dropdown-origin-bottom')) {
          ele.classList.remove('devui-dropdown-origin-bottom');
        }
      } else {
        setTimeout(() => {
          document.addEventListener('click', this.onDocumentClick);
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
    private cdr: ChangeDetectorRef
  ) {
    this._dateConfig = datePickerConfig['dateConfig'];
    this.dateConverter = datePickerConfig['dateConfig'].dateConverter || new DefaultDateConverter();
    this._minDate = this.minDate ? new Date(this.minDate) : new Date(this.dateConfig.min, 0, 1, 0, 0, 0);
    this._maxDate = this.maxDate ? new Date(this.maxDate) : new Date(this.dateConfig.max, 11, 31, 23, 59, 59);
    this.setI18nText();
  }

  checkDateConfig(dateConfig: any) {
    if (!dateConfig) { return false; }
    if (typeof(dateConfig.timePicker) !== 'boolean' || !dateConfig.max || !dateConfig.min || !dateConfig.format) {
      return false;
    }
    return true;
  }

  ngOnInit() {
    this.updateCdkConnectedOverlayOrigin();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
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
    if (this.dateRangePicker && this.dateRangePicker['chooseDate']) {
      this.dateRangePicker['chooseDate'](range, reason);
    } else {
      this._selectedRange = [...range];
      this.notifyValueChange({
        reason: reason,
        selectedRange: [...range]
      });
    }
    if (!this.showTime && this.hideOnRangeSelected && hide) { this.hide(); }
  }

  updateCdkConnectedOverlayOrigin() {
    if (this.elementRef.nativeElement) {
      this.cdkConnectedOverlayOrigin = new CdkOverlayOrigin(this.elementRef.nativeElement);
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

  formWithDropDown() {
    if (this.elementRef) {
      if (!this.elementRef.nativeElement.classList.contains('devui-dropdown-origin')) {
        const parentEle = this.elementRef.nativeElement.parentElement;
        if (parentEle && parentEle.classList.contains('devui-dropdown-origin')) {
          return this.elementRef.nativeElement.parentElement;
        } else {
          return;
        }
      } else {
        return this.elementRef.nativeElement;
      }
    }
  }

  private writeModelValue(input) {
    if (Array.isArray(input) && input.every(_ => !!_)) {
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.formatDateRange(input));
    } else {
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', '');
    }
  }

  private formatDateRange(arr) {
    return arr.map((date, i) => {
      return (date ?
        this.dateConverter.format(date, this.dateFormat, this.locale || this.i18nLocale) :
        ['Start', 'End'][i]);
    }).join(this.splitter);
  }

  @HostListener('blur', ['$event'])
  onBlur($event) {
    this.transUserInputToDatepicker();
  }

  onDocumentClick = ($event) => {
    let templateWrap;
    if (this.dateRangePicker && this.dateRangePicker['templateWrap']) {
      templateWrap = this.dateRangePicker['templateWrap'];
    }
    if (templateWrap && templateWrap.nativeElement.contains($event.target) && !this.hideOnRangeSelected) {
      this.isOpen = true;
    } else if (this.elementRef.nativeElement !== $event.target) {
      this.isOpen = false;
    }
    this.cdr.markForCheck();
  }

  onPositionChange(position: ConnectedOverlayPositionChange) {
    switch (position.connectionPair.overlayY) {
      case 'top':
      case 'center':
        this.datepickerPosition = 'bottom';
        break;
      case 'bottom':
        this.datepickerPosition = 'top';
    }
    this.changeFormWithDropDown(position.connectionPair.overlayY);
  }

  changeFormWithDropDown(position) {
    const ele = this.formWithDropDown();
    let formBorder;
    if (ele && !ele.classList.contains('devui-dropdown-origin-open')) {
      ele.classList.add('devui-dropdown-origin-open');
    }
    if (position === 'bottom') {
      formBorder = 'top';
    } else {
      formBorder = 'bottom';
    }
    if (ele && !ele.classList.contains(`devui-dropdown-origin-${formBorder}`)) {
      ele.classList.add(`devui-dropdown-origin-${formBorder}`);
      ele.classList.remove(`devui-dropdown-origin-${position}`);
    }
  }

  notifyValueChange(dateObj) {
    this.writeValue(dateObj.selectedRange);
    this.onChange(dateObj.selectedRange);
    this.onTouched();
    this.selectedRangeChange.emit({
      reason: dateObj.reason,
      selectedRange: dateObj.selectedRange
    });
    if (!this.showTime && this.hideOnRangeSelected) { this.hide(); }
  }

  private transUserInputToDatepicker() {
    if (!this.showTime && !this.disabled) {
      const value = this.elementRef.nativeElement.value;
      if (!value && !this.selectedRange.every(val => !!val)) {
        return;
      }
      if (!value) {
        this.clearAll(undefined, false);
        return;
      }
      let valueList = value.split(this.splitter);
      let valueFormat;
      // 如果拆出来6个，则为日期间分隔符和年月日间分隔符相同的情况，此情况允许
      if (valueList.length === 6 && valueList.every(val => !!val)) {
        const curValueList = [];
        valueList.forEach((val, index) => {
          // 根据下标，前三个组装在一起，后三个组装在一起，不需要考虑分隔符，后面会format
          if ((index + 1) % 3 === 1) {
            curValueList.push(val);
          } else {
            curValueList[Math.ceil(index / 3) - 1] = curValueList[Math.ceil(index / 3) - 1] + '-' + val;
          }
        });
        valueList = curValueList;
      }
      // 不管拆出来是6还是2个，都需要组装成2个日期
      if (
        valueList.length === 2 &&
        valueList.every(val => !!val) &&
        valueList.every((val, index) => new Date(val).getTime() === new Date(this.selectedRange[index]).getTime())
      ) {
        return;
      }
      if (valueList.length === 2 && valueList.every(val => !!val)) {
        const valueTimeList = valueList.map(val => (new Date(`${val} 00:00:00`)).getTime());
        valueFormat = this.formatDateRange(valueList.map(numValue => new Date(numValue)));
        if (
          value === valueFormat &&
          !valueTimeList.every((val) => {
            return (val >= this.minDate.getTime() && val <= this.maxDate.getTime());
          })
        ) {
          // 判断前后俩日期是否小于最小或大于最大，若是则不合法，恢复之前的
          this.writeValue(this.selectedRange);
          return;
        } else {
          // 判断前后俩日期是否大于最小，小于最大，若是则合法，进行如下操作
          // 此时包括value为NaN既日期格式不正确的情况，对其进行处理下方判断会过滤掉
          valueList = valueList.map(val => new Date(val).getTime()).sort((a, b) => a - b).map(numValue => new Date(numValue));
        }
        if (valueFormat && value === valueFormat) {
          this.chooseDate(valueList, undefined, false);
        }
      } else {
        this.writeValue(this.selectedRange);
      }
    } else {
      this.writeValue(this.selectedRange);
    }
  }

  ngOnDestroy(): void {
    this.hide();
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
    document.removeEventListener('click', this.onDocumentClick);
  }

  clearAll = (reason?: SelectDateRangeChangeReason, hide?: boolean) => {
    const currentReason = typeof reason === 'number' ? reason : SelectDateRangeChangeReason.custom;
    this.chooseDate([null, null], currentReason, hide);
  }

}
