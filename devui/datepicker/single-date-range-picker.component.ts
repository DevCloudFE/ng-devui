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
import { DatePickerConfigService as DatePickerConfig } from './date-picker.config.service';
import { SelectDateRangeChangeEventArgs, SelectDateRangeChangeReason } from './date-range-change-event-args.model';
import { DatepickerComponent as SingleDatepickerComponent } from './datepicker.component';

export interface SimpleDate {
  year: number;
  month: number;
}

@Component({
  selector: 'd-datepicker-range-single',
  templateUrl: './single-date-range-picker.component.html',
  styleUrls: ['./single-date-range-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleDateRangePickerComponent),
      multi: true,
    },
  ],
  preserveWhitespaces: false,
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
  private timer;
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
    const nowDate = this.selectedDate || new Date();
    this.nowMinYear =
      nowDate.getFullYear() - Math.floor(this._yearNumber / 2) < this.minDate.getFullYear()
        ? this.minDate.getFullYear()
        : nowDate.getFullYear() - Math.floor(this._yearNumber / 2);
    this.nowMaxYear =
      nowDate.getFullYear() + Math.floor(this._yearNumber / 2) > this.maxDate.getFullYear()
        ? this.maxDate.getFullYear()
        : nowDate.getFullYear() + Math.floor(this._yearNumber / 2);
    if (!this.isAuxiliary && !this.rangeStart) {
      // 主面板，未选择开始日期的情况
      this.onSelectDateChanged();
      this.onDisplayWeeksChange();
      this.onYearRangeChange();
      this.initDatePicker();
    } else if (this.isAuxiliary && !this.rangeEnd) {
      // 副面板，未选择结束日期的情况
      this.onSelectDateChanged();
      this.initDatePicker();
      this.onYearRangeChange();
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
      this.selectedDate = new Date(this.currentYear, this.currentMonthIndex);
      super.ngOnInit();
      // 处理选择的日期范围开始和结束在同一个月的情况
      if (rangeStart && rangeEnd && rangeStart.getFullYear() === rangeEnd.getFullYear() && rangeStart.getMonth() === rangeEnd.getMonth()) {
        this.onNextMonth('init');
      }
      this.selectedDate = new Date(this.currentYear, this.currentMonthIndex);
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
      const curDate = this.showTime && date ? this.setTime(date) : date;
      this.selectRange(curDate);
      this.selectedDate = this.isAuxiliary ? this.rangeEnd : this.rangeStart;
    }
  }

  emitHoverDate($event, date) {
    if (this.selectingRange && date.getTime() <= this.maxDate.getTime() && date.getTime() >= this.minDate.getTime()) {
      this.hoverOnDate.emit(date);
    }
  }

  selectStart(date) {
    this.rangeStart = new Date(this.convertDate(date).setHours(0, 0, 0));
  }

  selectEnd(date) {
    this.selectingRange = false;
    this.rangeEnd = new Date(this.convertDate(date).setHours(23, 59, 59));
    if (!!this.rangeStart && !!this.rangeEnd) {
      this.rangeChange(this.ensureRangeValueOrder([this.rangeStart, this.rangeEnd], true), SelectDateRangeChangeReason.date);
    }
  }

  convertDate(date) {
    return date ? this.dateConverter.parse(date) : null;
  }

  selectRange(date, passive = false) {
    if (this.disabled) {
      return;
    }
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

  rangeChange(range, reason?) {
    this.selectedRange = range;
    this.notifyValueChange(range, reason);
  }

  writeValue(selectedRange: any): void {
    this.selectedRange = selectedRange;
  }

  protected notifyValueChange(selectedRange: Date[], reason?) {
    const currentReason = typeof reason === 'number' ? reason : SelectDateRangeChangeReason.time;
    this.onChange(selectedRange);
    this.rangeSelected.emit({
      reason: currentReason,
      selectedRange: selectedRange,
    });
  }

  isSelectDay(date) {
    let rangeSource = this.selectedRange;
    if (this.selectingRange) {
      rangeSource = [this.rangeStart, this.previewEnd];
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

  isDisabledTime() {
    const selectedSide = this.isAuxiliary ? this.rangeEnd : this.rangeStart;
    return selectedSide ? super.isDisabledDay(selectedSide) : true;
  }

  timeUp(type) {
    switch (type) {
    case 'h': {
      Number(this.currentHour) < 23 ? (this.currentHour = Number(this.currentHour) + 1) : (this.currentHour = 0);
      break;
    }
    case 'm': {
      Number(this.currentMinute) < 59 ? (this.currentMinute = Number(this.currentMinute) + 1) : (this.currentMinute = 0);
      break;
    }
    case 's': {
      Number(this.currentSecond) < 59 ? (this.currentSecond = Number(this.currentSecond) + 1) : (this.currentSecond = 0);
      break;
    }
    default:
    }
    this.timeChange();
  }

  timeDown(type) {
    switch (type) {
    case 'h': {
      Number(this.currentHour) > 0 ? (this.currentHour = Number(this.currentHour) - 1) : (this.currentHour = 23);
      break;
    }
    case 'm': {
      Number(this.currentMinute) > 0 ? (this.currentMinute = Number(this.currentMinute) - 1) : (this.currentMinute = 59);
      break;
    }
    case 's': {
      Number(this.currentSecond) > 0 ? (this.currentSecond = Number(this.currentSecond) - 1) : (this.currentSecond = 59);
      break;
    }
    default:
    }
    this.timeChange();
  }

  fixTime(event, type) {
    // 由于keypress不监听微软输入法需要使用keydown
    // 而keydown中微软输入法的key是'Process'，且keydown没有charCode，所以需要用code判断
    // 故退格和输入使用同一个事件
    let timeType: string;
    const min = 0;
    let max = 59;
    switch (type) {
    case 'h': {
      timeType = 'currentHour';
      max = 23;
      break;
    }
    case 'm': {
      timeType = 'currentMinute';
      break;
    }
    case 's': {
      timeType = 'currentSecond';
      break;
    }
    default:
    }
    let value = event.target.value;
    const selectionStart = event.target.selectionStart;
    const selectionEnd = event.target.selectionEnd;
    // 是数字的时候再处理，分为小键盘和数字键
    if (/^(Digit|Numpad)\d$/.test(event.code)) {
      event.preventDefault();
      let input;
      if (event.clipboardData) {
        input = event.clipboardData.getData('text');
      } else if (event.code) {
        input = event.code.slice(event.code.length - 1);
      }
      value = value.substring(0, selectionStart) + input + value.substring(selectionEnd);
      if (value.length === 3 && value.indexOf('0') === 0) {
        value = value.slice(1);
      }
    } else if (event.keyCode === 8) {
      event.preventDefault();
      value = value.substring(0, selectionStart - 1) + value.substring(selectionEnd);
      if (value.length < 2) {
        value = '0' + value;
      }
    } else if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
      // 如果不是上下左右，就阻拦，执行自己的处理
      event.preventDefault();
    }
    if (/^(Digit|Numpad)\d$/.test(event.code) || event.keyCode === 8) {
      if (Number(value) >= min && Number(value) <= max) {
        this[timeType] = value;
        // 防抖，防止提前校验导致错误的校验
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.timeChange();
        }, 300);
      }
    }
  }

  timeChange() {
    if (!this.isAuxiliary) {
      this.rangeStart = new Date(
        this.rangeStart.getFullYear(),
        this.rangeStart.getMonth(),
        this.rangeStart.getDate(),
        Number(this.currentHour),
        Number(this.currentMinute),
        Number(this.currentSecond)
      );
    } else {
      this.rangeEnd = new Date(
        this.rangeEnd.getFullYear(),
        this.rangeEnd.getMonth(),
        this.rangeEnd.getDate(),
        Number(this.currentHour),
        Number(this.currentMinute),
        Number(this.currentSecond)
      );
    }
    this.rangeChange(this.ensureRangeValueOrder([this.rangeStart, this.rangeEnd]));
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return date1?.getFullYear() === date2?.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (Object.prototype.hasOwnProperty.call(changes, 'selectedRange')) {
      this.selectingRange = false;
      [this.rangeStart, this.rangeEnd] = changes.selectedRange.currentValue;
    }
  }

  isInRange(dateParam) {
    let date = dateParam;
    const rangeStart = this.rangeStart;
    let rangeEnd = this.rangeEnd;
    if (this.selectingRange) {
      rangeEnd = this.previewEnd;
    }
    date = new Date(date).getTime();
    return (
      date < Math.max(new Date(rangeStart).getTime(), new Date(rangeEnd).getTime()) &&
      date > Math.min(new Date(rangeStart).getTime(), new Date(rangeEnd).getTime())
    );
  }

  ensureRangeValueOrder(dateRange: Date[], initTime = false) {
    if (Array.isArray(dateRange) && dateRange.length === 2) {
      // 当选择同一天时，判断时间是否顺序错误并修正
      if (this.isSameDate(dateRange[0], dateRange[1]) && dateRange[0].getTime() - dateRange[1].getTime() > 0) {
        this.fixReverseTime(dateRange);
      }
      // 当后一次时间选择比前一次日期靠前时，对时间置换
      if (initTime && dateRange[0].getTime() - dateRange[1].getTime() > 0) {
        dateRange[0] = new Date(dateRange[0].setHours(23, 59, 59));
        dateRange[1] = new Date(dateRange[1].setHours(0, 0, 0));
      }
      if (dateRange.every((day) => !!day)) {
        dateRange.sort((a, b) => {
          return new Date(a).getTime() - new Date(b).getTime();
        });
      } else {
        if (!dateRange[0]) {
          dateRange[0] = dateRange[1];
          dateRange[1] = null;
        }
      }
    }
    return dateRange;
  }

  fixReverseTime(dateRange: Date[]) {
    if (this.isAuxiliary) {
      dateRange[1] = dateRange[0];
      this.currentHour = dateRange[1].getHours();
      this.currentMinute = dateRange[1].getMinutes();
      this.currentSecond = dateRange[1].getSeconds();
    } else {
      dateRange[0] = dateRange[1];
      this.currentHour = dateRange[0].getHours();
      this.currentMinute = dateRange[0].getMinutes();
      this.currentSecond = dateRange[0].getSeconds();
    }
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

  protected notifyCalenderChange() {
    this.syncPickerPair.emit({
      year: this.currentYear,
      month: this.currentMonthIndex,
    });
  }

  confirmTime() {
    this.consolidateTime.emit();
  }

  private setTime(date: any) {
    return new Date(date.setHours(this.currentHour, this.currentMinute, this.currentSecond));
  }

  protected onSelectDateChanged() {
    let date = this.selectedDate || new Date();
    if (date.getTime() < this.minDate.getTime()) {
      date = this.minDate;
    }
    if (date.getTime() > this.maxDate.getTime()) {
      date = this.maxDate;
    }
    this.selectedDate = this.selectedDate || date;
    this.currentYear = date.getFullYear();
    this.currentMonthIndex = date.getMonth();
    if (!this.showTime) {
      return;
    }
    switch (this.isAuxiliary) {
    case false:
      // Left panel
      this.currentHour = this.rangeStart ? this.rangeStart.getHours() : 0;
      this.currentMinute = this.rangeStart ? this.rangeStart.getMinutes() : 0;
      this.currentSecond = this.rangeStart ? this.rangeStart.getSeconds() : 0;
      break;
    case true:
      // Right panel
      this.currentHour = this.rangeEnd ? this.rangeEnd.getHours() : 23;
      this.currentMinute = this.rangeEnd ? this.rangeEnd.getMinutes() : 59;
      this.currentSecond = this.rangeEnd ? this.rangeEnd.getSeconds() : 59;
      break;
    default:
    }
  }

  get currentTime() {
    return {
      hour: this.currentHour,
      minute: this.currentMinute,
      second: this.currentSecond,
    };
  }
}
