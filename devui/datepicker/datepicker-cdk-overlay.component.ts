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
  SimpleChanges
} from '@angular/core';
import { CdkOverlayOrigin, ConnectedPosition, ConnectedOverlayPositionChange, VerticalConnectionPos } from '@angular/cdk/overlay';

import { AppendToBodyDirection, AppendToBodyDirectionsConfig } from 'ng-devui/utils';
import { DateConverter } from 'ng-devui/utils';
import { SelectDateChangeEventArgs, SelectDateChangeReason } from './date-change-event-args.model';
import { DevUIConfig } from 'ng-devui/devui.config';
import { I18nService } from 'ng-devui/utils';
import { DefaultDateConverter } from 'ng-devui/utils';
import { cornerFadeInOut } from 'ng-devui/utils';

@Component({
  // tslint:disable-next-line
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
      <d-datepicker [@cornerFadeInOut]="isOpen ? datepickerPosition : 'void'" [locale]="locale"
                      [showTime]="showTime" [cssClass]="cssClass" [selectedDate]="selectedDate"
                      [disabled]="disabled" [dateConverter]="dateConverter" (selectedDateChange)="timeChange($event)"
                      [yearNumber]="yearNumber" [dateFormat]="dateFormat" [dateConfig]="dateConfig"
                      [customViewTemplate]="customViewTemplate" [maxDate]="maxDate"
                      [minDate]="minDate" class="datepicker"></d-datepicker>
    </ng-template>
  `,
  animations: [
    cornerFadeInOut
  ],
  styleUrls: ['./datepicker-cdk-overlay.component.scss']
})
export class DatePickerAppendToBodyComponent implements OnInit, OnChanges, ControlValueAccessor {
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


  @Input() set dateConfig(dateConfig: any) {
    this._dateConfig = dateConfig ? dateConfig : this.devUIConfig.datePickerCN;
  }

  get dateConfig() {
    return this._dateConfig;
  }

  @Input() set dateFormat(dateFormat: string) {
    if (this._dateFormat !== dateFormat) {
      this._dateFormat = dateFormat;
      this.writeModelValue(this.selectedDate);
    }
  }

  get dateFormat() {
    return this._dateFormat;
  }

  @Input() set maxDate(date: Date | any) {
    const parseDate = this.dateConverter.parse(date, this.getDateFormat(), this.locale);
    if (parseDate) {
      this._maxDate = parseDate;
    }
  }
  get maxDate() {
    return this._maxDate;
  }

  @Input() set minDate(date: Date | any) {
    const parseDate = this.dateConverter.parse(date, this.getDateFormat(), this.locale);
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
    private renderer2: Renderer2, private devUIConfig: DevUIConfig, private i18n: I18nService) {
    this._dateConfig = devUIConfig[`datePicker${i18n.getLangSuffix()}`];
    this.dateConverter = devUIConfig[`datePicker${i18n.getLangSuffix()}`].dateConverter || new DefaultDateConverter();
    this.selectedDate = null;
    this.i18n.getMessage().subscribe((lang) => {
      const langSuffix = lang === 'zh-CN' ? 'CN' : 'EN';
      this._dateConfig = devUIConfig[`datePicker${langSuffix}`];
    });

  }

  ngOnInit() {
    this.showTime = this.showTime || this.dateConfig.timePicker;
    this.locale = this.dateConfig.locale;
    this._minDate = this.minDate ? new Date(this.minDate) : new Date(this.dateConfig.min, 0, 1, 0, 0, 0);
    this._maxDate = this.maxDate ? new Date(this.maxDate) : new Date(this.dateConfig.max, 11, 31, 23, 59, 59);
    this.setPositions();
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
      this.dateConverter.parse(obj, this.getDateFormat(), this.locale) : null;
    const value = this.selectedDate ? this.dateConverter.format(this.selectedDate, this.getDateFormat(), this.locale) : '';
    this.renderer2.setProperty(this.elementRef.nativeElement, 'value', value);
  }

  timeChange(data) {
    this.writeValue(data['selectedDate']);
    this.writeModelValue(data['selectedDate']);
    if (data['reason'] === SelectDateChangeReason.date) {
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

  private getDateFormat() {
    if (this.dateFormat) {
      return this.dateFormat;
    }
    return this.showTime ? this.dateConfig.format.time : this.dateConfig.format.date;
  }

  private writeModelValue(selectDate: Date) {
    this.onChange(selectDate); // 这行代码能触发ngModel绑定的变量值发生变化
    this.selectedDateChange.emit({
      reason: SelectDateChangeReason.time,
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
}
