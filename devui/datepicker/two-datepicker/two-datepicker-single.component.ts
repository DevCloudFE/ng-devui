import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { I18nService } from 'ng-devui/i18n';
import { DatePickerConfigService as DatePickerConfig } from '../date-picker.config.service';
import { SelectDateRangeChangeEventArgs, SelectDateRangeChangeReason } from '../date-range-change-event-args.model';
import { DatepickerComponent as SingleDatepickerComponent } from '../datepicker.component';
import { SimpleDate } from '../single-date-range-picker.component';

@Component({
  selector: 'd-two-datepicker-single',
  templateUrl: '../single-date-range-picker.component.html',
  styleUrls: ['../single-date-range-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TwoDatepickerSingleComponent),
      multi: true,
    },
  ],
})
export class TwoDatepickerSingleComponent extends SingleDatepickerComponent implements OnChanges, OnInit {
  @Input() selectedRange: Date[] = Array(2);
  @Input() rangePicker = false;
  @Input() isAuxiliary = false;
  @Input() currentCalendars = Array(2);
  @Input() whichOpen: any;
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
    this.setI18nText();
  }

  ngOnInit() {
    [this.rangeStart, this.rangeEnd] = this.selectedRange;
    if (!this.isAuxiliary && !this.rangeStart) {
      // 主面板，未选择开始日期的情况
      this.onSelectDateChanged();
      this.onDisplayWeeksChange();
      this.initDatePicker();
    } else if (this.isAuxiliary && !this.rangeEnd) {
      // 副面板，未选择结束日期的情况
      this.onSelectDateChanged();
      this.initDatePicker();
      this.onNextMonth('init');
      this.selectedDate = new Date(this.currentYear, this.currentMonthIndex);
    } else if (!this.isAuxiliary && this.rangeStart) {
      // 主面板，已选择开始日期的情况
      this.selectedDate = this.rangeStart;
      super.ngOnInit();
    } else if (this.isAuxiliary && this.rangeEnd) {
      // 副面板，已选择结束日期的情况
      const rangeStart = this.convertDate(this.rangeStart);
      const rangeEnd = this.convertDate(this.rangeEnd);
      this.currentYear = rangeEnd.getFullYear();
      this.currentMonthIndex = rangeEnd.getMonth();
      this.selectedDate = this.rangeEnd;
      super.ngOnInit();
      // 处理选择的日期范围开始和结束在同一个月的情况
      if (rangeStart && rangeEnd && rangeStart.getFullYear() === rangeEnd.getFullYear() && rangeStart.getMonth() === rangeEnd.getMonth()) {
        this.onNextMonth('init');
      }
      this.selectedDate = new Date(this.currentYear, this.currentMonthIndex);
    }
    if (!this.selectedRange.every((curDate) => !!curDate)) {
      this.selectingRange = true;
    }
    this.availableMonths = this.onDisplayMonthsChange();
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
    if (this.selectingRange && date.getTime() <= this.maxDate.getTime() && date.getTime() >= this.minDate.getTime()) {
      this.hoverOnDate.emit(date);
    }
  }

  selectSingle(date) {
    if (date) {
      const ensureRange = this.ensureRangeValueOrder([this.rangeStart, this.rangeEnd]);
      this.rangeChange(ensureRange);
    }
  }

  convertDate(date) {
    return date ? this.dateConverter.parse(date) : null;
  }

  selectRange(date, passive = false) {
    if (this.whichOpen === 'start') {
      if (!this.rangeEnd) {
        this.rangeEnd = null;
        this.selectingRange = true;
      } else {
        this.selectingRange = false;
      }
      if (!passive) {
        this.rangeStart = this.convertDate(date);
        this.selectSingle(date);
        this.rangeSelecting.emit(this.rangeStart);
      }
    } else if (this.whichOpen === 'end') {
      if ((this.rangeStart && this.rangeEnd) || (!this.rangeStart && !this.rangeEnd)) {
        this.selectingRange = false;
      } else {
        this.selectingRange = true;
        if (!this.rangeStart) {
          this.rangeStart = null;
        }
        if (!this.rangeEnd) {
          this.rangeEnd = null;
        }
      }
      if (!passive) {
        this.rangeEnd = this.convertDate(date);
        this.selectSingle(date);
        this.rangeSelecting.emit(this.rangeEnd);
      }
    }
  }

  rangeChange(range) {
    [this.rangeStart, this.rangeEnd] = this.selectedRange = range;
    this.notifyValueChange(range);
  }

  writeValue(selectedRange: any): void {
    this.selectedRange = selectedRange;
  }

  protected notifyValueChange(selectedRange: Date[]) {
    this.onChange(selectedRange);
    this.rangeSelected.emit({
      reason: SelectDateRangeChangeReason.date,
      selectedRange: selectedRange,
    });
  }

  isSelectDay(date) {
    let rangeSource = this.selectedRange;
    if (this.selectingRange) {
      rangeSource = [this.rangeStart || this.rangeEnd, this.previewEnd];
    }
    if (!Array.isArray(rangeSource)) {
      return;
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

  isBetweenDay(date) {
    if (Array.isArray(this.selectedRange) && this.selectedRange.every((day) => !!day)) {
      const index = this.selectedRange.findIndex((day) => {
        return date.getFullYear() === day.getFullYear() && date.getMonth() === day.getMonth() && date.getDate() === day.getDate();
      });
      return ['devui-day-start', 'devui-day-end'][index];
    } else {
      return;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (Object.prototype.hasOwnProperty.call(changes, 'selectedRange')) {
      [this.rangeStart, this.rangeEnd] = changes.selectedRange.currentValue;
      if (this.rangeStart && this.rangeEnd) {
        this.selectingRange = false;
      }
    }
  }

  isInRange(dateParam) {
    let date = dateParam;
    let rangeStart = this.rangeStart;
    let rangeEnd = this.rangeEnd;
    if (this.selectingRange) {
      if (rangeEnd) {
        rangeStart = this.previewEnd;
      } else if (rangeStart) {
        rangeEnd = this.previewEnd;
      }
    }
    date = new Date(date).getTime();
    return (
      date < Math.max(new Date(rangeStart).getTime(), new Date(rangeEnd).getTime()) &&
      date > Math.min(new Date(rangeStart).getTime(), new Date(rangeEnd).getTime())
    );
  }

  ensureRangeValueOrder(dateRange) {
    if (Array.isArray(dateRange) && dateRange.length === 2 && dateRange.every((curDate) => !!curDate)) {
      if (dateRange[0].getTime() > dateRange[1].getTime()) {
        if (this.whichOpen === 'start') {
          return [dateRange[0], null];
        } else {
          return [null, dateRange[1]];
        }
      }
    }
    return dateRange;
  }

  onNextMonth(invocation?: any) {
    if (this.hasNextMonth() || invocation === 'init') {
      let maxDateInRange;
      if (invocation === 'init') {
        maxDateInRange = this.selectedRange.reduce((start, end) => (new Date(end) > new Date(start) ? end : start));
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
    if (this.openChooseYear) {
      if (!this.isAuxiliary) {
        hasPrevYear = this.nowMinYear > this.minDate.getFullYear();
      } else {
        hasPrevYear =
          this.nowMinYear > this.minDate.getFullYear() &&
          this.isBeforeMoreThanOneYear(this.currentCalendars[0], { year: this.nowMinYear, month: this.currentCalendars[1].month });
      }
    } else if (this.currentCalendars[0] && this.currentCalendars[1]) {
      // 主面板只用考虑minDate的影响
      if (!this.isAuxiliary) {
        hasPrevYear = this.currentCalendars[0].year > this.minDate.getFullYear();
      } else {
        // 副面板同时考虑minDate和日历的影响
        hasPrevYear =
          this.currentCalendars[1].year > this.minDate.getFullYear() &&
          this.isBeforeMoreThanOneYear(this.currentCalendars[0], this.currentCalendars[1]);
      }
    }
    return hasPrevYear;
  }

  hasNextYearOption() {
    let hasNextYear = true;
    if (this.openChooseYear) {
      if (this.isAuxiliary) {
        hasNextYear = this.nowMaxYear < this.maxDate.getFullYear();
      } else {
        hasNextYear =
          this.nowMaxYear < this.maxDate.getFullYear() &&
          this.isAfterMoreThanOneYear(this.currentCalendars[1], { year: this.nowMaxYear, month: this.currentCalendars[0].month });
      }
    } else if (this.currentCalendars[0] && this.currentCalendars[1]) {
      // 副面板只用考虑maxDate的影响
      if (this.isAuxiliary) {
        hasNextYear = this.currentCalendars[1].year < this.maxDate.getFullYear();
      } else {
        // 主面板同时考虑maxDate和日历的影响
        hasNextYear =
          this.currentCalendars[0].year < this.maxDate.getFullYear() &&
          this.isAfterMoreThanOneYear(this.currentCalendars[1], this.currentCalendars[0]);
      }
    }
    return hasNextYear;
  }

  onPreYear() {
    if (!this.hasPreYearOption()) {
      return;
    }
    if (this.openChooseYear) {
      if (this.nowMinYear - this._yearNumber >= this.minDate.getFullYear()) {
        this.nowMaxYear = this.nowMinYear - 1;
        this.nowMinYear = this.nowMinYear - this._yearNumber;
      } else {
        this.nowMaxYear = this.nowMinYear - 1;
        this.nowMinYear = this.minDate.getFullYear();
      }
      this.onYearRangeChange();
    } else {
      this.onSelectYear(Number(this.currentYear) - 1);
    }
    this.notifyCalenderChange();
  }

  onNextYear() {
    if (!this.hasNextYearOption()) {
      return;
    }
    if (this.openChooseYear) {
      if (this.nowMaxYear + this._yearNumber <= this.maxDate.getFullYear()) {
        this.nowMinYear = this.nowMaxYear + 1;
        this.nowMaxYear = this.nowMaxYear + this._yearNumber;
      } else {
        this.nowMinYear = this.nowMaxYear + 1;
        this.nowMaxYear = this.maxDate.getFullYear();
      }
      this.onYearRangeChange();
    } else {
      this.onSelectYear(Number(this.currentYear) + 1);
    }
    this.notifyCalenderChange();
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
    return !(dateA.year - dateB.year === 1 && dateA.month <= dateB.month);
  }

  isYearDisable(year: number): boolean {
    if (this.isAuxiliary) {
      // 先判定主面板是否比附面板小一年以上，是的话disabled为false;
      return !(
        this.isBeforeMoreThanOneYear(this.currentCalendars[0], { year: year + 1, month: this.currentCalendars[1].month }) ||
        // 主附面板在同一年时，判断主附面板月是否在临界值；
        (this.currentCalendars[0].year === year && this.currentCalendars[0].month !== 11)
      );
    } else {
      return !(
        this.isAfterMoreThanOneYear(this.currentCalendars[1], { year: year - 1, month: this.currentCalendars[0].month }) ||
        (this.currentCalendars[1].year === year && this.currentCalendars[1].month !== 0)
      );
    }
  }

  isMonthDisable(month: string): boolean {
    if (this.isAuxiliary) {
      return !this.isBeforeMoreThanOneMonth(this.currentCalendars[0], {
        year: this.currentCalendars[1].year,
        month: parseInt(month, 10) - 1 + 1,
      });
    } else {
      return !this.isAfterMoreThanOneMonth(this.currentCalendars[1], {
        year: this.currentCalendars[0].year,
        month: parseInt(month, 10) - 1 - 1,
      });
    }
  }

  onSelectMonth(month) {
    if (month.disabled || this.isMonthDisable(month.title)) {
      return;
    }
    this.currentMonthIndex = month.index;
    this.onDisplayWeeksChange();
    this.openChooseMonth = false;
    this.isAuxiliary
      ? (this.currentCalendars[1].month = this.currentMonthIndex)
      : (this.currentCalendars[0].month = this.currentMonthIndex);
  }

  onSelectYear(year, $event?: Event) {
    if ($event) {
      $event.stopPropagation();
    }
    const yearDisabled = typeof year === 'object' ? year.disabled : false;
    const yearTitle = typeof year === 'object' ? year.title : year;
    if (yearDisabled || this.isYearDisable(year.title)) {
      return;
    }
    this.currentYear = yearTitle;
    this.onDisplayWeeksChange();
    this.availableMonths = this.onDisplayMonthsChange();
    this.openChooseYear = false;
    if (!$event) {
      this.isAuxiliary ? (this.currentCalendars[1].year = this.currentYear) : (this.currentCalendars[0].year = this.currentYear);
      return;
    }
    this.openChooseMonth = true;
    if (this.isAuxiliary) {
      this.currentCalendars[1].year = this.currentYear;
      this.currentCalendars[1].month = 11;
      this.currentMonthIndex = 11;
    } else {
      this.currentCalendars[0].year = this.currentYear;
      this.currentCalendars[0].month = 0;
      this.currentMonthIndex = 0;
    }
  }

  protected notifyCalenderChange() {
    this.syncPickerPair.emit({
      year: this.currentYear,
      month: this.currentMonthIndex,
    });
  }

  confirmTime() {
    this.consolidateTime.emit();
  }

  protected onSelectDateChanged() {
    let date = this.selectedDate || new Date();
    if (date.getTime() < this.minDate.getTime()) {
      date = this.minDate;
    }
    if (date.getTime() > this.maxDate.getTime()) {
      date = this.maxDate;
    }
    if (!this.isAuxiliary && this.rangeEnd && !this.rangeStart) {
      date = new Date(this.rangeEnd);
      date.setMonth(date.getMonth() - 1);
    }
    this.selectedDate = this.selectedDate || date;
    this.currentYear = date.getFullYear();
    this.currentMonthIndex = date.getMonth();
  }
}
