import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  Component,
  forwardRef,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewContainerRef,
  Renderer2,
  HostListener,
  ViewChild,
  OnDestroy,
  TemplateRef
} from '@angular/core';
import { CdkOverlayOrigin, ConnectedOverlayPositionChange, VerticalConnectionPos } from '@angular/cdk/overlay';
import { DateConverter } from 'ng-devui/utils';
import { SelectDateRangeChangeEventArgs, SelectDateRangeChangeReason } from './date-range-change-event-args.model';
import { DatePickerConfigService as DatePickerConfig } from './date-picker.config.service';
import { I18nService, I18nInterface } from 'ng-devui/i18n';
import { DefaultDateConverter } from 'ng-devui/utils';
import { cornerFadeInOut } from 'ng-devui/utils';
import { Subject, fromEvent, Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: '[dDateRangePicker]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateRangePickerComponent),
    multi: true
  }],
  exportAs: 'dateRangePicker',
  template: `
    <ng-template cdk-connected-overlay
                 [cdkConnectedOverlayOrigin]="cdkConnectedOverlayOrigin"
                 [cdkConnectedOverlayOpen]="isOpen"
                 (backdropClick)="isOpen=false"
                 (positionChange)="onPositionChange($event)">
      <div [@cornerFadeInOut]="isOpen ? datepickerPosition : 'void'" class="devui-date-range-wrapper devui-dropdown-overlay">
        <div class="devui-date-range-title">
          <span>开始日期</span>
          <span>结束日期</span>
        </div>
        <div class="devui-date-range-picker">
          <d-datepicker-range-single [locale]="locale || i18nLocale" class="devui-date-picker"
                                      [cssClass]="cssClass"
                                      [disabled]="disabled" [dateConverter]="dateConverter" (rangeSelected)="rangeChange($event)"
                                      [dateFormat]="dateFormat" [dateConfig]="dateConfig"
                                      [maxDate]="maxDate"
                                      [minDate]="minDate" (hoverOnDate)="selectingDate($event)" [rangePicker]="true"
                                      [selectedRange]="[rangeStart, rangeEnd]" (rangeSelecting)="syncRangeStart($event, rightPicker)"
                                      (syncPickerPair)="syncPickerPair($event, 'left')"
                                      [currentCalendars]="currentCalendars"
                                      [showTime]="showTime"
                                      #leftPicker></d-datepicker-range-single>
          <d-datepicker-range-single [locale]="locale || i18nLocale" class="devui-date-picker"
                                      [cssClass]="cssClass"
                                      [disabled]="disabled" [dateConverter]="dateConverter" (rangeSelected)="rangeChange($event)"
                                      [dateFormat]="dateFormat" [dateConfig]="dateConfig"
                                      [maxDate]="maxDate"
                                      [minDate]="minDate" (hoverOnDate)="selectingDate($event)" [rangePicker]="true"
                                      [selectedRange]="[rangeStart, rangeEnd]" (rangeSelecting)="syncRangeStart($event, leftPicker)"
                                      (syncPickerPair)="syncPickerPair($event, 'right')" [isAuxiliary]="true"
                                      [currentCalendars]="currentCalendars"
                                      [showTime]="showTime"
                                      (consolidateTime)="consolidateTime()"
                                      #rightPicker></d-datepicker-range-single>
        </div>
        <div class="devui-date-range-custom" *ngIf="customViewTemplate" #templateWrap>
          <ng-template
            [ngTemplateOutlet]="customViewTemplate"
            [ngTemplateOutletContext]="{
              $implicit: this,
              clearAll: clearAll,
              chooseDate: chooseDate,
              rangeStart: rangeStart,
              rangeEnd: rangeEnd
            }"
          ></ng-template>
        </div>
      </div>
    </ng-template>
  `,
  styleUrls: ['./date-range-picker.component.scss'],
  animations: [
    cornerFadeInOut
  ]
})
export class DateRangePickerComponent implements OnInit, ControlValueAccessor, OnDestroy {

  @Input() set showTime(showTime: boolean) {
    this._showTime = showTime;
  }

  get showTime() {
    return typeof this._showTime === 'boolean' ? this._showTime : this.dateConfig.timePicker;
  }

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
    }
  }

  get dateFormat() {
    return this._dateFormat;
  }

  @Input() set maxDate(date: Date | any) {
    const parseDate = this.convertDate(date);
    if (parseDate) {
      this._maxDate = parseDate;
    }
  }

  get maxDate() {
    return this._maxDate;
  }

  @Input() set minDate(date: Date | any) {
    const parseDate = this.convertDate(date);
    if (parseDate) {
      this._minDate = parseDate;
    }
  }

  get minDate() {
    return this._minDate;
  }

  set isOpen(isOpen: boolean) {
    this._isOpen = isOpen;
    if (!isOpen && !this.rangeEnd) {
      this.rangeStart = null;
    }
    if (!isOpen) {
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

  @Input() locale: string;
  @Input() cssClass: string;
  @Input() disabled: boolean;
  @Input() dateConverter: DateConverter;
  @Input() selectedRange = [null, null];
  @Input() hideOnRangeSelected = false;
  @Input() customViewTemplate: TemplateRef<any>;
  @Input() splitter = '  -  ';
  @Output() selectedRangeChange = new EventEmitter<SelectDateRangeChangeEventArgs>();
  @ViewChild('leftPicker') leftPicker: ElementRef;
  @ViewChild('rightPicker') rightPicker: ElementRef;
  @ViewChild('templateWrap') templateWrap: ElementRef;
  private _isOpen = false;
  private _dateConfig: any;
  private _dateFormat: string;
  private _maxDate: Date;
  private _minDate: Date;
  private _showTime: boolean;
  private clickShow = false;
  private inputSub: Subscription;
  public currentCalendars = [null, null];
  public cdkConnectedOverlayOrigin: any;
  public i18nLocale: I18nInterface['locale'];
  private i18nSubscription: Subscription;
  hoverOnDate: Subject<object> = new Subject<object>();
  datepickerPosition: VerticalConnectionPos = 'bottom';
  rangeStart;
  rangeEnd;
  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor(private elementRef: ElementRef, private viewContainerRef: ViewContainerRef,
              private renderer: Renderer2, private datePickerConfig: DatePickerConfig, private i18n: I18nService) {
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
    this._minDate = this.minDate ? new Date(this.minDate) : new Date(this.dateConfig.min, 0, 1, 0, 0, 0);
    this._maxDate = this.maxDate ? new Date(this.maxDate) : new Date(this.dateConfig.max, 11, 31, 23, 59, 59);
    this.setI18nText();
    this.updateCdkConnectedOverlayOrigin();
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
      if (Array.isArray(this.selectedRange)) {
        [this.rangeStart, this.rangeEnd] = this.selectedRange;
      }
      this.writeModelValue(selectedRange);
    }
  }

  setI18nText() {
    this.i18nLocale = this.i18n.getI18nText().locale;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nLocale = data.locale;
    });
  }

  rangeChange(data, reason?) {
    const currentReason = typeof reason === 'number' ? reason : SelectDateRangeChangeReason.date;
    this.chooseDate(data.selectedRange, currentReason);
  }

  chooseDate = (range, reason?) => {
    const currentReason = typeof reason === 'number' ? reason : SelectDateRangeChangeReason.custom;
    this.writeValue(range);
    this.notifyValueChange(range, currentReason);
    if (!this.showTime && this.hideOnRangeSelected) { this.hide(); }
  }

  updateCdkConnectedOverlayOrigin() {
    if (this.elementRef.nativeElement) {
      this.cdkConnectedOverlayOrigin = new CdkOverlayOrigin(this.elementRef.nativeElement);
    }
  }

  public toggle($event: Event, clickShow?: boolean) {
    this.isOpen = !this.isOpen;
    this.clickShow = clickShow;
  }

  public hide() {
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

  private writeModelValue(input) {
    if (Array.isArray(input) && input.every(_ => !!_)) {
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.formatDateRange(input));
    } else {
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', '');
    }
  }

  private formatDateRange(arr) {
    return arr.map((date, i) => {
      return date ? this.dateConverter.format(date, this.dateFormat, this.locale || this.i18nLocale) : ['Start', 'End'][i];
    }).join(this.splitter);
  }

  @HostListener('blur', ['$event'])
  onBlur($event) {
    this.onTouched();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick($event) {
    if (this.templateWrap && this.templateWrap.nativeElement.contains($event.target) && !this.hideOnRangeSelected) {
      this.isOpen = true;
    } else if (this.elementRef.nativeElement !== $event.target && !this.clickShow) {
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

  convertDate(date) {
    return date ?
      this.dateConverter.parse(date, this.dateFormat, this.locale || this.i18nLocale) : null;
  }

  selectingDate(event) {
    this.hoverOnDate.next(event);
  }

  subscribeHoverActions() {
    this.hoverOnDate.pipe(
      distinctUntilChanged()
    ).subscribe((date) => {
      this.previewRangeEnd(date);
    });
  }

  previewRangeEnd(date) {
    if (date) {
      this.leftPicker['previewEnd'] = date;
      this.rightPicker['previewEnd'] = date;
    }
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
    }
  }

  notifyValueChange(range, reason?) {
    let currentReason;
    this.onChange(range);
    if (reason === undefined) {
      currentReason = SelectDateRangeChangeReason.time;
    } else {
      currentReason = reason;
    }
    this.selectedRangeChange.emit({
      reason: currentReason,
      selectedRange: range
    });
  }

  consolidateTime() {
    const rangeStart = this.rangeStart;
    const rangeEnd = this.rangeEnd;
    const rangeStartTime = this.leftPicker['currentTime'];
    const rangeEndTime = this.rightPicker['currentTime'];
    this.rangeStart = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), rangeStart.getDate(),
      rangeStartTime.hour, rangeStartTime.minute, rangeStartTime.second);
    this.rangeEnd = new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), rangeEnd.getDate(),
      rangeEndTime.hour, rangeEndTime.minute, rangeEndTime.second);
    const newRange = [this.rangeStart, this.rangeEnd];
    this.onTouched();
    this.writeValue(newRange);
    this.notifyValueChange(newRange, SelectDateRangeChangeReason.button);
    this.hide();
  }

  private transUserInputToDatepicker(event) {
    if (!this.showTime && !this.disabled) {
      const value = event.target.value;
      if (!value) {
        this.clearAll();
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
      if (valueList.length === 2 && valueList.every(val => !!val)) {
        if (valueList[0] !== valueList[1]) {
          // 判断前后两日期是否相等
          const valueTimeList = valueList.map(val => (new Date(`${val} 00:00:00`)).getTime());
          valueFormat = this.formatDateRange(valueList.map(numValue => new Date(numValue)));
          if (value === valueFormat && !valueTimeList.every(val => val >= this.minDate.getTime() && val <= this.maxDate.getTime())) {
            // 判断前后俩日期是否小于最小或大于最大，若是则不合法，恢复之前的
            this.writeValue(this.selectedRange);
            return;
          } else {
            // 判断前后俩日期是否大于最小，小于最大，若是则合法，进行如下操作
            // 此时包括value为NaN既日期格式不正确的情况，对其进行处理下方判断会过滤掉
            valueList = valueList.map(val => new Date(val).getTime()).sort((a, b) => a - b).map(numValue => new Date(numValue));
          }
        } else {
          // 前后相等的情况下恢复之前的
          this.writeValue(this.selectedRange);
          return;
        }
        if (valueFormat && value === valueFormat) {
          this.chooseDate(valueList);
        }
      }
    } else {
      this.writeValue(this.selectedRange);
    }
  }

  ngOnDestroy(): void {
    this.hide();
    if (this.inputSub) {
      this.inputSub.unsubscribe();
    }
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }

  clearAll = (reason?: SelectDateRangeChangeReason) => {
    if (this.disabled) {
      return;
    }
    const currentReason = typeof reason === 'number' ? reason : SelectDateRangeChangeReason.custom;
    this.chooseDate([null, null], currentReason);
  }

}
