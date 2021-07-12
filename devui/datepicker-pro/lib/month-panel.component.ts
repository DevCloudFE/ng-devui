import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { DatepickerProService } from './../datepicker-pro.service';

@Component({
  selector: 'd-month-panel',
  templateUrl: './month-panel.component.html',
  styleUrls: ['./month-panel.component.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthPanelComponent implements OnInit, OnDestroy {
  @ViewChild('scrollBody') scrollBodyCmp: CdkVirtualScrollViewport;
  @ViewChild('scrollList') scrollListCmp: CdkVirtualScrollViewport;
  @Input() isRangeType = false;

  unsubscribe$ = new Subject();
  scrollListener: Subscription;
  i18nText: I18nInterface['datePickerPro'];
  i18nSubscription: Subscription;

  yearList = [];
  calenderItemSize = 186;
  currentBodyIndex;
  monthList = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12]
  ];
  thisMonth: Date;

  get curHoverDate() {
    return this.pickerSrv.curHoverDate;
  }

  set curHoverDate(value: Date) {
    this.pickerSrv.curHoverDate = value;
  }

  get selectedRangeDate(): Date[] {
    return this.pickerSrv.curRangeDate;
  }

  set selectedRangeDate(dateList: Date[]) {
    this.pickerSrv.curRangeDate = dateList;
  }

  get currentDate(): Date {
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

  set currentDate(value: Date) {
    if (this.isRangeType) {
      if (this.pickerSrv.currentActiveInput === 'start') {
        this.pickerSrv.curRangeDate[0] = value;
      } else if (this.pickerSrv.currentActiveInput === 'end') {
        this.pickerSrv.curRangeDate[1] = value;
      }
    } else {
      this.pickerSrv.curDate = value;
    }
  }

  constructor(
    protected i18n: I18nService,
    private pickerSrv: DatepickerProService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.thisMonth = new Date();
    this.initList();
    this.initObservable();
    this.setI18nText();
  }

  setI18nText() {
    this.i18nText = this.i18n.getI18nText().datePickerPro;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.datePickerPro;
      this.cdr.detectChanges();
    });
  }

  initObservable() {
    this.pickerSrv.toggleEvent.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(isOpen => {
      if (isOpen) {
        setTimeout(() => {
          this.goToDate(this.currentDate || new Date());
        });
      }
      if (!this.scrollListener) {
        this.initScrollListener();
      }
    });

    this.pickerSrv.updateDateValue.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(res => {
      if (res.type === 'range') {
        this.pickerSrv.curRangeDate = res.value as Date[];
      } else {
        this.pickerSrv.curDate = res.value as Date;
      }
      this.goToDate(this.currentDate || new Date());
      this.cdr.detectChanges();
    });

    this.pickerSrv.activeInputChange.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(type => {
      if (type === 'start') {
        this.goToDate(this.selectedRangeDate[0] || this.selectedRangeDate[1] || new Date());
      } else {
        this.goToDate(this.selectedRangeDate[1] || this.selectedRangeDate[0] || new Date());
      }
    });
  }

  initList() {
    for (let yearIndex = this.pickerSrv.calendarRange[0]; yearIndex <= this.pickerSrv.calendarRange[1]; yearIndex++) {
      this.yearList.push({
        year: yearIndex,
        active: false
      });
    }
  }

  initScrollListener() {
    const scrollEle = this.scrollBodyCmp.getElementRef().nativeElement;
    this.scrollListener = fromEvent(scrollEle, 'mousewheel').pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(180) // 滚动动画时间180，延时保证计算位置的准确
    ).subscribe(() => {
      const offsetY = this.scrollBodyCmp.measureScrollOffset();
      // 当面板滚过一半更新面板
      this.currentBodyIndex = Math.floor(offsetY / this.calenderItemSize) + (offsetY % this.calenderItemSize > 100 ? 1 : 0);
      this.goToListByIndex(this.currentBodyIndex);
      this.cdr.detectChanges();
    });
  }

  goToDate(date: Date, scrollBehavior: 'auto' | 'smooth' = 'auto') {
    if (date) {
      const index = date.getFullYear() - this.pickerSrv.calendarRange[0];
      this.currentBodyIndex = index;
      this.scrollBodyCmp.scrollToIndex(index, scrollBehavior);
      this.goToListByIndex(index);
    }
  }

  goToListByIndex(index) {
    const indexDelta = Math.abs(this.scrollListCmp.measureScrollOffset() / 30 - index);
    this.scrollListCmp.scrollToIndex(index - 4, indexDelta < 12 ? 'smooth' : 'auto');
  }

  selectMonth(yearIndex: number, monthIndex: number) {
    if (this.isDisable(yearIndex, monthIndex)) {
      return;
    }
    this.currentDate = new Date(yearIndex, monthIndex - 1, 1);

    if (this.isRangeType) {
      this.pickerSrv.fixRangeDate();
    }

    // 非时间模式下选完开始日期跳转到结束日期
    if (this.isRangeType) {
      if (this.pickerSrv.currentActiveInput === 'start') {
        this.pickerSrv.currentActiveInput = 'end';
      } else if (this.pickerSrv.currentActiveInput === 'end' && !this.selectedRangeDate[0]) {
        this.pickerSrv.currentActiveInput = 'start';
      } else {
        this.pickerSrv.closeDropdownEvent.next();
      }
    }

    this.pickerSrv.selectedDateChange.next({
      type: this.isRangeType ? 'range' : 'single',
      value: this.isRangeType ? this.selectedRangeDate : this.currentDate
    });

    if (this.pickerSrv.closeAfterSelected) {
      this.pickerSrv.closeDropdownEvent.next();
    }
  }

  selectYear(yearIndex: number) {
    const isScroll = (yearIndex - this.pickerSrv.calendarRange[0]) - this.currentBodyIndex < 7;
    this.goToDate(new Date(yearIndex, 0, 1), isScroll ? 'smooth' : 'auto');
  }

  isSelected(yearIndex: number, monthIndex: number) {
    return this.pickerSrv.isMonthActive(yearIndex, monthIndex - 1);
  }

  isThisMonth(yearIndex: number, monthIndex: number) {
    return this.thisMonth.getFullYear() === yearIndex && this.thisMonth.getMonth() === monthIndex - 1;
  }

  isDateInRange(yearIndex: number, monthIndex: number) {
    const date = new Date(yearIndex, monthIndex - 1, 1);
    return this.pickerSrv.isDateInRange(date);
  }

  isDisable(yearIndex: number, monthIndex: number) {
    const date = new Date(yearIndex, monthIndex - 1, 1);
    return this.pickerSrv.maxDate.getTime() <  date.getTime() || this.pickerSrv.minDate.getTime() >  date.getTime();
  }

  isStartDate(yearIndex: number, monthIndex: number): boolean {
    if (!this.isRangeType) {
      return false;
    }
    const date = new Date(yearIndex, monthIndex - 1, 1);
    return this.pickerSrv.isStartDate(date);
  }

  isEndDate(yearIndex: number, monthIndex: number): boolean {
    if (!this.isRangeType) {
      return false;
    }
    const date = new Date(yearIndex, monthIndex - 1, 1);
    return this.pickerSrv.isEndDate(date);
  }

  isDateAbandon(yearIndex: number, monthIndex: number) {
    if (!this.isRangeType || (!this.selectedRangeDate[0] || !this.selectedRangeDate[1])) {
      return false;
    }
    const date = new Date(yearIndex, monthIndex - 1, 1);
    return this.pickerSrv.isDateAbandon(date);
  }

  isDateInSelectRange(yearIndex: number, monthIndex: number) {
    if (!this.isRangeType) {
      return false;
    }

    const date = new Date(yearIndex, monthIndex - 1, 1);

    return this.pickerSrv.isDateInSelectRange(date);
  }

  isActiveTypeDate(yearIndex: number, monthIndex: number) {
    if (!this.isRangeType) {
      return false;
    }

    const date = new Date(yearIndex, monthIndex - 1, 1);

    return this.pickerSrv.isActiveInputTypeDate(date);
  }

  setHoverTarget(yearIndex: number, monthIndex: number) {
    const date = new Date(yearIndex, monthIndex - 1, 1);
    if (this.isRangeType && !this.isDisable(yearIndex, monthIndex)) {
      this.curHoverDate = date;
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
