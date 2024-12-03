import { CdkScrollable, CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Input, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { DatepickerProCommonDataService, DatepickerProService } from '../datepicker-pro.service';
import { DevuiCalendarDateItem } from './datepicker-pro.type';

const DAY_DURATION = 24 * 60 * 60 * 1000;
const HOUR_DURATION = 60 * 60 * 1000;

@Component({
  selector: 'd-calendar-panel',
  templateUrl: './calendar-panel.component.html',
  styleUrls: ['./calendar-panel.component.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarPanelComponent implements OnInit, OnDestroy {
  @ViewChild('scrollBody') scrollBodyCmp: CdkVirtualScrollViewport;
  @ViewChild('scrollList') scrollListCmp: CdkVirtualScrollViewport;
  @Input() isRangeType: boolean;
  @Input() isWeekSelect = false;

  currentBodyIndex = 0;
  today: Date;
  calendarItemSize = 186; // 一个月份日历的高度

  i18nText: I18nInterface['datePickerPro'];
  i18nSubscription: Subscription;
  unsubscribe$ = new Subject<void>();

  allMonthList = [];
  yearAndMonthList = [];
  scrollListener: Subscription;
  isListCollopse = false;
  weekHoverRange = [];
  curWeekHoverDate: Date;
  isSummerTimeZone = false;

  get curHoverDate() {
    return this.pickerSrv.curHoverDate;
  }

  set curHoverDate(value: Date) {
    this.pickerSrv.curHoverDate = value;
    this.cdr.detectChanges();
  }

  get curDate(): Date {
    if (this.isRangeType) {
      if (this.pickerSrv.currentActiveInput === 'start') {
        return this.pickerSrv.curRangeDate[0];
      } else if (this.pickerSrv.currentActiveInput === 'end') {
        return this.pickerSrv.curRangeDate[1];
      }
    } else {
      return this.pickerSrv.curDate;
    }
  }

  set curDate(value: Date) {
    if (this.isRangeType) {
      if (this.pickerSrv.currentActiveInput === 'start') {
        this.pickerSrv.curRangeDate[0] = value;
      } else if (this.pickerSrv.currentActiveInput === 'end') {
        if (this.pickerSrv.showTime) {
          this.pickerSrv.curRangeDate[1] =
            (this.pickerSrv.curRangeDate[1] && this.pickerSrv.curRangeDate[1].toDateString() === value.toDateString())
              ? value
              : new Date(value.setHours(23, 59, 59));
        } else {
          this.pickerSrv.curRangeDate[1] = new Date(value.setHours(23, 59, 59));
        }
      }
    } else {
      this.pickerSrv.curDate = value;
    }
  }

  get selectedRangeDate(): Date[] {
    return this.pickerSrv.curRangeDate;
  }

  set selectedRangeDate(dateList: Date[]) {
    this.pickerSrv.curRangeDate = dateList;
  }

  get markDateTemplate() {
    return this.pickerSrv.markDateInfoTemplate;
  }

  constructor(
    protected i18n: I18nService,
    private pickerSrv: DatepickerProService,
    private dataSrv: DatepickerProCommonDataService,
    private cdr: ChangeDetectorRef,
    private scrollDispatcher: ScrollDispatcher
  ) {
  }

  setI18nText() {
    this.i18nText = this.i18n.getI18nText().datePickerPro;
    this.i18nSubscription = this.i18n.langChange().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((data) => {
      this.i18nText = data.datePickerPro;
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
    this.setI18nText();
    this.today = new Date();
    this.isSummerTimeZone = this.judgeIsSummerTimeZone();
    this.initDataList();
    this.initObservable();
  }

  // 判断当前时区是否需要夏令时变换
  private judgeIsSummerTimeZone() {
    const Jan1 = new Date(2023, 0);
    const Jul1 = new Date(2023, 6);
    // 两个日期之间在非夏令时地区相差181天整
    if ((Jul1.getTime() - Jan1.getTime()) / DAY_DURATION !== 181) {
      return true;
    };

    return false;
  }

  private initObservable() {
    this.pickerSrv.toggleEvent.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(isOpen => {
      if (isOpen) {
        setTimeout(() => {
          this.scrollBodyCmp.checkViewportSize();
          this.scrollListCmp.checkViewportSize();
          this.goToDate(this.curDate || new Date(), 'auto');
        });

        // 首次展开添加滚动监听
        if (!this.scrollListener) {
          this.initScrollListener();
        }
      } else {
        this.curHoverDate = null;
      }
    });

    this.pickerSrv.updateDateValue.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(res => {
      if (this.isRangeType) {
        this.updateRangeDate(res.value as Date[]);
      } else {
        this.updateSingleDate(res.value as Date);
      }
    });

    this.pickerSrv.detectedChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(() => {
      this.cdr.detectChanges();
    });

    this.pickerSrv.activeInputChange.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(type => {
      if (type === 'start') {
        this.goToDate(this.selectedRangeDate[0] || this.selectedRangeDate[1] || new Date());
      } else {
        if (!this.selectedRangeDate[1] && this.selectedRangeDate[0]) {
          this.updateRangeDate([
            this.selectedRangeDate[0],
            new Date(new Date(this.selectedRangeDate[0].getTime()).setHours(23, 59, 59))
          ]);
        }
        this.goToDate(this.selectedRangeDate[1] || this.selectedRangeDate[0] || new Date());
      }
    });
  }

  private initScrollListener() {
    this.scrollDispatcher.scrolled().pipe(
      takeUntil(this.unsubscribe$),
      filter((res: CdkScrollable) => {
        return res && res.getElementRef().nativeElement.classList.contains('devui-tbody-wrapper');
      }),
      debounceTime(50)
    ).subscribe(() => {
      const offsetY = this.scrollBodyCmp.measureScrollOffset();
      // 当滚动超过一个月面板的一半时，就更新月份
      this.currentBodyIndex = Math.floor(offsetY / this.calendarItemSize) + (offsetY % this.calendarItemSize > 100 ? 1 : 0);
      const listIndex = this.isListCollopse ?
        Math.floor(this.currentBodyIndex / 12) : this.currentBodyIndex + Math.floor(this.currentBodyIndex / 12) + 1;
      this.goToListByIndex(listIndex);
      this.cdr.detectChanges();
    });
  }

  private initDataList() {
    const key = `${this.pickerSrv.calendarRange.join('-')}-${
      this.pickerSrv.minDate.toDateString() + this.pickerSrv.maxDate.toDateString()
    }`;
    if (this.dataSrv.calendarDataCache[key]) {
      this.yearAndMonthList = this.dataSrv.calendarDataCache[key].yearAndMonthList;
      this.allMonthList = this.dataSrv.calendarDataCache[key].allMonthList;
      return;
    }

    this.yearAndMonthList = [];
    this.allMonthList = [];

    for (let yearIndex = this.pickerSrv.calendarRange[0]; yearIndex <= this.pickerSrv.calendarRange[1]; yearIndex++) {
      this.yearAndMonthList.push({
        year: yearIndex,
        isMonth: false,
        active: false
      });
      for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
        this.allMonthList.push({
          year: yearIndex,
          month: monthIndex,
          displayWeeks: this.getDisplayWeeks(yearIndex, monthIndex)
        });

        this.yearAndMonthList.push({
          year: yearIndex,
          month: monthIndex,
          isMonth: true,
          active: false
        });
      }
    }

    this.dataSrv.calendarDataCache[key] = {
      yearAndMonthList: this.yearAndMonthList,
      allMonthList: this.allMonthList
    };
  }

  private getDisplayWeeks(yearIndex: number, monthIndex: number): DevuiCalendarDateItem[] {
    const firstDayOfMonth = new Date(yearIndex, monthIndex, 1);
    const weekOfDay = firstDayOfMonth.getDay();
    const startDate = new Date(firstDayOfMonth.getTime() - weekOfDay * DAY_DURATION);
    const displayWeeks = [];
    for (let i = 0; i < 6; i++) {
      const startWeekDate = startDate.getTime() + i * 7 * DAY_DURATION;
      const weekDays = new Array(7).fill(0).map((value, index) => {
        let currentDate = new Date(startWeekDate + index * DAY_DURATION);
        // 夏令时区检测出错误的冬令时时间，加快一小时
        if (this.isSummerTimeZone && currentDate.getHours() === 23) {
          currentDate = new Date(startWeekDate + index * DAY_DURATION + HOUR_DURATION);
        }
        return {
          day: this.fillLeft(currentDate.getDate()),
          date: currentDate,
          inMonth: currentDate.getMonth().toString() === monthIndex.toString(),
          isToday: currentDate.toDateString() === this.today.toDateString()
        };
      });
      displayWeeks.push(weekDays);
    }
    return displayWeeks;
  }

  private goToDate(date: Date, scrollBehavior?) {
    const indexObj = this.getCurrentIndex(date);
    const scroll = scrollBehavior || (Math.abs(indexObj.bodyIndex - this.currentBodyIndex) > 18 ? 'auto' : 'smooth');
    this.currentBodyIndex = indexObj.bodyIndex;
    this.scrollBodyCmp.scrollToIndex(indexObj.bodyIndex, scroll);
    this.goToListByIndex(indexObj.listIndex);
    this.cdr.detectChanges();
  }

  private goToListByIndex(index) {
    const indexDelta = Math.abs(this.scrollListCmp.measureScrollOffset() / 30 - index);
    this.scrollListCmp.scrollToIndex(index - 4, indexDelta < 12 ? 'smooth' : 'auto');
    this.updateListActive(index);
  }

  selectMonth(year: number, month: number) {
    const date = new Date(year, month, 1);
    const curYear = this.yearAndMonthList.find(t => t.active)?.year || this.curDate.getFullYear();
    // 太远的虚拟滚动会导致白屏，所以超过两年的滚动都直接跳转
    const isSmoothAnimation = Math.abs(curYear - year) < 2;

    if (this.isListCollopse) {
      this.toggleListCollopse(date);
    } else {
      this.goToDate(date, isSmoothAnimation ? 'smooth' : 'auto');
    }
  }

  updateRangeDate(dateList: Date[]) {
    if (!dateList) {
      this.selectedRangeDate = [];
      this.cdr.detectChanges();
      return;
    }

    const curDate = (this.pickerSrv.currentActiveInput === 'start' ?
      (dateList[0] || dateList[1]) : (dateList[1] || dateList[0])) || new Date();
    const moreThanOneYear = Math.abs(curDate.getFullYear() - (this.currentBodyIndex / 12 + this.pickerSrv.calendarRange[0])) > 1;
    this.selectedRangeDate = dateList;
    this.goToDate(curDate, moreThanOneYear ? 'auto' : 'smooth');
    this.cdr.detectChanges();
  }

  updateSingleDate(date: Date) {
    if (!date) {
      this.curDate = null;
      this.cdr.detectChanges();
      return;
    }
    const moreThanOneYear = Math.abs(date.getFullYear() - (this.currentBodyIndex / 12 + this.pickerSrv.calendarRange[0])) > 1;
    this.curDate = date;
    this.goToDate(this.curDate, moreThanOneYear ? 'auto' : 'smooth');
    this.cdr.detectChanges();
  }

  updateListActive(index: number) {
    const curActive = this.yearAndMonthList.find(t => t.active);
    if (curActive) {
      curActive.active = false;
    }
    this.yearAndMonthList[index].active = true;
  }

  getCurrentIndex(curDate: Date) {
    const year = curDate.getFullYear();
    const month = curDate.getMonth();
    const listIndex = this.isListCollopse ?
      (year - this.pickerSrv.calendarRange[0]) : (year - this.pickerSrv.calendarRange[0]) * 13 + month + 1;
    return {
      bodyIndex: (year - this.pickerSrv.calendarRange[0]) * 12 + month,
      listIndex
    };
  }

  selectDate(day: DevuiCalendarDateItem) {
    if (this.isDisabled(day.date) || !day.inMonth) {
      return;
    }

    if (this.isWeekSelect) {
      this.pickerSrv.curRangeDate = this.getWeekRange(day.date);
      this.pickerSrv.currentActiveInput = 'end';
    } else {
      this.curDate = new Date(day.date.setHours(this.pickerSrv.curHour, this.pickerSrv.curMin, this.pickerSrv.curSec));
    }
    if (this.isRangeType) {
      this.pickerSrv.fixRangeDate();
    }
    this.cdr.detectChanges();
    // 非时间模式下选完开始日期跳转到结束日期
    if (this.isRangeType && !this.pickerSrv.showTime) {
      if (this.pickerSrv.currentActiveInput === 'start') {
        this.pickerSrv.currentActiveInput = 'end';
      } else if (this.pickerSrv.currentActiveInput === 'end' && !this.selectedRangeDate[0]) {
        this.selectedRangeDate[0] = this.curDate;
        this.pickerSrv.currentActiveInput = 'start';
      } else {
        this.pickerSrv.closeDropdownEvent.next(false);
      }
    }
    this.pickerSrv.selectedDateChange.next({
      type: this.isRangeType ? 'range' : 'single',
      value: this.isRangeType ? this.selectedRangeDate : this.curDate
    });

    if (this.isRangeType && this.pickerSrv.showTime) {
      this.pickerSrv.updateTimeChange.next({
        activeInput: this.pickerSrv.currentActiveInput,
        hour: this.pickerSrv.curHour,
        min: this.pickerSrv.curMin,
        seconds: this.pickerSrv.curSec
      });
    }

    if (this.pickerSrv.closeAfterSelected) {
      this.pickerSrv.closeDropdownEvent.next(false);
    }
  }

  isStartDate(date: Date): boolean {
    return this.pickerSrv.isStartDate(date);
  }

  isDisabled(date: Date): boolean {
    return !this.pickerSrv.dateInRange(date);
  }

  isEndDate(date: Date): boolean {
    return this.pickerSrv.isEndDate(date);
  }

  isDateInRange(date: Date): boolean {
    if (this.isWeekSelect) {
      return this.isInWeekHoverRange(date);
    } else {
      return this.pickerSrv.isDateInRange(date);
    }
  }

  isDateInSelectRange(date: Date): boolean {
    return this.pickerSrv.isDateInSelectRange(date);
  }

  isDateActive(date: Date): boolean {
    return this.pickerSrv.isDateActive(date);
  }

  isActiveTypeDate(date: Date): boolean {
    return this.pickerSrv.isActiveInputTypeDate(date);
  }

  isDateAbandon(date: Date): boolean {
    return this.pickerSrv.isDateAbandon(date);
  }

  isDateSuggest(date: Date): boolean {
    return this.pickerSrv.isInSuggestList(date);
  }

  isDateMarked(date: Date): boolean {
    return this.pickerSrv.isMarkedDate(date);
  }

  isSingleDate(): boolean {
    if (this.pickerSrv.currentActiveInput === 'start') {
      return !this.pickerSrv.curRangeDate[1];
    } else if (this.pickerSrv.currentActiveInput === 'end') {
      return !this.pickerSrv.curRangeDate[0];
    }
  }

  setHoverTarget(date: Date, isInMonth: boolean) {
    if (!isInMonth) {
      this.curHoverDate = null;
      return;
    }
    this.curHoverDate = date;
    if (this.isWeekSelect) {
      this.weekHoverRange = this.getWeekRange(date);
      this.curWeekHoverDate = date;
      this.cdr.markForCheck();
      return;
    }
  }

  getWeekRange(date: Date) {
    if (!date) {
      return [];
    }
    const diff = date.getDay() < this.pickerSrv.startIndexOfWeek
      ? 7 - (this.pickerSrv.startIndexOfWeek - date.getDay())
      : date.getDay() - this.pickerSrv.startIndexOfWeek;
    const weekStart = new Date(date.getTime() - diff * DAY_DURATION);
    const weekEnd = new Date(weekStart.getTime() + DAY_DURATION * 6);
    weekEnd.setHours(23, 59, 59);

    return [weekStart, weekEnd];
  }

  isInWeekHoverRange(date: Date) {
    const range = this.getWeekRange(this.curWeekHoverDate);
    const time = date.getTime();
    const timeStr = date.toDateString();
    if (this.pickerSrv.isDateActive(date)) {
      return false;
    }
    return ((range[0]?.getTime() < time && time < range[1]?.getTime()) ||
    (range[0]?.toDateString() === timeStr || timeStr === range[1]?.toDateString()));
  }

  toggleListCollopse(toDate?: Date) {
    const activeItem = this.yearAndMonthList.find(t => t.active);
    const curYear = activeItem?.year;
    const curMonth = activeItem?.month;
    this.isListCollopse = !this.isListCollopse;
    if (this.isListCollopse) {
      this.yearAndMonthList = this.yearAndMonthList.filter(t => !t.isMonth);
    } else {
      this.initDataList();
    }
    setTimeout(() => {
      this.goToDate(toDate || new Date(curYear, curMonth || 0, 1), 'auto');
    });
  }

  protected fillLeft(num: number) {
    return num < 10 ? `0${num}` : `${num}`;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
