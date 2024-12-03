import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { chunk } from 'lodash-es';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatepickerProService } from '../datepicker-pro.service';

@Component({
  selector: 'd-year-panel',
  templateUrl: './year-panel.component.html',
  styleUrls: ['./year-panel.component.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearPanelComponent implements OnInit, OnDestroy {
  @ViewChild('scrollList') scrollListCmp: CdkVirtualScrollViewport;
  @Input() isRangeType = false;

  yearList = [];

  unsubscribe$ = new Subject<void>();

  get curHoverDate() {
    return this.pickerSrv.curHoverDate;
  }

  set curHoverDate(value: Date) {
    this.pickerSrv.curHoverDate = value;
  }

  get currentDate() {
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

  constructor(private cdr: ChangeDetectorRef, private pickerSrv: DatepickerProService) {}

  ngOnInit() {
    this.initYearList();
    this.initObservable();
  }

  initObservable() {
    this.pickerSrv.toggleEvent.subscribe((isOpen) => {
      if (isOpen) {
        setTimeout(() => {
          this.goToYear(this.currentDate || new Date());
        });
      }
    });

    this.pickerSrv.updateDateValue.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      if (res.type === 'range') {
        this.pickerSrv.curRangeDate = res.value as Date[];
      } else {
        this.pickerSrv.curDate = res.value as Date;
      }
      this.goToYear(this.currentDate || new Date());
    });

    this.pickerSrv.activeInputChange.pipe(takeUntil(this.unsubscribe$)).subscribe((type) => {
      if (type === 'start') {
        this.goToYear(this.pickerSrv.curRangeDate[0] || this.pickerSrv.curRangeDate[1] || new Date());
      } else {
        this.goToYear(this.pickerSrv.curRangeDate[1] || this.pickerSrv.curRangeDate[0] || new Date());
      }
    });
  }

  initYearList() {
    const list = new Array(this.pickerSrv.calendarRange[1] - this.pickerSrv.calendarRange[0] + 1).fill(1).map((t, i) => {
      return i + this.pickerSrv.calendarRange[0];
    });
    this.yearList = chunk(list, 3);
  }

  goToYear(date: Date) {
    if (date) {
      const index = Math.floor((date.getFullYear() - this.pickerSrv.calendarRange[0]) / 3);
      this.scrollListCmp.scrollToIndex(index - 1);
    }
    this.cdr.detectChanges();
  }

  isThisYear(yearIndex: number): boolean {
    return yearIndex === new Date().getFullYear();
  }

  isActiveYear(yearIndex: number): boolean {
    return this.pickerSrv.isYearActive(yearIndex);
  }

  isStartDate(yearIndex: number): boolean {
    if (!this.isRangeType) {
      return false;
    }
    const date = new Date(yearIndex, 0, 1);
    return this.pickerSrv.isStartDate(date);
  }

  isEndDate(yearIndex: number): boolean {
    if (!this.isRangeType) {
      return false;
    }
    const date = new Date(yearIndex, 0, 1);
    return this.pickerSrv.isEndDate(date);
  }

  isDateAbandon(yearIndex: number) {
    if (!this.isRangeType || !this.pickerSrv.curRangeDate[0] || !this.pickerSrv.curRangeDate[1]) {
      return false;
    }
    const date = new Date(yearIndex, 0, 1);
    return this.pickerSrv.isDateAbandon(date);
  }

  isActiveTypeDate(yearIndex: number) {
    if (!this.isRangeType) {
      return false;
    }

    const date = new Date(yearIndex, 0, 1);

    return this.pickerSrv.isActiveInputTypeDate(date);
  }

  isDateInRange(yearIndex: number) {
    const date = new Date(yearIndex, 0, 1);
    return this.pickerSrv.isDateInRange(date);
  }

  isDateInSelectRange(yearIndex: number) {
    if (!this.isRangeType) {
      return false;
    }

    const date = new Date(yearIndex, 0, 1);

    return this.pickerSrv.isDateInSelectRange(date);
  }

  selectYear(yearIndex: number) {
    if (this.isDisable(yearIndex)) {
      return;
    }
    this.currentDate = new Date(yearIndex, 0, 1);

    if (this.isRangeType) {
      this.pickerSrv.fixRangeDate();
    }

    // 非时间模式下选完开始日期跳转到结束日期
    if (this.isRangeType) {
      if (this.pickerSrv.currentActiveInput === 'start') {
        this.pickerSrv.currentActiveInput = 'end';
      } else if (this.pickerSrv.currentActiveInput === 'end' && !this.pickerSrv.curRangeDate[0]) {
        this.pickerSrv.currentActiveInput = 'start';
      } else {
        this.pickerSrv.closeDropdownEvent.next(false);
      }
    }

    this.pickerSrv.selectedDateChange.next({
      type: this.isRangeType ? 'range' : 'single',
      value: this.isRangeType ? this.pickerSrv.curRangeDate : this.currentDate,
    });

    if (this.pickerSrv.closeAfterSelected) {
      this.pickerSrv.closeDropdownEvent.next(false);
    }
  }

  isDisable(yearIndex: number) {
    const date = new Date(yearIndex, 0, 1);
    return this.pickerSrv.maxDate.getTime() < date.getTime() || this.pickerSrv.minDate.getTime() > date.getTime();
  }

  setHoverTarget(yearIndex: number) {
    const date = new Date(yearIndex, 0, 1);
    if (this.isRangeType && !this.isDisable(yearIndex)) {
      this.curHoverDate = date;
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
