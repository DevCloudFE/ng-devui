import { CdkOverlayOrigin, ConnectedOverlayPositionChange, ConnectedPosition, VerticalConnectionPos } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import {
  AppendToBodyDirection,
  AppendToBodyDirectionsConfig,
  DateConverter,
  DefaultDateConverter,
  addClassToOrigin,
  fadeInOut,
  formWithDropDown,
  removeClassFromOrigin,
} from 'ng-devui/utils';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { SelectDateChangeEventArgs, SelectDateChangeReason } from './date-change-event-args.model';
import { DatePickerConfigService as DatePickerConfig } from './date-picker.config.service';

@Component({
  /* eslint-disable-next-line @angular-eslint/component-selector*/
  selector: '[dDatepicker][appendToBody]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerAppendToBodyComponent),
      multi: true,
    },
  ],
  exportAs: 'datepicker',
  template: `
    <ng-template
      cdk-connected-overlay
      [cdkConnectedOverlayOrigin]="cdkConnectedOverlayOrigin"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayOpen]="isOpen"
      (backdropClick)="isOpen = false"
      (positionChange)="onPositionChange($event)"
    >
      <d-datepicker
        [@fadeInOut]="startAnimation ? datepickerPosition : 'void'"
        [locale]="locale || i18nLocale"
        [@.disabled]="!showAnimation"
        [showTime]="showTime"
        [cssClass]="cssClass"
        [selectedDate]="selectedDate"
        [disabled]="disabled"
        [dateConverter]="dateConverter"
        (selectedDateChange)="timeChange($event)"
        [dateConfig]="dateConfig"
        [customViewTemplate]="customViewTemplate"
        [maxDate]="maxDate"
        [minDate]="minDate"
        class="devui-datepicker"
      ></d-datepicker>
    </ng-template>
  `,
  animations: [fadeInOut],
  styleUrls: ['./datepicker-cdk-overlay.component.scss'],
  preserveWhitespaces: false,
})
export class DatePickerAppendToBodyComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  @Input() appendToBodyDirections: Array<AppendToBodyDirection | ConnectedPosition> = ['rightDown', 'leftDown', 'rightUp', 'leftUp'];
  @Input() locale: string;
  @Input() cssClass: string;
  @Input() disabled: boolean;
  @Input() dateConverter: DateConverter;
  @Input() customViewTemplate: TemplateRef<any>;
  @Input() autoOpen = false;
  @Input() showAnimation = false;
  @Output() selectedDateChange = new EventEmitter<SelectDateChangeEventArgs>();
  selectedDate: Date;
  _isOpen = false;
  _dateConfig: any;
  positions: ConnectedPosition[];
  datepickerPosition: VerticalConnectionPos = 'bottom';
  startAnimation = false;
  private _dateFormat: string;
  private _maxDate: Date;
  private _minDate: Date;
  private _showTime: boolean;
  private valueChanges: Observable<any>;
  private userInputSubscription: Subscription;
  private i18nSubscription: Subscription;
  public i18nLocale: I18nInterface['locale'];

  public cdkConnectedOverlayOrigin: any;
  document: Document;

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
      this.writeModelValue({ selectedDate: this.selectedDate, reason: SelectDateChangeReason.format });
    }
  }

  get dateFormat() {
    return this._dateFormat || this.datePickerConfig.defaultFormat;
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
    if (this._isOpen !== open) {
      this._isOpen = open;
      if (!open) {
        this.startAnimation = false;
        removeClassFromOrigin(this.elementRef);
        this.document.removeEventListener('click', this.onDocumentClick);
      } else {
        setTimeout(() => {
          this.startAnimation = true;
          this.cdr.detectChanges();
          addClassToOrigin(this.elementRef);
          this.document.addEventListener('click', this.onDocumentClick);
        });
      }
    }
  }

  get isOpen() {
    return this._isOpen;
  }

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private renderer2: Renderer2,
    private datePickerConfig: DatePickerConfig,
    private i18n: I18nService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: any
  ) {
    this._dateConfig = datePickerConfig.dateConfig;
    this.dateConverter = datePickerConfig.dateConfig.dateConverter || new DefaultDateConverter();
    this.setI18nText();
    this.document = this.doc;
  }

  @HostListener('blur', ['$event'])
  onBlur($event) {
    this.onTouched();
    const value = this.elementRef.nativeElement.value;
    if (!this.validateDate(value)) {
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
    this._minDate = this.minDate ? new Date(this.minDate) : new Date(this.dateConfig.min, 0, 1, 0, 0, 0);
    this._maxDate = this.maxDate ? new Date(this.maxDate) : new Date(this.dateConfig.max, 11, 31, 23, 59, 59);
    this.setPositions();
    this.updateCdkConnectedOverlayOrigin();
    if (this.autoOpen) {
      this.isOpen = true;
    }
    this.valueChanges = this.registerInputEvent();
    this.userInputSubscription = this.valueChanges.subscribe((source) => this.transUserInputToDatepicker(source));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.appendToBodyDirections) {
      this.setPositions();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  registerInputEvent() {
    return fromEvent(this.elementRef.nativeElement, 'keyup').pipe(
      map((e: any) => e.target.value),
      filter(() => !this.disabled),
      debounceTime(300)
    );
  }

  writeValue(obj: any): void {
    this.selectedDate = obj ? this.dateConverter.parse(obj, this.dateFormat, this.locale || this.i18nLocale) : null;
    const value = this.selectedDate ? this.dateConverter.format(this.selectedDate, this.dateFormat, this.locale || this.i18nLocale) : '';
    this.renderer2.setProperty(this.elementRef.nativeElement, 'value', value);
  }

  setI18nText() {
    this.i18nLocale = this.i18n.getI18nText().locale;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nLocale = data.locale;
    });
  }

  timeChange(dateObj) {
    this.writeValue(dateObj ? dateObj.selectedDate : null);
    this.writeModelValue(dateObj);
    if (
      dateObj &&
      ((dateObj.reason === SelectDateChangeReason.date && !this.showTime) || dateObj.reason === SelectDateChangeReason.button)
    ) {
      this.isOpen = false;
    }
  }

  updateCdkConnectedOverlayOrigin() {
    if (this.elementRef.nativeElement) {
      this.cdkConnectedOverlayOrigin = new CdkOverlayOrigin(formWithDropDown(this.elementRef) || this.elementRef.nativeElement);
    }
  }

  toggle(clickShow?: boolean) {
    if (clickShow === undefined) {
      if (this.isOpen) {
        this.hide();
      } else {
        this.show();
      }
    } else {
      if (clickShow) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  hide() {
    this.isOpen = false;
  }

  show() {
    this.isOpen = true;
  }

  private writeModelValue(selectDateObj: any) {
    let selectDate;
    let dateReason = SelectDateChangeReason.time;
    if (selectDateObj && typeof selectDateObj === 'object' && Object.prototype.hasOwnProperty.call(selectDateObj, 'selectedDate')) {
      selectDate = selectDateObj.selectedDate;
      dateReason = selectDateObj.reason;
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
      selectedDate: this.selectedDate,
    });
  }

  onDocumentClick = ($event) => {
    if (this.elementRef.nativeElement !== $event.target) {
      this.isOpen = false;
      this.cdr.markForCheck();
    }
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

  setPositions() {
    if (this.appendToBodyDirections && this.appendToBodyDirections.length > 0) {
      this.positions = this.appendToBodyDirections
        .map((position) => {
          if (typeof position === 'string') {
            return AppendToBodyDirectionsConfig[position];
          } else {
            return position;
          }
        })
        .filter((position) => position !== undefined);
    } else {
      this.positions = undefined;
    }
  }

  private transUserInputToDatepicker(value) {
    if (!value && !this.selectedDate) {
      return;
    }
    if (!value) {
      this.clearAll();
      return;
    }
    const valueDate = new Date(value);
    const valueFormat =
      valueDate && !isNaN(valueDate.getTime()) && this.dateConverter.format(valueDate, this.dateFormat, this.locale || this.i18nLocale);
    if (new Date(valueFormat).getTime() === new Date(this.selectedDate).getTime() || !this.validateDate(value)) {
      return;
    }
    if (this.showTime || this.disabled) {
      this.resetValue();
    } else {
      this.selectedDate = valueDate;
      this.writeModelValue({
        reason: SelectDateChangeReason.custom,
        selectedDate: valueDate,
      });
    }
  }

  validateDate(value: string) {
    const valueDate = new Date(value);
    const valueFormat =
      valueDate && !isNaN(valueDate.getTime()) && this.dateConverter.format(valueDate, this.dateFormat, this.locale || this.i18nLocale);
    if (
      !valueDate ||
      value !== valueFormat ||
      (value === valueFormat && (valueDate.getTime() < this.minDate.getTime() || valueDate.getTime() > this.maxDate.getTime()))
    ) {
      return false;
    } else {
      return true;
    }
  }

  resetValue() {
    const resDate = this.selectedDate ? this.dateConverter.format(this.selectedDate, this.dateFormat, this.locale || this.i18nLocale) : '';
    this.elementRef.nativeElement.value = resDate;
  }

  clearAll = (reason?: SelectDateChangeReason) => {
    if (this.disabled) {
      return;
    }
    this.writeValue(null);
    this.selectedDate = null;
    this.onChange(null);
    this.onTouched();
    const currentReason = typeof reason === 'number' ? reason : SelectDateChangeReason.custom;
    this.selectedDateChange.emit({
      reason: currentReason,
      selectedDate: null,
    });
  };

  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
    if (this.userInputSubscription) {
      this.userInputSubscription.unsubscribe();
    }
    this.document.removeEventListener('click', this.onDocumentClick);
  }
}
