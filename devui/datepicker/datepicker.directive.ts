import {
  Directive, OnInit, Input, ElementRef, forwardRef, ComponentRef, ViewContainerRef, Output, EventEmitter,
  ComponentFactoryResolver, Renderer2, Injector, HostListener, TemplateRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateConverter } from 'ng-devui/utils';
import { DatepickerComponent } from './datepicker.component';
import { SelectDateChangeEventArgs, SelectDateChangeReason } from './date-change-event-args.model';
import { DevUIConfig } from 'ng-devui/devui.config';
import { DefaultDateConverter } from 'ng-devui/utils';
import { I18nService } from 'ng-devui/utils';
import {
  animate,
  AnimationBuilder,
  AnimationMetadata,
  AnimationPlayer,
  style
} from '@angular/animations';

const easeInQuint = 'cubic-bezier(0.755, 0.05, 0.855, 0.06)';
const easeOutQuint = 'cubic-bezier(0.23, 1, 0.32, 1)';
const animationDuration = '200ms';

@Directive({
  selector: '[dDatepicker]:not([appendToBody])',
  exportAs: 'datepicker',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerDirective),
    multi: true
  }]
})
export class DatepickerDirective implements OnInit, ControlValueAccessor {


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
  @Input() locale: string;
  @Input() showTime: boolean;
  @Input() cssClass: string;
  @Input() disabled: boolean;
  @Input() dateConverter: DateConverter;
  @Input() yearNumber: number;
  @Input() direnction: 'up' | 'down' = 'down';
  @Input() customViewTemplate: TemplateRef<any>;
  @Input() autoOpen = false;
  @Output() selectedDateChange = new EventEmitter<SelectDateChangeEventArgs>();
  selectedDate: Date;
  isOpen = false;
  _dateConfig: any;
  private _dateFormat: string;
  private _maxDate: Date;
  private _minDate: Date;
  private cmpRef: ComponentRef<DatepickerComponent>;
  private player: AnimationPlayer;
  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor(private elementRef: ElementRef, private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver, private renderer2: Renderer2,
              private injector: Injector, private devUIConfig: DevUIConfig, private i18n: I18nService,
              private builder: AnimationBuilder) {
    this._dateConfig = devUIConfig[`datePicker${i18n.getLangSuffix()}`];
    this.dateConverter = devUIConfig[`datePicker${i18n.getLangSuffix()}`].dateConverter || new DefaultDateConverter();
    this.selectedDate = null;
    const factory = this.componentFactoryResolver.resolveComponentFactory(DatepickerComponent);
    this.cmpRef = this.viewContainerRef.createComponent(factory, this.viewContainerRef.length, this.injector);
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
    const target = this.cmpRef.location.nativeElement;
    this.applyPopupStyling(target);
    const component = this.cmpRef.instance;
    this.renderer2.setStyle(target, 'display', 'none');
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

    if (this.autoOpen) {
      this.show();
    }
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

  private getDateFormat() {
    if (this.dateFormat) {
      return this.dateFormat;
    }
    return this.showTime ? this.dateConfig.format.time : this.dateConfig.format.date;
  }

  private applyPopupStyling(nativeElement: any) {
    this.renderer2.addClass(nativeElement, 'dropdown-menu');
    this.renderer2.setStyle(nativeElement, 'padding', '0px');
    if (this.direnction === 'up') {
      this.renderer2.setStyle(nativeElement, 'top', 'auto');
      this.renderer2.setStyle(nativeElement, 'bottom', '100%');
    }
  }

  hide() {
    const playAnimation = this.isOpen !== false;
    this.isOpen = false;
    if (playAnimation) {
      this.playAnimation();
    }
  }

  private writeModelValue(selectDate: Date) {
    const value = selectDate ? this.dateConverter.format(selectDate, this.getDateFormat(), this.locale) : '';
    this.renderer2.setProperty(this.elementRef.nativeElement, 'value', value);
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
    const playAnimation = this.isOpen !== true;
    this.isOpen = true;
    if (playAnimation) {
      this.playAnimation();
    }
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

  private popIn(direction): AnimationMetadata[] {
    switch (direction) {
      case 'top':
        return [
          style({transform: 'perspective(1px) scale(0.9)', opacity: 0, transformOrigin: '0% 100%', display: 'inline-block'}),
          animate(`${animationDuration} ${easeOutQuint}`,
            style({transform: 'perspective(1px) scale(1)', opacity: 1, transformOrigin: '0% 100%'})),
        ];
      case 'bottom':
      default:
        return [
          style({transform: 'perspective(1px) scale(0.9)', opacity: 0, transformOrigin: '0% 0%', display: 'inline-block'}),
          animate(`${animationDuration} ${easeOutQuint}`,
            style({transform: 'perspective(1px) scale(1)', opacity: 1, transformOrigin: '0% 0%'})),
        ];
    }
  }

  private popOut(direction): AnimationMetadata[] {
    switch (direction) {
      case 'top':
        return [
          style({transform: 'perspective(1px) scale(1)', opacity: 1, transformOrigin: '0% 100%'}),
          animate(`${animationDuration} ${easeInQuint}`,
            style({transform: 'perspective(1px) scale(0.9)', opacity: 0, transformOrigin: '0% 100%'}))
        ];
      case 'bottom':
      default:
        return [
          style({transform: 'perspective(1px) scale(1)', opacity: 1, transformOrigin: '0% 0%'}),
          animate(`${animationDuration} ${easeInQuint}`,
            style({transform: 'perspective(1px) scale(0.9)', opacity: 0, transformOrigin: '0% 0%'}))
        ];
    }
  }

  private playAnimation() {
    if (this.player) {
      this.player.destroy();
    }
    let direction = '';
    switch (this.direnction) {
      case 'down':
        direction = 'bottom';
        break;
      case 'up':
        direction = 'top';
        break;
      default:
        direction = 'bottom';
    }
    const metadata = this.isOpen ? this.popIn(direction) : this.popOut(direction);
    const factory = this.builder.build(metadata);
    this.renderer2.setStyle(this.cmpRef.location.nativeElement, 'display', 'inline-block');
    this.player = factory.create(this.cmpRef.location.nativeElement);
    this.player.onDone(() => {
      if (!this.isOpen) {
        const targetElement = this.cmpRef.location.nativeElement;
        this.renderer2.setStyle(targetElement, 'display', 'none');
      }
    });
    this.player.play();
  }
}
