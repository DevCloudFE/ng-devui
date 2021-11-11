import { Component, OnInit, ViewChild } from '@angular/core';
import { DatepickerProCalendarComponent } from 'ng-devui/datepicker-pro';
import { padStart } from 'lodash-es';

@Component({
  selector: 'd-demo-datepicker-pro-tab-type',
  templateUrl: './datepicker-pro-tab-type.component.html',
  styleUrls: ['./datepicker-pro-tab-type.component.scss'],
})
export class DatepickerProTabTypeComponent implements OnInit {
  @ViewChild('calendar') calendarCmp: DatepickerProCalendarComponent;
  placeholder = 'Please Select Date';
  dateValue = '';
  tab1acticeID: string | number = '1';
  curDate;
  isOpen = false;
  choose;
  relativeNumber;
  relativeUnit = 'minute';
  options = ['minute', 'hours', 'days'];
  unitMap = {
    'minute': 1 / (24 * 60),
    'hours': 1 / 24,
    'days': 1
  };
  quickDateMap = {
    'today': [new Date(new Date().setHours(0, 0, 0)), new Date()],
    'yesterday': this.getDateRange(-1),
    'this week': this.getDateRange(-7),
    'last week': this.getDateRange(-14),
    'this month': this.getDateRange(-30),
    'last month': this.getDateRange(-30),
    'last 15 minutes': this.getDateRange(-1 / 96),
    'last 30 minutes': this.getDateRange(-1 / 48),
    'last 1 hour': this.getDateRange(-1 / 24),
    'last 4 hours': this.getDateRange(-1 / 6),
    'last 12 hours': this.getDateRange(-1 / 2),
    'last 24 hours': this.getDateRange(-1),
    'last 7 days': this.getDateRange(-7),
    'last 30 days': this.getDateRange(-30),
    'last 60 days': this.getDateRange(-60),
    'last 90 days': this.getDateRange(-90),
    'last 1 year': this.getDateRange(-365),
    'last 2 year': this.getDateRange(-365 * 2),
  };
  values = ['today', 'yesterday', 'this week', 'last week', 'this month', 'last month', 'last 15 minutes',
    'last 30 minutes', 'last 1 hour', 'last 4 hours', 'last 12 hours', 'last 24 hours', 'last 7 days', 'last 30 days',
    'last 60 days', 'last 90 days', 'last 1 year', 'last 2 years'];
  constructor() {

  }

  getDateRange(days) {
    return [new Date(new Date().getTime() + days * 1000 * 3600 * 24), new Date()];
  }

  ngOnInit(): void {

  }

  valueChange(value: string) {
    if (value) {
      this.dateValue = this.quickDateMap[value].map(d => this.getTimeStr(d) || '').join(' - ');
      this.curDate = this.quickDateMap[value];
      this.isOpen = false;
      this.relativeNumber = null;
    }
  }

  ensureDate() {
    this.dateValue = this.curDate.map(d => this.getTimeStr(d) || '').join(' - ');
    this.isOpen = false;
    this.choose = '';
    this.relativeNumber = null;
  }

  cancel() {
    if (this.dateValue) {
      this.curDate = this.dateValue.split(' - ').map(d => new Date(d));
    }
    this.isOpen = false;
  }

  ensureRelativeTime() {
    this.choose = '';
    this.curDate = this.getDateRange(-1 * this.unitMap[this.relativeUnit] * this.relativeNumber);
    console.log(this.curDate);
    this.dateValue = this.curDate.map(d => this.getTimeStr(d) || '').join(' - ');
    this.isOpen = false;
  }

  onToggle(isOpen) {
    this.isOpen = isOpen;
    if (isOpen) {
      this.calendarCmp?.updateCurPosition();
    }
  }

  getTimeStr(date: Date) {
    // tslint:disable-next-line
    return `${date.toLocaleDateString()} ${padStart(date.getHours() + '', 2, '0')}:${padStart(date.getMinutes() + '', 2, '0')}:${padStart(date.getSeconds() + '', 2, '0')}`;
  }
}
