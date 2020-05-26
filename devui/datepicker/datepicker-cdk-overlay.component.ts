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
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
                      [yearNumber]="yearNumber" [dateFormat]="dateFormat" [dateConfig]="dateConfig"
                      [customViewTemplate]="customViewTemplate" [maxDate]="maxDate"
                      [minDate]="minDate" class="devui-datepicker"></d-datepicker>
    </ng-template>
  `,
  animations: [
    cornerFadeInOut
  ],
  styleUrls: ['./datepicker-cdk-overlay.component.scss']
})
export class DatePickerAppendToBodyComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  @Input() locale: string;
  @Input() showTime: boolean;
  @Input() cssClass: string;
  @Input() disabled: boolean;
  @Input() dateConverter: DateConverter;
  @Input() yearNumber = 12;
  @Input() customViewTemplate: TemplateRef<any>;
  @Input() autoOpen = false;
  @Output() selectedDateChange = new EventEmitter<SelectDateChangeEventArgs>();
  selectedDate: Date;
  isOpen = false;
  _dateConfig: any;
  positions: ConnectedPosition[];
  datepickerPosition: VerticalConnectionPos = 'bottom';
  private _dateFormat: string;
  private _maxDate: Date;
  private _minDate: Date;
  private clickShow = false;
  private inputSub: Subscription;
  private i18nSubscription: Subscription;
  public i18nLocale: I18nInterface['locale'];


  @Input() set dateConfig(dateConfig: any) {
    if (dateConfig) {
      this._dateConfig = dateConfig;
      this._dateFormat = this.showTime ? dateConfig.format.time : dateConfig.format.date;
    } else {
      this._dateConfig = this.datePickerConfig.dateConfig;
    }
  }

  get dateConfig() {
    return this._dateConfig;
  }

  @Input() set dateFormat(dateFormat: string) {
    if (this._dateFormat !== dateFormat) {
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

  public cdkConnectedOverlayOrigin: any;

  @Input() appendToBodyDirections: Array<AppendToBodyDirection | ConnectedPosition> = [
    'rightDown', 'leftDown', 'rightUp', 'leftUp'
  ];

  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor(private elementRef: ElementRef, private viewContainerRef: ViewContainerRef,
              private renderer2: Renderer2, private datePickerConfig: DatePickerConfig, private i18n: I18nService) {
    this._dateConfig = datePickerConfig['dateConfig'];
    this.dateConverter = datePickerConfig['dateConfig'].dateConverter || new DefaultDateConverter();


    this.inputSub = fromEvent(this.elementRef.nativeElement, 'input')
     .pipe(
      debounceTime(300)
     ).subscribe(event => {
        this.transUserInputToDatepicker(event);
      });
  }

  ngOnInit() {
    this.showTime = this.showTime || this.dateConfig.timePicker;
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

  timeChange(data) {
    this.writeValue(data['selectedDate']);
    this.writeModelValue(data);
    if (data['reason'] === SelectDateChangeReason.date && !this.showTime ||
     data['reason'] === SelectDateChangeReason.button) {
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
    this.selectedDateChange.emit({
      reason: dateReason,
      selectedDate: this.selectedDate
    });
  }

  @HostListener('blur', ['$event'])
  onBlur($event) {
    this.onTouched();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick($event) {
    if (this.elementRef.nativeElement !== $event.target && !this.clickShow) {
      this.isOpen = false;
    } else {
      this.clickShow = false;
    }
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

  private transUserInputToDatepicker(event) {
    if (!this.showTime && !this.disabled) {
      const value = event.target.value;
      if (!value) {
        this.clearAll();
        return;
      }
      const valueDate = new Date(value);
      const valueFormat = this.dateConverter.format(valueDate, this.dateFormat, this.locale || this.i18nLocale);
      if (value && value === valueFormat) {
        if (valueDate.getTime() < this.minDate.getTime() || valueDate.getTime() > this.maxDate.getTime()) {
          this.writeValue(this.selectedDate);
        } else {
          this.selectedDate = new Date(value);
          this.writeModelValue(value);
        }
      } else if (!value) {
        this.writeValue(null);
      }
    } else {
      this.writeValue(this.selectedDate);
    }
  }

  clearAll = (reason?: SelectDateChangeReason) => {
    this.writeValue(null);
    this.onChange(null);
    const currentReason = typeof reason === 'number' ? reason : SelectDateChangeReason.custom;
    this.selectedDateChange.emit({
      reason: currentReason,
      selectedDate: null
    });
  }

  ngOnDestroy() {
    if (this.inputSub) {
      this.inputSub.unsubscribe();
    }
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }
}
