import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DatepickerProService implements OnDestroy {
  curDate: Date;
  curRangeDate: Date[] = [];
  curHoverDate: Date;
  startIndexOfWeek: number;
  isRange: boolean;
  markedRangeDateList: Date[][];
  markDateInfoTemplate: TemplateRef<any>;
  markedDateList: Date[];
  showTime: boolean;
  calendarRange = [1970, 2099];
  currentActiveInput: 'start' | 'end' = 'start';
  _minDate: Date = new Date(this.calendarRange[0], 0, 1);
  set minDate(value: Date) {
    this._minDate = new Date(value) || new Date(this.calendarRange[0], 0, 1);
    this.detectedChanges.next();
  }
  get minDate(): Date {
    return this._minDate;
  }
  _maxDate: Date = new Date(this.calendarRange[1], 11, 31, 23, 59, 59);
  set maxDate(value: Date) {
    this._maxDate = new Date(value) || new Date(this.calendarRange[1], 11, 31, 23, 59, 59);
    this.detectedChanges.next();
  }
  get maxDate(): Date {
    return this._maxDate;
  }
  document: Document;
  get closeAfterSelected(): boolean {
    return !this.isRange && !this.showTime;
  }

  get curHour() {
    if (this.isRange) {
      return (this.currentActiveInput === 'start' ? this.curRangeDate[0]?.getHours() : this.curRangeDate[1]?.getHours()) || 0;
    } else {
      return this.curDate?.getHours() || 0;
    }
  }
  get curMin() {
    if (this.isRange) {
      return (this.currentActiveInput === 'start' ? this.curRangeDate[0]?.getMinutes() : this.curRangeDate[1]?.getMinutes()) || 0;
    } else {
      return this.curDate?.getMinutes() || 0;
    }
  }
  get curSec() {
    if (this.isRange) {
      return (this.currentActiveInput === 'start' ? this.curRangeDate[0]?.getSeconds() : this.curRangeDate[1]?.getSeconds()) || 0;
    } else {
      return this.curDate?.getSeconds() || 0;
    }
  }
  readonly toggleEvent = new Subject<boolean>();
  readonly closeDropdownEvent = new Subject<boolean>();
  readonly activeInputChange = new Subject<'start' | 'end'>();
  readonly selectedDateChange = new Subject<{
    type: 'single' | 'range';
    value: Date | Date[];
  }>();
  readonly updateDateValue = new Subject<{
    type: 'single' | 'range';
    value: Date | Date[];
  }>();
  readonly selectedTimeChange = new Subject<{
    activeInput?: 'start' | 'end';
    hour: number;
    min: number;
    seconds: number;
  }>();
  readonly updateTimeChange = new Subject<{
    activeInput?: 'start' | 'end';
    hour: number;
    min: number;
    seconds: number;
  }>();
  readonly detectedChanges = new Subject<void>();

  constructor(@Inject(DOCUMENT) private doc: any) {
    this.document = this.doc;
  }
  dateInRange(date: Date): boolean {
    if (!date) {
      return true;
    }
    return (date.getTime() > this.minDate.getTime() && date.getTime() < this.maxDate.getTime()) ||
      date.toDateString() === this.minDate.toDateString() || date.toDateString() === this.maxDate.toDateString();
  }

  resetMin() {
    this.minDate = new Date(this.calendarRange[0], 0, 1);
  }

  resetMax() {
    this.maxDate = new Date(this.calendarRange[1], 11, 31);
  }

  // 对范围模式下一些非法的选择进行修正
  fixRangeDate() {
    const start = this.curRangeDate[0]?.getTime();
    const end = this.curRangeDate[1]?.getTime();

    if (start && end && end < start) {
      if (this.currentActiveInput === 'start') {
        this.curRangeDate[1] = null;
      } else if (this.currentActiveInput === 'end') {
        this.curRangeDate[0] = null;
      }
    }
  }

  // 判断日期是否为起始日期
  isStartDate(date: Date): boolean {
    if (!this.isRange) {
      return false;
    }

    if (this.currentActiveInput === 'start') {
      return date.toDateString() === this.curHoverDate?.toDateString() || date.toDateString() === this.curRangeDate[0]?.toDateString();
    }

    return date.toDateString() === this.curRangeDate[0]?.toDateString();
  }

  // 判断日期是否为结束日期
  isEndDate(date: Date): boolean {
    if (!this.isRange) {
      return false;
    }

    if (this.currentActiveInput === 'end') {
      return date.toDateString() === this.curHoverDate?.toDateString() || date.toDateString() === this.curRangeDate[1]?.toDateString();
    }

    return date.toDateString() === this.curRangeDate[1]?.toDateString();
  }

  // 判断日期是否在hover范围或者选中的范围内
  isDateInRange(date: Date): boolean {
    const dateTime = date.getTime();
    const dateStr = date.toDateString();
    if (this.isRange) {
      if (this.currentActiveInput === 'start') {
        return (this.curHoverDate || this.curRangeDate[0])?.getTime() < dateTime &&
          (this.curHoverDate || this.curRangeDate[0])?.toDateString() !== dateStr &&
          this.curRangeDate[1]?.getTime() > dateTime &&
          this.curRangeDate[1]?.toDateString() !== dateStr;
      } else {
        return this.curRangeDate[0]?.getTime() < dateTime &&
          this.curRangeDate[0]?.toDateString() !== dateStr &&
          (this.curHoverDate || this.curRangeDate[1])?.getTime() > dateTime &&
          (this.curHoverDate || this.curRangeDate[1]).toDateString() !== dateStr;
      }
    } else {
      return false;
    }
  }

  // 判断日期是否在已选中的范围内，与hover做区分
  isDateInSelectRange(date: Date) {
    if (!this.isRange) {
      return false;
    }

    if (!this.curRangeDate[0] || !this.curRangeDate[1]) {
      return false;
    }

    return this.curRangeDate[0].getTime() < date.getTime() && this.curRangeDate[1].getTime() > date.getTime() &&
      this.curRangeDate[1].toDateString() !== date.toDateString() && this.curRangeDate[0].toDateString() !== date.toDateString();
  }

  isDateActive(date: Date): boolean {
    const dateStr = date.toDateString();
    if (this.isRange) {
      return dateStr === this.curRangeDate[0]?.toDateString() || dateStr === this.curRangeDate[1]?.toDateString();
    } else {
      return dateStr === this.curDate?.toDateString();
    }
  }

  isMonthActive(yearIndex: number, monthIndex: number): boolean {
    if (this.isRange) {
      return (yearIndex === this.curRangeDate[0]?.getFullYear() && monthIndex === this.curRangeDate[0]?.getMonth()) ||
        (yearIndex === this.curRangeDate[1]?.getFullYear() && monthIndex === this.curRangeDate[1]?.getMonth());
    } else {
      return yearIndex === this.curDate?.getFullYear() && monthIndex === this.curDate?.getMonth();
    }
  }

  isYearActive(yearIndex: number): boolean {
    if (this.isRange) {
      return yearIndex === this.curRangeDate[0]?.getFullYear() || yearIndex === this.curRangeDate[1]?.getFullYear();
    } else {
      return yearIndex === this.curDate?.getFullYear();
    }
  }

  // 是否为范围选中日期中对应的input激活项
  isActiveInputTypeDate(date: Date) {
    if (!this.isRange) {
      return false;
    }

    if (this.currentActiveInput === 'start') {
      return date.toDateString() === this.curRangeDate[0]?.toDateString();
    } else {
      return date.toDateString() === this.curRangeDate[1]?.toDateString();
    }
  }

  // 是否为选中日期且在废弃范围逻辑内
  isDateAbandon(date: Date): boolean {
    if (!this.isRange || (!this.curRangeDate[0] || !this.curRangeDate[1])) {
      return false;
    }

    if (!this.isDateActive(date)) {
      return false;
    }

    if (this.currentActiveInput === 'start') {
      return this.curHoverDate?.getTime() > date.getTime();
    } else {
      return this.curHoverDate?.getTime() < date.getTime();
    }
  }

  isInSuggestList(date: Date): boolean {
    if (!this.markedRangeDateList) {
      return false;
    }

    for (let index = 0; index < this.markedRangeDateList.length; index++) {
      const range = this.markedRangeDateList[index];
      if (
        range[0]?.getTime() < date.getTime() && range[1]?.getTime() > date.getTime()
      ) {
        return true;
      }

      if (
        range[0]?.toDateString() === date.toDateString() || range[1]?.toDateString() === date.toDateString()
      ) {
        return true;
      }
    }
    return false;
  }

  isMarkedDate(date: Date): boolean {
    for (let index = 0; index < this.markedDateList?.length; index++) {
      if (this.markedDateList[index]?.toDateString() === date.toDateString()) {
        return true;
      }
    }
    return false;
  }

  mearsureStrWidth(str: string): number {
    const mearsureDom = this.document.createElement('span');
    mearsureDom.innerText = str;
    mearsureDom.style.visibility = 'hidden';
    this.document.body.appendChild(mearsureDom);

    const domWidth = mearsureDom.offsetWidth;

    this.document.body.removeChild(mearsureDom);
    return domWidth;
  }

  ngOnDestroy(): void {
    this.toggleEvent.complete();
    this.selectedDateChange.complete();
    this.closeDropdownEvent.complete();
    this.updateDateValue.complete();
    this.updateTimeChange.complete();
    this.selectedTimeChange.complete();
    this.activeInputChange.complete();
    this.detectedChanges.complete();
  }

}

@Injectable()
export class DatepickerProCommonDataService {
  calendarDataCache = {};
}
