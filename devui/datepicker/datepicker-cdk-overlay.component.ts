import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  Component,
  forwardRef,
  OnInit,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  ElementRef,
  ViewContainerRef,
  Renderer2,
  HostListener,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { CdkOverlayOrigin, ConnectedPosition, ConnectedOverlayPositionChange, VerticalConnectionPos } from '@angular/cdk/overlay';

import { AppendToBodyDirection, AppendToBodyDirectionsConfig } from 'ng-devui/utils';
import { DateConverter } from 'ng-devui/utils';
import { SelectDateChangeEventArgs, SelectDateChangeReason } from './date-change-event-args.model';
import { DatePickerConfigService as DatePickerConfig } from './date-picker.config.service';
import { I18nService, I18nInterface } from 'ng-devui/i18n';
import { DefaultDateConverter } from 'ng-devui/utils';
import { cornerFadeInOut } from 'ng-devui/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: '[dDatepicker][appendToBody]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerAppendToBodyComponent),
    multi: true
  }],
  exportAs: 'datepicker',
  template: `
    <ng-template cdk-connected-overlay
                 [cdkConnectedOverlayOrigin]="cdkConnectedOverlayOrigin"
                 [cdkConnectedOverlayPositions]="positions"
                 [cdkConnectedOverlayOpen]="isOpen"
                 (backdropClick)="isOpen=false"
                 (positionChange)="onPositionChange($event)">
      <d-datepicker [@cornerFadeInOut]="isOpen ? datepickerPosition : 'void'" [locale]="locale || i18nLocale"
                      [showTime]="showTime" [cssClass]="cssClass" [selectedDate]="selectedDate"
                      [disabled]="disabled" [dateConverter]="dateConverter" (selectedDateChange)="timeChange($event)"
                      [dateFormat]="dateFormat" [dateConfig]="dateConfig"
                      [customViewTemplate]="customViewTemplate" [maxDate]="maxDate" (cmpClicking)="cmpClicking($event)"
                      [minDate]="minDate" class="devui-datepicker devui-dropdown-overlay"></d-datepicker>
    </ng-template>
  `,
  animations: [
    cornerFadeInOut
  ],
  styleUrls: ['./datepicker-cdk-overlay.component.scss'],
  preserveWhitespaces: false,
})
export class DatePickerAppendToBodyComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  @Input() appendToBodyDirections: Array<AppendToBodyDirection | ConnectedPosition> = [
    'rightDown', 'leftDown', 'rightUp', 'leftUp'
  ];
  @Input() locale: string;
  @Input() cssClass: string;
  @Input() disabled: boolean;
  @Input() dateConverter: DateConverter;
  // @Input() yearNumber = 12;
  @Input() customViewTemplate: TemplateRef<any>;
  @Input() autoOpen = false;
  @Output() selectedDateChange = new EventEmitter<SelectDateChangeEventArgs>();
  selectedDate: Date;
  _isOpen = false;
  _dateConfig: any;
  positions: ConnectedPosition[];
  datepickerPosition: VerticalConnectionPos = 'bottom';
  isClickingCmp = false;
  private _dateFormat: string;
  private _maxDate: Date;
  private _minDate: Date;
  private _showTime: boolean;
  private clickShow = false;
  private i18nSubscription: Subscription;
  public i18nLocale: I18nInterface['locale'];

  public cdkConnectedOverlayOrigin: any;

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
    this._dateFormat = this.showTime ? this._dateConfig.format.time : this._dateConfig.format.date;
  }

  get dateConfig() {
    return this._dateConfig;
  }

  @Input() set dateFormat(dateFormat: string) {
    if (dateFormat && this._dateFormat !== dateFormat) {
      this._dateFormat = dateFormat;
      this.writeModelValue({selectedDate: this.selectedDate, reason: SelectDateChangeReason.format});
    }
  }

  get dateFormat() {
    return this._dateFormat;
  }

  @Input() set maxDate(date: Date | any) {
    const parseDate = this.dateConverter.parse(date, this.dateFormat, this.locale || this.i18nLocale);
    if (parseDate) {
      this._maxDate = parseDate;
    }
  }
  get maxDate() {
    return this._maxDate;
  }

  @Input() set minDate(date: Date | any) {
    const parseDate = this.dateConverter.parse(date, this.dateFormat, this.locale || this.i18nLocale);
    if (parseDate) {
      this._minDate = parseDate;
    }
  }
  get minDate() {
    return this._minDate;
  }

  set isOpen(open: boolean) {
    this._isOpen = open;
    if (!open) {
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
    }
  }

  get isOpen() {
    return this._isOpen;
  }

  constructor(private elementRef: ElementRef, private viewContainerRef: ViewContainerRef,
              private renderer2: Renderer2, private datePickerConfig: DatePickerConfig, private i18n: I18nService) {
    this._dateConfig = datePickerConfig['dateConfig'];
    this.dateConverter = datePickerConfig['dateConfig'].dateConverter || new DefaultDateConverter();
  }

  checkDateConfig(dateConfig: any) {
    if (!dateConfig) { return false; }
    if (typeof(dateConfig.timePicker) !== 'boolean' || !dateConfig.max || !dateConfig.min || !dateConfig.format) {
      return false;
    }
    return true;
  }

  ngOnInit() {
    this._minDate = this.minDate ? new Date(this.minDate) : new Date(this.dateConfig.min, 0, 1, 0, 0, 0);
    this._maxDate = this.maxDate ? new Date(this.maxDate) : new Date(this.dateConfig.max, 11, 31, 23, 59, 59);
    this.setPositions();
    this.setI18nText();
    this.updateCdkConnectedOverlayOrigin();
    if (this.autoOpen) {
      this.isOpen = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appendToBodyDirections']) {
      this.setPositions();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.selectedDate = obj ?
      this.dateConverter.parse(obj, this.dateFormat, this.locale || this.i18nLocale) : null;
    const value =
      this.selectedDate ? this.dateConverter.format(this.selectedDate, this.dateFormat, this.locale || this.i18nLocale) : '';
    this.renderer2.setProperty(this.elementRef.nativeElement, 'value', value);
  }

  setI18nText() {
    this.i18nLocale = this.i18n.getI18nText().locale;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nLocale = data.locale;
    });
  }

  timeChange(dateObj) {
    this.writeValue(dateObj ? dateObj['selectedDate'] : null);
    this.writeModelValue(dateObj);
    if (dateObj && (dateObj['reason'] === SelectDateChangeReason.date && !this.showTime ||
    dateObj['reason'] === SelectDateChangeReason.button)) {
      this.isOpen = false;
    }
  }

  updateCdkConnectedOverlayOrigin() {
    if (this.elementRef.nativeElement) {
      this.cdkConnectedOverlayOrigin = new CdkOverlayOrigin(this.elementRef.nativeElement);
    }
  }

  toggle($event: Event, clickShow?: boolean) {
    this.isOpen = !this.isOpen;
    this.clickShow = clickShow;
  }

  hide() {
    this.isOpen = false;
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

  private writeModelValue(selectDateObj: any) {
    let selectDate;
    let dateReason = SelectDateChangeReason.time;
    if (selectDateObj && typeof selectDateObj === 'object' && selectDateObj.hasOwnProperty('selectedDate')) {
      selectDate = selectDateObj.selectedDate;
      dateReason = selectDateObj.reason;
    } else {
      selectDate = selectDateObj;
    }
    if (selectDate) {
      selectDate = new Date(selectDate);
    } else {
      selectDate = null;
    }
    this.onChange(selectDate); // 这行代码能触发ngModel绑定的变量值发生变化
    this.onTouched();
    this.selectedDateChange.emit({
      reason: dateReason,
      selectedDate: this.selectedDate
    });
  }

  @HostListener('blur', ['$event'])
  onBlur($event) {
    if (!this.isClickingCmp) {
      this.transUserInputToDatepicker();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick($event) {
    if (this.elementRef.nativeElement !== $event.target && !this.clickShow) {
      this.isOpen = false;
    } else {
      this.clickShow = false;
    }
  }

  cmpClicking(isClickingCmp) {
    this.isClickingCmp = isClickingCmp;
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

  setPositions() {
    if (this.appendToBodyDirections && this.appendToBodyDirections.length > 0) {
      this.positions = this.appendToBodyDirections.map(position => {
        if (typeof position === 'string') {
          return AppendToBodyDirectionsConfig[position];
        } else {
          return position;
        }
      }).filter(position => position !== undefined);
    } else {
      this.positions = undefined;
    }
  }

  private transUserInputToDatepicker() {
    const value = this.elementRef.nativeElement.value;
    if (!value && !this.selectedDate) {
      return;
    }
    if (!value) {
      this.clearAll();
      return;
    }
    const valueDate = new Date(value);
    const valueFormat = valueDate instanceof Date && !isNaN(valueDate.getTime()) &&
      this.dateConverter.format(valueDate, this.dateFormat, this.locale || this.i18nLocale);
    if (new Date(valueFormat).getTime() === new Date(this.selectedDate).getTime()) {
      return;
    }
    if (
      this.showTime || this.disabled || !valueDate || value !== valueFormat ||
      (value === valueFormat && (valueDate.getTime() < this.minDate.getTime() || valueDate.getTime() > this.maxDate.getTime()))
    ) {
      if (this.selectedDate) {
        this.writeValue(this.selectedDate);
      } else {
        this.elementRef.nativeElement.value = '';
      }
    } else {
      this.selectedDate = valueDate;
      this.writeModelValue({
        reason: SelectDateChangeReason.custom,
        selectedDate: valueDate
      });
    }
  }

  clearAll = (reason?: SelectDateChangeReason) => {
    if (this.disabled) {
      return;
    }
    this.writeValue(null);
    this.onChange(null);
    this.onTouched();
    const currentReason = typeof reason === 'number' ? reason : SelectDateChangeReason.custom;
    this.selectedDateChange.emit({
      reason: currentReason,
      selectedDate: null
    });
  }

  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }
}
