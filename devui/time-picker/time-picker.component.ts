import { CdkOverlayOrigin, ConnectedOverlayPositionChange, ConnectedPosition, VerticalConnectionPos } from '@angular/cdk/overlay';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { AppendToBodyDirection, AppendToBodyDirectionsConfig, cornerFadeInOut, unshiftString } from 'ng-devui/utils';
import { fromEvent, Observable, Subscription, } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';

interface TimeObj {
  time: string;
  type?: string;
  active?: boolean;
  disabled?: boolean;
}

@Component({
  selector: '[dTimePicker]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimePickerComponent),
    multi: true
  }],
  exportAs: 'timePicker',
  templateUrl: 'time-picker.component.html',
  animations: [
    cornerFadeInOut
  ],
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnChanges, OnInit, OnDestroy, ControlValueAccessor {
  @Input() appendToBodyDirections: Array<AppendToBodyDirection | ConnectedPosition> = [
    'rightDown', 'leftDown', 'rightUp', 'leftUp'
  ];
  @Input() disabled: boolean;
  @Input() customViewTemplate: TemplateRef<any>;
  @Input() autoOpen = false;
  origin: CdkOverlayOrigin | undefined; // 暂不开放
  splitter = ':'; // 暂不开放
  @Output() selectedTimeChange = new EventEmitter<string>();
  @ViewChild('timePicker') timePicker;
  public cdkConnectedOverlayOrigin: any;
  public positions: ConnectedPosition[];
  public timePickerPosition: VerticalConnectionPos = 'bottom';
  // 此处使用第一第二第三列而不是时分秒是为了方便在format顺序变化（例如ss:mm）时，可以比较容易的换数组顺序
  public firstList: Array<TimeObj> = [];
  public secondList: Array<TimeObj> = [];
  public thirdList: Array<TimeObj> = [];
  public originWidth: number;
  public i18nCommonText: I18nInterface['common'];
  private valueChanges: Observable<any>;
  private userInputSubscription: Subscription;
  private i18nSubscription: Subscription;
  private _timePickerWidth: number;
  private _isOpen = false;
  private _minTimeHour = '00';
  private _minTimeMin = '00';
  private _minTimeSec = '00';
  private _maxTimeHour = '23';
  private _maxTimeMin = '59';
  private _maxTimeSec = '59';
  private _format = 'hh:mm:ss';
  private _selectedTimeHour: string;
  private _selectedTimeMin: string;
  private _selectedTimeSec: string;
  private _initTimeHour = '00';
  private _initTimeMin = '00';
  private _initTimeSec = '00';
  private _illegalTimeHour = '24';
  private _illegalTimeMin = '60';
  private _illegalTimeSec = '60';
  private correct = ['Hour', 'Min', 'Sec'];

  private onChange = (_: any) => null;
  private onTouched = () => null;

  @Input() set minTime(minTime: string) {
    if (this.validateTime(minTime)) {
      this.setCurrent('minTime', minTime);
    }
  }
  get minTime() {
    return this.getCurrent('minTime');
  }

  @Input() set maxTime(maxTime: string) {
    if (this.validateTime(maxTime)) {
      this.setCurrent('maxTime', maxTime);
    }
  }
  get maxTime() {
    return this.getCurrent('maxTime');
  }

  @Input() set format(format) {
    if (this._format !== format) {
      this._format = format.toLocaleLowerCase();
      this.firstList.length = 0;
      this.secondList.length = 0;
      this.thirdList.length = 0;
      setTimeout(() => {
        this.writeValue();
        this.writeModelValue(this.selectedTimeFormat, true);
      });
    }
  }
  get format() {
    return this._format;
  }

  @Input() set timePickerWidth(width) {
    if (width !== undefined) {
      this._timePickerWidth = width;
    }
  }
  get timePickerWidth() {
    return this._timePickerWidth;
  }

  set isOpen(open: boolean) {
    if (this._isOpen !== open) {
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
      } else {
        if (this.timePickerWidth !== undefined) {
          this.originWidth = this.timePickerWidth;
        } else {
          let currentOrigin;
          if (this.origin) {
            currentOrigin = this.origin;
          } else if (this.elementRef.nativeElement) {
            currentOrigin = this.formWithDropDown() || this.elementRef.nativeElement;
          }
          if (currentOrigin) {
            this.originWidth = currentOrigin.offsetWidth;
          }
        }
      }
    }
  }
  get isOpen() {
    return this._isOpen;
  }

  set selectedTime(time: string) {
    if (this.validateTime(time)) {
      this.setFormatCurrent('selectedTime', time);
    } else {
      this.setFormatCurrent('selectedTime', this.initTime);
    }
  }
  get selectedTime() {
    return this.getCurrent('selectedTime');
  }

  get selectedTimeFormat() {
    return this.getFormatCurrent('selectedTime');
  }

  get initTime() {
    return this.getCurrent('initTime');
  }

  get illegalTime() {
    return this.getCurrent('illegalTime');
  }

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private renderer2: Renderer2,
    private i18n: I18nService,
    private cdr: ChangeDetectorRef
  ) {}

  @HostListener('blur', ['$event'])
  onBlur($event) {
    this.onTouched();
    const value = this.elementRef.nativeElement.value;
    if (!this.validateTime(value)) {
      this.resetValue();
    }
  }

  onDocumentClick = ($event) => {
    if (this.elementRef.nativeElement !== $event.target &&
      (this.timePicker && !this.timePicker.nativeElement.contains($event.target))
    ) {
      this.isOpen = false;
      this.cdr.markForCheck();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appendToBodyDirections']) {
      this.setPositions();
    }
  }

  ngOnInit() {
    this.setPositions();
    this.setI18nText();
    this.updateCdkConnectedOverlayOrigin();
    if (this.autoOpen) {
      this.isOpen = true;
    }
    this.valueChanges = this.registerInputEvent();
    this.userInputSubscription = this.valueChanges.subscribe((source) => this.transUserInputToTimePicker(source));
  }

  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
    if (this.userInputSubscription) {
      this.userInputSubscription.unsubscribe();
    }
    document.removeEventListener('click', this.onDocumentClick);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(time?: string): void {
    if (time !== undefined) {
      this.selectedTime = time;
    }
    const value = this.selectedTimeFormat || '';
    this.renderer2.setProperty(this.elementRef.nativeElement, 'value', value);
    this.setTimeArr();
  }

  registerInputEvent() {
    return fromEvent(this.elementRef.nativeElement, 'keyup').pipe(
      map((e: any) => e.target.value),
      filter(() => !this.disabled),
      debounceTime(300)
    );
  }

  validateTime(time: string, type?: string) {
    if (!time && time !== '') {
      return false;
    }
    const timeArr = time.split(':');
    if (type && timeArr.length === 1) {
      let curType;
      switch (type) {
        case 'hh':
          curType = 'Hour';
          break;
        case 'mm':
          curType = 'Min';
          break;
        case 'ss':
          curType = 'Sec';
          break;
      }
      return time <= this[`_maxTime${curType}`] && time >= this[`_minTime${curType}`];
    }
    if (timeArr.length !== 3) {
      if (timeArr.length === this.format.split(':').length) {
        return true;
      } else {
        return false;
      }
    } else if (timeArr.some(t => t !== unshiftString(Number(t) + '', 2, '0'))) {
      return false;
    } else if (
      timeArr.some(
        (t, i) => {
          return Number(t) > Number(this.maxTime.split(':')[i]) || Number(t) < Number(this.minTime.split(':')[i]);
        }
      )
    ) {
      return false;
    }
    return true;
  }

  setI18nText() {
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.common;
    });
  }

  updateCdkConnectedOverlayOrigin() {
    let currentOrigin;
    if (this.origin) {
      currentOrigin = this.origin;
    } else if (this.elementRef.nativeElement) {
      currentOrigin = this.formWithDropDown() || this.elementRef.nativeElement;
    }
    this.cdkConnectedOverlayOrigin = new CdkOverlayOrigin(currentOrigin);
  }

  toggle(clickShow?: boolean) {
    if (clickShow === undefined) {
      if (this.disabled) {
        this.isOpen = false;
      } else {
        this.isOpen = !this.isOpen;
      }
    } else {
      this.isOpen = clickShow;
    }
  }

  hide = () => {
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

  private writeModelValue(selectTimeObj: any, noEmit = false) {
    let selectTime;
    if (selectTimeObj && typeof selectTimeObj === 'object' && selectTimeObj.hasOwnProperty('selectedTime')) {
      selectTime = selectTimeObj.selectedTime;
    } else {
      selectTime = selectTimeObj;
    }
    selectTime = selectTime || null;
    this.onChange(selectTime); // 这行代码能触发ngModel绑定的变量值发生变化
    if (!noEmit) {
      this.selectedTimeChange.emit(this.selectedTimeFormat);
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange) {
    switch (position.connectionPair.overlayY) {
      case 'top':
      case 'center':
        this.timePickerPosition = 'bottom';
        break;
      case 'bottom':
        this.timePickerPosition = 'top';
    }
    this.changeAppendToBodyFormDropDownDirection(position.connectionPair.overlayY);
  }

  changeAppendToBodyFormDropDownDirection(position) {
    const ele = this.formWithDropDown();
    const menuEle = this.timePicker && this.timePicker.nativeElement;
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
    if (menuEle && !menuEle.classList.contains(`devui-dropdown-cdk-${formBorder}`)) {
      menuEle.classList.add(`devui-dropdown-cdk-${formBorder}`);
      menuEle.classList.remove(`devui-dropdown-cdk-${position}`);
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

  transUserInputToTimePicker = (value) => {
    if (!value) {
      this.clearAll();
      return;
    }
    if (value === this.selectedTime || !this.validateTime(value)) {
      return;
    }
    if (this.disabled) {
      this.resetValue();
    } else {
      this.writeValue(value);
      this.writeModelValue(value, true);
    }
  }

  resetValue() {
    if (this.selectedTime) {
      this.writeValue(this.selectedTime);
    } else {
      this.elementRef.nativeElement.value = '';
    }
  }

  setTimeArr(justScroll?) {
    this.format.split(':').map((type, index) => {
      this.setSingleTimeArr(index, justScroll);
    });
  }

  setSingleTimeArr(index, justScroll?) {
    const selectedTimeArr = this.selectedTime ? this.selectedTime.split(':') : this.illegalTime.split(':');
    let whichList;
    switch (index) {
      case 0:
        whichList = 'first';
        break;
      case 1:
        whichList = 'second';
        break;
      case 2:
        whichList = 'third';
        break;
    }
    const type = this.format.split(':')[index];
    const arr = ['hh', 'mm', 'ss'];
    const len = type === 'hh' ? 24 : 60;
    if (!this[`${whichList}List`] || !this[`${whichList}List`].length) {
      this[`${whichList}List`] = new Array(len).fill(0).map(
        (item, i) => {
          const time =  unshiftString(i + '', 2, '0');
          const disabled = this.disabled || !this.validateTime(time, type);
          return {
            time,
            active: selectedTimeArr[arr.indexOf(type)] === time,
            type: index,
            disabled
          };
        }
      );
    } else {
      this[`${whichList}List`].map(
        (item, i) => {
          if (!justScroll) {
            const time =  unshiftString(i + '', 2, '0');
            const disabled = this.disabled || !this.validateTime(time, type);
            item.active = selectedTimeArr[arr.indexOf(type)] === time;
            item.disabled = disabled;
          }
          if (item.active && this.isOpen) {
            this.setScroll(whichList, i, justScroll);
          }
        }
      );
    }
  }

  setScroll(whichList, index, justScroll?) {
    const scroll = (24 + 8) * index;
    const duration = justScroll ? 0 : 150;
    this.scrollTo(this.timePicker.nativeElement.querySelector(`.devui-${whichList}-list`), scroll, duration);
  }

  scrollTo(element: HTMLElement, to: number, duration: number): void {
    if (duration <= 0) {
      element.scrollTop = to;
      return;
    }
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;
    const reqAnimFrame = window['webkitRequestAnimationFrame'] ||
      window['mozRequestAnimationFrame'] ||
      window['msRequestAnimationFrame'] ||
      window['oRequestAnimationFrame'];
    reqAnimFrame(() => {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) {
        return;
      }
      this.scrollTo(element, to, duration - 10);
    });
  }

  animationEnd(event) {
    if (this.isOpen) {
      this.setTimeArr(true);
      document.addEventListener('click', this.onDocumentClick);
    } else {
      if (this.timePicker && this.timePicker.nativeElement) {
        this.timePicker.nativeElement.classList.remove(`devui-dropdown-cdk-top`);
        this.timePicker.nativeElement.classList.remove(`devui-dropdown-cdk-bottom`);
      }
      document.removeEventListener('click', this.onDocumentClick);
    }
  }

  setCurrent(which, current?) {
    const timeArr = current ? current.split(':') : this[which].split(':');
    this.correct.map((t, i) => {
      this[`_${which}${t}`] = timeArr[i];
    });
  }

  getCurrent(which) {
    const res = [];
    this.correct.map(t => {
      res.push(this[`_${which}${t}`]);
    });
    return res.join(':');
  }

  setFormatCurrent(which, current?) {
    const timeArr = current ? current.split(':') : this[which].split(':');
    this.format.split(':').map((t, i) => {
      switch (t) {
        case 'hh':
          this[`_${which}Hour`] = timeArr[i];
          break;
        case 'mm':
          this[`_${which}Min`] = timeArr[i];
          break;
        case 'ss':
          this[`_${which}Sec`] = timeArr[i];
          break;
      }
    });
  }

  getFormatCurrent(which) {
    const formatArr = this.format.split(':');
    const res = [];
    formatArr.map(t => {
      switch (t) {
        case 'hh':
          res.push(this[`_${which}Hour`]);
          break;
        case 'mm':
          res.push(this[`_${which}Min`]);
          break;
        case 'ss':
          res.push(this[`_${which}Sec`]);
          break;
      }
    });
    return res.join(':');
  }

  selectTime(timeObj?: TimeObj, noEmit?: boolean) {
    if (timeObj !== undefined) {
      const time = timeObj.time;
      const type = timeObj.type;
      const timeArr = time.split(':');
      const curType = typeof type === 'string' ? type : this.format.split(':')[type];
      let typeArr;
      if (!this.validateTime(time, curType)) {
        return;
      }
      if (typeof type === 'number') {
        typeArr = [this.format.split(':')[type]];
      } else if (typeof type === 'string') {
        typeArr = [type];
      } else if (!type) {
        typeArr = this.format.split(':');
      }
      typeArr.map((t, i) => {
        switch (t) {
          case 'hh':
            this._selectedTimeHour = unshiftString(timeArr[i], 2, '0');
            break;
          case 'mm':
            this._selectedTimeMin = unshiftString(timeArr[i], 2, '0');
            break;
          case 'ss':
            this._selectedTimeSec = unshiftString(timeArr[i], 2, '0');
            break;
        }
      });
    }
    this.writeValue();
    this.writeModelValue(this.selectedTimeFormat, noEmit);
  }

  chooseTime = (timeObj: TimeObj) => {
    this.selectTime(timeObj, true);
  }

  confirmTime = (timeObj?: TimeObj) => {
    this.selectTime(timeObj);
    this.hide();
  }

  clearAll = () => {
    if (this.disabled) {
      return;
    }
    this.writeValue(null);
    this.writeModelValue(null, true);
  }
}
