import {
  Component,
  Input,
  Output,
  forwardRef,
  ElementRef,
  Renderer2,
  EventEmitter,
  ChangeDetectorRef,
  SimpleChanges,
  OnChanges,
  OnInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatepickerComponent as SingleDatepickerComponent } from './datepicker.component';
import { DatePickerConfigService as DatePickerConfig } from './date-picker.config.service';
import { I18nService } from 'ng-devui/i18n';
import { SelectDateRangeChangeEventArgs, SelectDateRangeChangeReason } from './date-range-change-event-args.model';

export interface SimpleDate {
  year: number;
  month: number;
}

@Component({
  selector: 'd-datepicker-range-single',
  templateUrl: './single-date-range-picker.component.html',
  styleUrls: ['./single-date-range-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SingleDateRangePickerComponent),
    multi: true
  }]
})

export class SingleDateRangePickerComponent extends SingleDatepickerComponent implements OnChanges, OnInit {
  @Input() selectedRange: Date[] = Array(2);
  @Input() rangePicker = false;
  @Input() isAuxiliary = false;
  @Input() currentCalendars = Array(2);
  @Output() hoverOnDate = new EventEmitter<any>();
  @Output() rangeSelected = new EventEmitter<SelectDateRangeChangeEventArgs>();
  @Output() rangeSelecting = new EventEmitter<SelectDateRangeChangeEventArgs>();
  @Output() syncPickerPair = new EventEmitter<{}>();
  @Output() consolidateTime = new EventEmitter<any>();
  public rangeStart;
  public rangeEnd;
  public previewEnd;
  protected selectingRange: boolean;

  constructor(
    protected elementRef: ElementRef,
    protected renderer: Renderer2,
    protected datePickerConfig: DatePickerConfig,
    protected changeDetectorRef: ChangeDetectorRef,
    protected i18n: I18nService
  ) {
    super(elementRef, renderer, datePickerConfig, changeDetectorRef, i18n);
  }

  ngOnInit() {
    [this.rangeStart, this.rangeEnd] = this.selectedRange;
    if (!this.isAuxiliary && !this.rangeStart) {
      // 主面板，未选择开始日期的情况
      this.onSelectDateChanged();
      this.onDisplayWeeksChange();
      this.initDatePicker();
      this.setI18nText();
    } else if (this.isAuxiliary && !this.rangeEnd) {
      // 副面板，未选择结束日期的情况
      this.onSelectDateChanged();
      this.initDatePicker();
      this.onNextMonth('init');
      this.selectedDate = new Date(this.currentYear, this.currentMonth);
      this.setI18nText();

    } else if (!this.isAuxiliary && this.rangeStart) {
      // 主面板，已选择开始日期的情况
      this.selectedDate = this.rangeStart;
      super.ngOnInit();
    } else if (this.isAuxiliary && this.rangeEnd) {
      // 副面板，已选择结束日期的情况
      const rangeStart = this.convertDate(this.rangeStart);
      const rangeEnd = this.convertDate(this.rangeEnd);
      this.currentYear = rangeEnd.getFullYear();
      this.currentMonth = rangeEnd.getMonth();
      this.selectedDate = new Date(this.currentYear, this.currentMonth);
      super.ngOnInit();
      // 处理选择的日期范围开始和结束在同一个月的情况
      if (rangeStart && rangeEnd && rangeStart.getFullYear() === rangeEnd.getFullYear() &&
        rangeStart.getMonth() === rangeEnd.getMonth()) {
        this.onNextMonth('init');
      }
      this.selectedDate = new Date(this.currentYear, this.currentMonth);
    }
    this.notifyCalenderChange();
  }

  /*
  **  @param invocation:调用时机
  */
  onSelectDate($event, date, invocation?: any) {
    if ($event.stopPropagation) {
      $event.stopPropagation();
    }

    if (invocation !== 'init') {
      if (this.isDisabledDay(date)) {
        $event.preventDefault();
        return;
      }
      this.selectRange(date);
    }
  }

  emitHoverDate($event, date) {
    if (this.selectingRange) {
      this.hoverOnDate.emit(date);
    }
  }

  selectStart(date) {
    if (date) {
      this.rangeStart = this.convertDate(date);
    }
  }

  selectEnd(date) {
    if (date) {
      this.selectingRange = false;
      this.rangeEnd = this.convertDate(date);
      if (!!this.rangeStart && !!this.rangeEnd) {
        this.rangeChange(this.ensureRangeValueOrder([this.rangeStart, this.rangeEnd]));
      }
    }
  }

  convertDate(date) {
    return date ? this.dateConverter.parse(date, this.dateFormat, this.locale) : null;
  }

  selectRange(date, passive = false) {
    if (this.disabled) {
      return;
    }
    this.setTime(date);
    if (!this.rangeStart || (!!this.rangeStart && !!this.rangeEnd)) {
      this.rangeEnd = null;
      this.rangeStart = null;
      this.selectStart(date);
      this.selectingRange = true;
      if (!passive) {
        this.rangeSelecting.emit(this.rangeStart);
      }
    } else {
      this.selectEnd(date);
    }
  }

  rangeChange(range) {
    this.selectedRange = range;
    this.notifyValueChange(range);
  }

  writeValue(selectedRange: any): void {
    this.selectedRange = selectedRange;
  }

  protected notifyValueChange(selectedRange: Date[]) {
    this.onChange(selectedRange);
    this.rangeSelected.emit({
      reason: SelectDateRangeChangeReason.time,
      selectedRange: selectedRange
    });
  }

  isSelectDay(date) {
    let rangeSource = this.selectedRange;
    if (this.selectingRange) {
      rangeSource = [this.rangeStart, this.previewEnd];
    }
    return rangeSource.some((selectedDate) => {
      if (!selectedDate || !date) {
        return false;
      }
      return (
        date.getFullYear() === selectedDate.getFullYear() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getDate() === selectedDate.getDate()
      );
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('selectedRange')) {
      this.selectingRange = false;
      [this.rangeStart, this.rangeEnd] = changes['selectedRange'].currentValue;
    }
  }

  isInRange(date) {
    const rangeStart = this.rangeStart;
    let rangeEnd = this.rangeEnd;
    if (this.selectingRange) {
      rangeEnd = this.previewEnd;
    }
    date = (new Date(date)).getTime();
    return date < Math.max((new Date(rangeStart)).getTime(), (new Date(rangeEnd)).getTime())
      && date > Math.min((new Date(rangeStart)).getTime(), (new Date(rangeEnd)).getTime());
  }

  ensureRangeValueOrder(dateRange) {
    if (Array.isArray(dateRange) && dateRange.length === 2) {
      dateRange.sort((a, b) => {
        return (new Date(a)).getTime() - (new Date(b).getTime());
      });
    }
    return dateRange;
  }

  onNextMonth(invocation?: any) {
    if (this.hasNextMonth() || invocation === 'init') {
      let maxDateInRange;
      if (invocation === 'init') {
        maxDateInRange = this.selectedRange.reduce((start, end) => new Date(end) > new Date(start) ? end : start);
      }
      super.onNextMonth(maxDateInRange, 'init');
      this.notifyCalenderChange();
    }
  }

  hasNextMonth() {
    let hasNextMonth = true;
    // 副面板只用考虑maxDate的影响
    // 主面板同时考虑maxDate和日历的影响
    // minDate的影响在super.hasNextMonth()中有计算
    if (!this.isAuxiliary && this.currentCalendars[0] && this.currentCalendars[1]) {
      hasNextMonth = this.isBeforeMoreThanOneMonth(this.currentCalendars[0], this.currentCalendars[1]);
    }

    return hasNextMonth && super.hasNextMonth();
  }

  onPreMonth() {
    if (this.hasPreMonth()) {
      super.onPreMonth();
      this.notifyCalenderChange();
    }
  }

  hasPreMonth() {
    let hasPrevMonth = true;
    // 主面板只用考虑minDate的影响
    // 副面板同时考虑minDate和日历的影响
    // minDate的影响在super.hasPreMonth()中有计算
    if (this.isAuxiliary && this.currentCalendars[0] && this.currentCalendars[1]) {
      hasPrevMonth = this.isAfterMoreThanOneMonth(this.currentCalendars[1], this.currentCalendars[0]);
    }

    return hasPrevMonth && super.hasPreMonth();
  }

  hasPreYearOption() {
    let hasPrevYear = true;
    if (this.currentCalendars[0] && this.currentCalendars[1]) {
      // 主面板只用考虑minDate的影响
      if (!this.isAuxiliary) {
        hasPrevYear = this.currentCalendars[0].year > this.minDate.getFullYear();
      } else { // 副面板同时考虑minDate和日历的影响
        hasPrevYear = this.currentCalendars[1].year > this.minDate.getFullYear() &&
          this.isBeforeMoreThanOneYear(this.currentCalendars[0], this.currentCalendars[1]);
      }
    }
    return hasPrevYear;
  }

  hasNextYearOption() {
    let hasNextYear = true;
    if (this.currentCalendars[0] && this.currentCalendars[1]) {
      // 副面板只用考虑maxDate的影响
      if (this.isAuxiliary) {
        hasNextYear = this.currentCalendars[1].year < this.maxDate.getFullYear();
      } else { // 主面板同时考虑maxDate和日历的影响
        hasNextYear = this.currentCalendars[0].year < this.maxDate.getFullYear() &&
          this.isAfterMoreThanOneYear(this.currentCalendars[1], this.currentCalendars[0]);
      }
    }
    return hasNextYear;
  }

  onPreYear() {
    if (this.hasPreYearOption()) {
      this.onSelectYear(this.currentYear - 1);
      this.notifyCalenderChange();
    }
  }

  onNextYear() {
    if (this.hasNextYearOption()) {
      this.onSelectYear(this.currentYear + 1);
      this.notifyCalenderChange();
    }
  }

  isBeforeMoreThanOneMonth(dateA: SimpleDate, dateB: SimpleDate) {
    if (dateA.year > dateB.year) {
      return false;
    }

    if (dateA.year === dateB.year && dateB.month <= dateA.month + 1) {
      return false;
    }

    // 处理A日期为B日期前一年12月同时B日期为1月的特殊情况
    return !(dateB.year - dateA.year === 1 && dateA.month === 11 && dateB.month === 0);
  }

  isAfterMoreThanOneMonth(dateA: SimpleDate, dateB: SimpleDate) {
    if (dateA.year < dateB.year) {
      return false;
    }

    if (dateA.year === dateB.year && dateB.month + 1 >= dateA.month) {
      return false;
    }

    // 处理A日期为B日期后一年1月同时B日期为12月的特殊情况
    return !(dateA.year - dateB.year === 1 && dateA.month === 0 && dateB.month === 11);
  }

  isBeforeMoreThanOneYear(dateA: SimpleDate, dateB: SimpleDate) {
    if (dateA.year >= dateB.year) {
      return false;
    }

    // 处理B日期比A日期大1年同时A日期月份大于B日期月份的情况
    return !(dateB.year - dateA.year === 1 && dateA.month >= dateB.month);
  }

  isAfterMoreThanOneYear(dateA: SimpleDate, dateB: SimpleDate) {
    if (dateA.year <= dateB.year) {
      return false;
    }

    // 处理A日期比B日期大1年同时A日期月份小于B日期月份的情况
    return (!(dateA.year - dateB.year === 1 && dateA.month <= dateB.month));
  }

  protected notifyCalenderChange() {
    this.syncPickerPair.emit({
      year: this.currentYear,
      month: this.currentMonth
    });
  }

  confirmTime() {
    this.consolidateTime.emit();
  }

  private setTime(date: any) {
    this.currentHour = this.showTime && date ? date.getHours() : 0;
    this.currentMinute = this.showTime && date ? date.getMinutes() : 0;
    this.currentSecond = this.showTime && date ? date.getSeconds() : 0;
  }

  protected onSelectDateChanged() {
    let date = this.selectedDate || new Date();
    if (date.getTime() < this.minDate.getTime()) {
      date = this.minDate;
    }
    if (date.getTime() > this.maxDate.getTime()) {
      date = this.maxDate;
    }
    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth();
    if (!this.showTime) { return; }
    switch (this.isAuxiliary) {
      case false:
        // Left panel
        this.currentHour = this.rangeStart ? this.rangeStart.getHours() : 0;
        this.currentMinute = this.rangeStart ? this.rangeStart.getMinutes() : 0;
        this.currentSecond = this.rangeStart ? this.rangeStart.getSeconds() : 0;
        break;
      case true:
        // Right panel
        this.currentHour = this.rangeEnd ? this.rangeEnd.getHours() : 0;
        this.currentMinute = this.rangeEnd ? this.rangeEnd.getMinutes() : 0;
        this.currentSecond = this.rangeEnd ? this.rangeEnd.getSeconds() : 0;
        break;
    }
  }

  get currentTime () {
    return {
      hour: this.currentHour,
      minute: this.currentMinute,
      second: this.currentSecond
    };
  }
}
