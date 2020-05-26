import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  TemplateRef,
  ViewChild,
  Input,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';
import { CdkOverlayOrigin, ConnectedOverlayPositionChange, VerticalConnectionPos } from '@angular/cdk/overlay';
import { cornerFadeInOut } from 'ng-devui/utils';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { DatePickerConfigService as DatePickerConfig } from '../date-picker.config.service';
import { I18nService, I18nInterface } from 'ng-devui/i18n';
import { DateConverter } from 'ng-devui/utils';
import { DefaultDateConverter } from 'ng-devui/utils';

@Component({
  selector: '[dTwoDatePicker]',
  exportAs: 'twoDatePicker',
  templateUrl: 'two-datepicker.component.html',
  styleUrls: ['./two-datepicker.component.scss'],
  animations: [
    cornerFadeInOut
  ]
})
export class TwoDatePickerComponent implements OnInit, OnDestroy {
  @Input() locale: string;
  @Input() cssClass: string;
  @Input() disabled: boolean;
  @Input() dateConverter: DateConverter;
  showTime = false;
  @Input() selectedRange = [null, null];
  @Input() hideOnRangeSelected = true;
  customViewTemplate: TemplateRef<any>;
  @Output() selectRange = new EventEmitter<any>();
  @ViewChild('leftPicker') leftPicker: ElementRef;
  @ViewChild('rightPicker') rightPicker: ElementRef;
  @ViewChild('templateWrap') templateWrap: ElementRef;

  datePosition: VerticalConnectionPos = 'bottom';
  selectDateSubject = new Subject<{side: String, date: Date, onlyWrite?: Boolean}>();
  hoverOnDate: Subject<object> = new Subject<object>();
  switchOpenSub: Subject<'start'|'end'|false> = new Subject<'start'|'end'|false>();
  today = new Date();
  rangeStart;
  rangeEnd;
  disableToday;
  i18nText: I18nInterface['datePicker'];
  i18nLocale: I18nInterface['locale'];
  i18nSubscription: Subscription;
  datepickerPosition: VerticalConnectionPos = 'bottom';

  public currentCalendars = [null, null];
  public cdkConnectedOverlayOrigin: CdkOverlayOrigin;
  public isOpen = false;
  private startOpen = false;
  private endOpen = false;
  private _whichOpen: 'start'|'end'|false;
  private _dateConfig: any;
  private _dateFormat: string;
  private _maxDate: Date;
  private _minDate: Date;
  private onChange = (_: any) => null;

  constructor(public el: ElementRef, protected datePickerConfig: DatePickerConfig, private i18n: I18nService) {
    this._dateConfig = datePickerConfig['dateConfig'];
    this.dateConverter = datePickerConfig['dateConfig'].dateConverter || new DefaultDateConverter();
  }

  @Input() set dateConfig(dateConfig: any) {
    if (dateConfig) {
      this._dateConfig = dateConfig;
      this._dateFormat = this.showTime ? dateConfig.format.time : dateConfig.format.date;
    } else {
      this._dateConfig = this.datePickerConfig.dateConfig;
    }
  }
  @Input() set dateFormat(dateFormat: string) {
    if (this._dateFormat !== dateFormat) {
      this._dateFormat = dateFormat;
    }
  }
  set maxDate(date: Date | any) {
    const parseDate = this.convertDate(date);
    if (parseDate) {
      this._maxDate = parseDate;
    }
  }
  set minDate(date: Date | any) {
    const parseDate = this.convertDate(date);
    if (parseDate) {
      this._minDate = parseDate;
    }
  }
  set whichOpen(side: 'start'|'end'|false) {
    this._whichOpen = side;
    this.switchOpenSub.next(side);
  }

  get dateConfig() {
    return this._dateConfig;
  }
  get dateFormat() {
    return this._dateFormat;
  }
  get maxDate() {
    return this._maxDate;
  }
  get minDate() {
    return this._minDate;
  }
  get whichOpen() {
    return this._whichOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick($event) {
    if (this.el.nativeElement !== $event.target) {
      this.isOpen = false;
      this.startOpen = false;
      this.endOpen = false;
      this.whichOpen = false;
    }
  }

  ngOnInit() {
    this._minDate = this.minDate ? new Date(this.minDate) : new Date(this.dateConfig.min, 0, 1, 0, 0, 0);
    this._maxDate = this.maxDate ? new Date(this.maxDate) : new Date(this.dateConfig.max, 11, 31, 23, 59, 59);
    this.setI18nText();
    this.updateCdkConnectedOverlayOrigin(this.el.nativeElement);
    this.subscribeHoverActions();
  }

  isDisableToday() {
    if ((this.minDate.getTime() >= (this.today).getTime()) || (this.maxDate.getTime() <= (this.today).getTime())) {
      this.disableToday = true;
    } else {
      this.disableToday = false;
    }
  }

  toggle(event, side: 'start'|'end') {
    event.stopPropagation();
    if (this.isOpen) {
      if (side === 'start') {
        if (this.startOpen) {
          this.startOpen = false;
          this.isOpen = false;
          this.whichOpen = false;
        } else if (this.endOpen) {
          this.startOpen = true;
          this.whichOpen = 'start';
        }
        this.endOpen = false;
      } else if (side === 'end') {
        if (this.startOpen) {
          this.endOpen = true;
          this.whichOpen = 'end';
        } else if (this.endOpen) {
          this.endOpen = false;
          this.isOpen = false;
          this.whichOpen = false;
        }
        this.startOpen = false;
      }
    } else {
      this.startOpen = side === 'start' ? true : false;
      this.endOpen = side === 'end' ? true : false;
      this.isOpen = true;
      this.whichOpen = side;
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange) {
    switch (position.connectionPair.overlayY) {
      case 'top':
      case 'center':
        this.datePosition = 'bottom';
      break;
      case 'bottom':
        this.datePosition = 'top';
    }
  }

  convertDate(date) {
    return date ?
      this.dateConverter.parse(date, this.dateFormat, this.locale || this.i18nLocale) : null;
  }

  formatDate(date) {
    return date ?
      this.dateConverter.format(date, this.dateFormat, this.locale || this.i18nLocale) : null;
  }

  updateCdkConnectedOverlayOrigin(el: ElementRef) {
    if (el) {
      this.cdkConnectedOverlayOrigin = new CdkOverlayOrigin(el);
    } else {
      this.cdkConnectedOverlayOrigin = undefined;
    }
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

  rangeChange(data) {
    this.chooseDate(data.selectedRange);
    this.selectDateSubject.next({side: 'start', date: this.rangeStart, onlyWrite: true});
    this.selectDateSubject.next({side: 'end', date: this.rangeEnd, onlyWrite: true});
  }

  chooseDate = (range) => {
    if (range) {
      this.selectedRange = range;
      if (Array.isArray(this.selectedRange)) {
        [this.rangeStart, this.rangeEnd] = this.selectedRange;
      }
    }
    this.notifyValueChange(range);
  }

  notifyValueChange(range) {
    this.onChange(range);
    this.selectRange.emit(this.selectedRange);
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
    if (this.whichOpen === 'end') {
      this.selectEnd(rangeStart);
    } else if (this.whichOpen === 'start') {
      this.selectStart(rangeStart);
    }
    picker.selectRange(rangeStart, true);
  }

  selectStart(date: Date) {
    this.selectDateSubject.next({side: 'start', date: date});
    this.whichOpen = 'end';
    this.startOpen = false;
    this.endOpen = true;
    this.selectedRange[0] = date;
    this.rangeStart = date;
    this.isDisableToday();
  }

  selectEnd(date: Date) {
    this.selectDateSubject.next({side: 'end', date: date});
    this.selectedRange[1] = date;
    this.rangeEnd = date;
    if (!this.showTime && this.hideOnRangeSelected) {
      this.isOpen = false;
      this.startOpen = false;
      this.endOpen = false;
      this.whichOpen = false;
    }
    this.isDisableToday();
  }

  chooseToday(event) {
    event.preventDefault();
    event.stopPropagation();
    if ((this.minDate.getTime() <= (this.today).getTime()) && (this.maxDate.getTime() >= (this.today).getTime())) {
      if (this.whichOpen === 'start') {
        this.selectStart(this.today);
      } else if (this.whichOpen === 'end') {
        this.selectEnd(this.today);
      }
      [this.rangeStart, this.rangeEnd] = this.selectedRange;
    }
  }

  clearBtn(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.whichOpen) {
      this.clear(this.whichOpen);
    }
  }

  clear = (side: 'start'|'end') => {
    if (side === 'start') {
      this.selectStart(null);
    } else if (side === 'end') {
      this.selectEnd(null);
    }
    [this.rangeStart, this.rangeEnd] = this.selectedRange;
  }

  setI18nText() {
    this.i18nText = this.i18n.getI18nText().datePicker;
    this.i18nLocale = this.i18n.getI18nText().locale;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.datePicker;
      this.i18nLocale = data.locale;
    });
  }

  ngOnDestroy() {
    this.isOpen = false;
    this.startOpen = false;
    this.endOpen = false;
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }
}
