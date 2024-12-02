import { CdkOverlayOrigin, ConnectedOverlayPositionChange, VerticalConnectionPos } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { DateConverter, DefaultDateConverter, DevConfigService, WithConfig, fadeInOut } from 'ng-devui/utils';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { DatePickerConfigService as DatePickerConfig } from '../date-picker.config.service';

@Component({
  /* eslint-disable-next-line @angular-eslint/component-selector*/
  selector: '[dTwoDatePicker]',
  exportAs: 'twoDatePicker',
  templateUrl: 'two-datepicker.component.html',
  styleUrls: ['./two-datepicker.component.scss'],
  animations: [fadeInOut],
})
export class TwoDatePickerComponent implements OnInit, OnDestroy {
  @Input() locale: string;
  @Input() cssClass: string;
  @Input() disabled: boolean;
  @Input() dateConverter: DateConverter;
  @Input() @WithConfig() showAnimation = true;
  showTime = false;
  selectedRange = [null, null];
  @Input() hideOnRangeSelected = true;
  customViewTemplate: TemplateRef<any>;
  @Output() selectedRangeChange = new EventEmitter<any>();
  @ViewChild('leftPicker') leftPicker: ElementRef;
  @ViewChild('rightPicker') rightPicker: ElementRef;
  @ViewChild('templateWrap') templateWrap: ElementRef;

  datePosition: VerticalConnectionPos = 'bottom';
  selectDateSubject = new Subject<{ side: string; date: Date; onlyWrite?: boolean }>();
  hoverOnDate: Subject<object> = new Subject<object>();
  switchOriginPositionSub: Subject<'start' | 'end' | false> = new Subject<'start' | 'end' | false>();
  today = new Date();
  rangeStart;
  rangeEnd;
  disableToday;
  i18nText: I18nInterface['datePicker'];
  i18nLocale: I18nInterface['locale'];
  i18nSubscription: Subscription;
  startAnimation = false;

  public currentCalendars = [null, null];
  public cdkConnectedOverlayOrigin: CdkOverlayOrigin;
  private _isOpen = false;
  private _whichOpen: 'start' | 'end' | false;
  private _dateConfig: any;
  private _dateFormat: string;
  private _maxDate: Date;
  private _minDate: Date;
  document: Document;
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
    return this._dateFormat || this.datePickerConfig.defaultFormat;
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
  set whichOpen(side: 'start' | 'end' | false) {
    this._whichOpen = side;
    this.switchOriginPositionSub.next(side);
  }
  get whichOpen() {
    return this._whichOpen;
  }
  set isOpen(isOpen: boolean) {
    this._isOpen = isOpen;
    if (!isOpen) {
      this.startAnimation = false;
      this.document.removeEventListener('click', this.onDocumentClick);
    } else {
      setTimeout(() => {
        this.startAnimation = true;
        this.cdr.detectChanges();
        this.document.addEventListener('click', this.onDocumentClick);
      });
    }
  }
  get isOpen() {
    return this._isOpen;
  }

  constructor(
    public el: ElementRef,
    protected datePickerConfig: DatePickerConfig,
    private i18n: I18nService,
    private cdr: ChangeDetectorRef,
    private devConfigService: DevConfigService,
    @Inject(DOCUMENT) private doc: any
  ) {
    this._dateConfig = datePickerConfig.dateConfig;
    this.dateConverter = datePickerConfig.dateConfig.dateConverter || new DefaultDateConverter();
    this.setI18nText();
    this.document = this.doc;
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

  onDocumentClick = ($event) => {
    if (!this.el.nativeElement.contains($event.target)) {
      this.whichOpen = false;
      this.isOpen = false;
    }
    this.cdr.markForCheck();
  };

  ngOnInit() {
    this._minDate = this.minDate ? new Date(this.minDate) : new Date(this.dateConfig.min, 0, 1, 0, 0, 0);
    this._maxDate = this.maxDate ? new Date(this.maxDate) : new Date(this.dateConfig.max, 11, 31, 23, 59, 59);
    this.updateCdkConnectedOverlayOrigin(this.el.nativeElement);
    this.subscribeHoverActions();
  }

  isDisableToday() {
    if (this.minDate.getTime() >= this.today.getTime() || this.maxDate.getTime() <= this.today.getTime()) {
      this.disableToday = true;
    } else {
      this.disableToday = false;
    }
  }

  toggle = (side: 'start' | 'end' = 'start') => {
    if (this.isOpen) {
      if (side === 'start') {
        if (this.whichOpen === 'start') {
          this.whichOpen = false;
          this.isOpen = false;
        } else {
          // this.whichOpen === 'end'
          this.whichOpen = 'start';
        }
      } else {
        // side === 'end'
        if (this.whichOpen === 'start') {
          this.whichOpen = 'end';
        } else {
          // this.whichOpen === 'end'
          this.whichOpen = false;
          this.isOpen = false;
        }
      }
    } else {
      this.whichOpen = side;
      this.isOpen = true;
    }
  };

  onPositionChange(position: ConnectedOverlayPositionChange) {
    switch (position.connectionPair.overlayY) {
    case 'top':
    case 'center':
      this.datePosition = 'bottom';
      break;
    case 'bottom':
      this.datePosition = 'top';
      break;
    default:
    }
    this.switchOriginPositionSub.next(this.whichOpen);
  }

  convertDate(date) {
    return date ? this.dateConverter.parse(date, this.dateFormat) : null;
  }

  formatDate(date) {
    return date ? this.dateConverter.format(date, this.dateFormat, this.locale || this.i18nLocale) : null;
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
    default:
    }
  }

  rangeChange(data) {
    this.chooseDate(data.selectedRange);
    this.selectDateSubject.next({ side: 'start', date: this.rangeStart, onlyWrite: true });
    this.selectDateSubject.next({ side: 'end', date: this.rangeEnd, onlyWrite: true });
  }

  chooseDate = (range) => {
    if (range && Array.isArray(this.selectedRange)) {
      this.selectedRange = range;
      [this.rangeStart, this.rangeEnd] = this.selectedRange;
      this.notifyValueChange();
    }
  };

  notifyValueChange() {
    this.selectedRangeChange.emit(this.selectedRange);
  }

  selectingDate(event) {
    this.hoverOnDate.next(event);
  }

  subscribeHoverActions() {
    this.hoverOnDate.pipe(distinctUntilChanged()).subscribe((date) => {
      this.previewRangeEnd(date);
    });
  }

  previewRangeEnd(date) {
    (this.leftPicker as any).previewEnd = date;
    (this.rightPicker as any).previewEnd = date;
  }

  syncRangeStart(rangeStart, picker: any) {
    if (this.whichOpen === 'end') {
      this.selectEnd(rangeStart);
    } else {
      // this.whichOpen === 'start'
      this.selectStart(rangeStart);
    }
    picker.selectRange(rangeStart, true);
  }

  selectStart(date: Date, passive = false) {
    this.selectedRange[0] = date;
    this.rangeStart = date;
    this.isDisableToday();
    if (!passive) {
      this.selectDateSubject.next({ side: 'start', date });
      this.whichOpen = 'end';
    }
  }

  selectEnd(date: Date, passive = false) {
    this.selectedRange[1] = date;
    this.rangeEnd = date;
    this.isDisableToday();
    if (!passive) {
      this.selectDateSubject.next({ side: 'end', date: date });
      if (!this.showTime && this.hideOnRangeSelected) {
        this.isOpen = false;
        this.whichOpen = false;
      }
    }
  }

  chooseToday(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.minDate.getTime() <= this.today.getTime() && this.maxDate.getTime() >= this.today.getTime()) {
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

  clear = (side: 'start' | 'end') => {
    if (this.disabled) {
      return;
    }
    if (side === 'start') {
      this.selectStart(null);
    } else if (side === 'end') {
      this.selectEnd(null);
    }
    [this.rangeStart, this.rangeEnd] = this.selectedRange;
  };

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
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
    this.document.removeEventListener('click', this.onDocumentClick);
  }
}
