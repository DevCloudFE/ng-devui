import {
  Directive, OnInit, Input, ElementRef, forwardRef, ComponentRef, ViewContainerRef, Output, EventEmitter,
  ComponentFactoryResolver, Renderer2, Injector, HostListener, TemplateRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DateConverter } from '../utils/date-converter';
import { DatepickerComponent } from './datepicker.component';
import { SelectDateChangeEventArgs, SelectDateChangeReason } from './date-change-event-args.model';
import { DevUIConfig } from '../devui.config';
import { DefaultDateConverter } from '../utils/default-date-converter';

@Directive({
  selector: '[aveDatepicker]',
  exportAs: 'datepicker',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerDirective),
    multi: true
  }]
})
export class DatepickerDirective implements OnInit, ControlValueAccessor {
  @Input() locale: string;
  @Input() showTime: boolean;
  @Input() cssClass: string;
  @Input() disabled: boolean;
  @Input() dateConverter: DateConverter;
  @Input() yearNumber: number;
  @Input() direnction: 'up' | 'down' = 'down';
  @Input() customViewTemplate: TemplateRef<any>;
  @Output() selectedDateChange = new EventEmitter<SelectDateChangeEventArgs>();
  selectedDate: Date;
  isOpen = false;
  _dateConfig: any;
  private _dateFormat: string;
  private _maxDate: Date;
  private _minDate: Date;
  private cmpRef: ComponentRef<DatepickerComponent>;
  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor(private elementRef: ElementRef, private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer2,
              private injector: Injector, private devuiConfig: DevUIConfig) {
    this._dateConfig = this.devuiConfig['datePickerCN'];
    this.dateConverter = this.devuiConfig['datePickerCN'].dateConverter || new DefaultDateConverter();
    this.selectedDate = null;
    const factory = this.componentFactoryResolver.resolveComponentFactory(DatepickerComponent);
    this.cmpRef = this.viewContainerRef.createComponent(factory, this.viewContainerRef.length, this.injector);
  }

  ngOnInit() {
    this.showTime = this.showTime || this.dateConfig.timePicker;
    this.locale = this.locale || this.dateConfig.locale;
    this._minDate = this.minDate ? new Date(this.minDate) : new Date(this.dateConfig.min, 0, 1, 0, 0, 0);
    this._maxDate = this.maxDate ? new Date(this.maxDate) : new Date(this.dateConfig.max, 11, 31, 23, 59, 59);

    this.applyPopupStyling(this.cmpRef.location.nativeElement);
    const component = this.cmpRef.instance;
    this.hide();
    component.writeValue(this.selectedDate);
    this.fillPopupData();
    component.ngOnInit();

    component.registerOnChange(selectedDate => {
      this.writeValue(selectedDate);
      this.onChange(selectedDate);
    });

    component.selectedDateChange.subscribe((arg: SelectDateChangeEventArgs) => {
      if (arg.reason === SelectDateChangeReason.date) {
        this.hide();
      }
    });
  }

  writeValue(obj: any): void {
    this.selectedDate = obj ?
      this.dateConverter.parse(obj, this.getDateFormat(), this.locale) : null;
    this.writeModelValue(this.selectedDate);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private parseDateFunc(date, direction) {
    const parseDate = this.dateConverter.parse(date, this.getDateFormat(), this.locale)
      ;
    if (parseDate) {
      this[direction] = date
      ;
    }
  }


  @Input() set dateConfig(dateConfig: any) {
    this._dateConfig = dateConfig ? dateConfig : this.devuiConfig.datePickerCN;
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

  private getDateFormat() {
    if (this.dateFormat) {
      return this.dateFormat;
    }
    return this.showTime ? this.dateConfig.format.time : this.dateConfig.format.date;
  }

  private applyPopupStyling(nativeElement: any) {
    this.renderer.addClass(nativeElement, 'dropdown-menu');
    this.renderer.setStyle(nativeElement, 'padding', '0px');
    if (this.direnction === 'up') {
      this.renderer.setStyle(nativeElement, 'top', 'auto');
      this.renderer.setStyle(nativeElement, 'bottom', '100%');
    }
  }

  hide() {
    this.isOpen = false;
    const target = this.cmpRef.location.nativeElement;
    this.renderer.setStyle(target, 'display', 'none');
  }

  private writeModelValue(selectDate: Date) {
    const value = selectDate ? this.dateConverter.format(selectDate, this.getDateFormat(), this.locale) : '';
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
    if (this.isOpen) {
      this.cmpRef.instance.writeValue(this.selectedDate);
    }
    this.selectedDateChange.emit({
      reason: SelectDateChangeReason.time,
      selectedDate: this.selectedDate
    });
  }

  show() {
    const component = this.cmpRef.instance;
    component.writeValue(this.selectedDate);
    this.fillPopupData();
    this.isOpen = true;
    const targetElement = this.cmpRef.location.nativeElement;
    const hostElement = this.elementRef.nativeElement;
    this.renderer.setStyle(targetElement, 'display', 'inline-block');
  }

  toggle($event: Event) {
    if ($event) {
      $event.stopPropagation();
    }
    if (this.isOpen) {
      this.hide();
      return;
    }
    this.show();
  }

  private fillPopupData() {
    ['showTime', 'maxDate', 'minDate', 'cssClass', 'disabled', 'dateConverter', 'locale', 'dateFormat', 'yearNumber', 'dateConfig',
    'customViewTemplate']
      .forEach(key => {
        if (this[key] !== undefined) {
          this.cmpRef.instance[key] = this[key];
        }
      });
  }

  @HostListener('blur', ['$event'])
  onBlur($event) {
    this.onTouched();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick($event) {
    if (this.elementRef.nativeElement !== $event.target) {
      this.hide();
    }
  }

  clearAll() {
    this.cmpRef.instance.clearAll();
  }
}
