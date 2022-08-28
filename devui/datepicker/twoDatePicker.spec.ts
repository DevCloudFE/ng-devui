import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import enUS from 'ng-devui/i18n/en-us';
import zhCN from 'ng-devui/i18n/zh-cn';
import { DomHelper } from '../utils/testing/dom-helper';
import * as EventHelper from '../utils/testing/event-helper';
import { DatepickerModule } from './datepicker.module';

class CommonFunctions {
  static i18nConfig = {
    'zh-cn': zhCN,
    'en-us': enUS
  };

  static i18nText() {
    const lang = localStorage.getItem('lang') ? localStorage.getItem('lang').toLocaleLowerCase() : 'zh-cn';
    if (Object.prototype.hasOwnProperty.call(this.i18nConfig, lang)) {
      return this.i18nConfig[lang];
    } else {
      return zhCN;
    }
  }

  static tickEvent(el, event, fixture, delay?: number): void {
    el.dispatchEvent(event);
    fixture.detectChanges();
    if (delay) {
      tick(delay);
    } else {
      tick();
    }
    fixture.detectChanges();
  }

  static closeDatePicker(fixture) {
    this.tickEvent(document, new Event('click'), fixture);
  }

  static openDatePicker(fixture, side: 'left' | 'right' = 'left') {
    const el = fixture.debugElement.componentInstance[`${side}InputEle`].nativeElement;
    this.tickEvent(el, new Event('click'), fixture);
  }

  static resolveMonth(str) {
    const monthArray = this.i18nText().datePicker.monthsOfYear;
    const monthIndex = monthArray.indexOf(`${str}`);
    return String(monthIndex + 1);
  }

  static strDateOrFromNow(date: Date | Array<number>, day?, arr = ['yy', 'mm', 'dd'], splitter = '/') {
    let fullDate: Date;
    if (Array.isArray(date) && date.length === 3) {
      const [addYear, addMonth, addDay] = date;
      const currentDate = Number(typeof day === 'string' ? day : new Date().getDate() + addDay);
      fullDate = new Date(new Date().getFullYear() + addYear, new Date().getMonth() + addMonth, currentDate);
    } else if (date instanceof Date) {
      fullDate = date;
    } else {
      return;
    }
    return EventHelper.dateToStrWithArr(fullDate, arr, splitter);
  }

  static padZero(value) {
    return (String(value)).padStart(2, '0');
  }
}

class TestFunctions {
  static testNgModelAndYearMonth(fixture, wrapperEle, component, isInput = true) {
    CommonFunctions.openDatePicker(fixture);

    const commonEles = {
      yearMonthEles: wrapperEle.querySelectorAll('.devui-date-title'),
      btnEles: (side, type) => {
        return wrapperEle.querySelectorAll('.devui-calender-header')[side].querySelectorAll('.devui-btn-link')[type];
      },
      yearShow: (ele) => {
        return ele.textContent.trim().slice(0, 4);
      },
      monthShow: (ele) => {
        return CommonFunctions.resolveMonth(ele.textContent.trim());
      }
    };
    const yearMonthEles = {
      left: {
        year: commonEles.yearMonthEles[0],
        month: commonEles.yearMonthEles[1]
      },
      right: {
        year: commonEles.yearMonthEles[2],
        month: commonEles.yearMonthEles[3]
      }
    };
    const currentShowStr = {
      left: {
        year: commonEles.yearShow(yearMonthEles.left.year),
        month: commonEles.monthShow(yearMonthEles.left.month)
      },
      right: {
        year: commonEles.yearShow(yearMonthEles.right.year),
        month: commonEles.monthShow(yearMonthEles.right.month)
      }
    };
    const btnEles = {
      left: {
        year: {
          last: commonEles.btnEles(0, 0),
          next: commonEles.btnEles(0, 3)
        },
        month: {
          last: commonEles.btnEles(0, 1),
          next: commonEles.btnEles(0, 2)
        }
      },
      right: {
        year: {
          next: commonEles.btnEles(1, 3),
          last: commonEles.btnEles(1, 0)
        },
        month: {
          next: commonEles.btnEles(1, 2),
          last: commonEles.btnEles(1, 1)
        }
      }
    };

    for (const side in btnEles) {
      if (side) {
        for (const time in btnEles[side]) {
          if (time) {
            let current = 0;
            for (const type in btnEles[side][time]) {
              if (type) {
                current = type === 'next' ? (current + 1) : (current - 1);
                btnEles[side][time][type].dispatchEvent(new Event('click'));
                fixture.detectChanges();
                let currentMonth = Number(currentShowStr[side][time]) + current;
                if (time === 'month') {
                  currentMonth = currentMonth % 12 || 12;
                }
                expect(commonEles[`${time}Show`](yearMonthEles[side][time])).toBe(String(currentMonth));
              }
            }
          }
        }
      }
    }

    const valueParam = isInput ? 'value' : 'innerText';

    let leftDayListEle = wrapperEle.querySelectorAll('tbody')[0];
    let rightDayListEle = wrapperEle.querySelectorAll('tbody')[1];
    let leftCurrentDayInListEle = leftDayListEle.querySelectorAll('.devui-day')[7];
    let rightCurrentDayInListEle = rightDayListEle.querySelectorAll('.devui-day')[7];
    let leftCurrentDay = leftCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
    let rightCurrentDay = rightCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
    CommonFunctions.tickEvent(leftCurrentDayInListEle, new Event('click'), fixture);
    CommonFunctions.tickEvent(rightCurrentDayInListEle, new Event('mouseover'), fixture);
    CommonFunctions.tickEvent(rightCurrentDayInListEle, new Event('click'), fixture);
    expect(component.getValue).toHaveBeenCalled();
    expect(component.leftInputEle.nativeElement[valueParam]).toBe(`${CommonFunctions.strDateOrFromNow([0, 0, 0], leftCurrentDay)}`);
    expect(component.rightInputEle.nativeElement[valueParam]).toBe(`${CommonFunctions.strDateOrFromNow([0, 1, 0], rightCurrentDay)}`);
    expect(component.rangeStart).toEqual(new Date(new Date().getFullYear(), new Date().getMonth(), leftCurrentDay));
    expect(component.rangeEnd).toEqual(new Date(new Date().getFullYear(), new Date().getMonth() + 1, rightCurrentDay));
    CommonFunctions.closeDatePicker(fixture);

    component.rangeStart = component.rangeEnd = undefined;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    CommonFunctions.openDatePicker(fixture, 'right');
    rightDayListEle = wrapperEle.querySelectorAll('tbody')[1];
    rightCurrentDayInListEle = rightDayListEle.querySelectorAll('.devui-day')[7];
    rightCurrentDay = rightCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
    CommonFunctions.tickEvent(rightCurrentDayInListEle, new Event('click'), fixture);
    expect(component.getValue).toHaveBeenCalled();
    expect(component.rightInputEle.nativeElement[valueParam]).toBe(`${CommonFunctions.strDateOrFromNow([0, 1, 0], rightCurrentDay)}`);
    CommonFunctions.openDatePicker(fixture);
    leftDayListEle = wrapperEle.querySelectorAll('tbody')[0];
    leftCurrentDayInListEle = leftDayListEle.querySelectorAll('.devui-day')[7];
    leftCurrentDay = leftCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
    CommonFunctions.tickEvent(leftCurrentDayInListEle, new Event('click'), fixture);
    expect(component.leftInputEle.nativeElement[valueParam]).toBe(`${CommonFunctions.strDateOrFromNow([0, 0, 0], leftCurrentDay)}`);
    expect(component.rangeStart).toEqual(new Date(new Date().getFullYear(), new Date().getMonth(), leftCurrentDay));
    expect(component.rangeEnd).toEqual(new Date(new Date().getFullYear(), new Date().getMonth() + 1, rightCurrentDay));
    CommonFunctions.closeDatePicker(fixture);

    component.rangeStart = component.rangeEnd = undefined;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    CommonFunctions.openDatePicker(fixture);
    rightDayListEle = wrapperEle.querySelectorAll('tbody')[1];
    rightCurrentDayInListEle = rightDayListEle.querySelectorAll('.devui-day')[7];
    rightCurrentDay = rightCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
    CommonFunctions.tickEvent(rightCurrentDayInListEle, new Event('click'), fixture);
    expect(component.getValue).toHaveBeenCalled();
    expect(component.leftInputEle.nativeElement[valueParam]).toBe(`${CommonFunctions.strDateOrFromNow([0, 1, 0], rightCurrentDay)}`);
    leftDayListEle = wrapperEle.querySelectorAll('tbody')[0];
    leftCurrentDayInListEle = leftDayListEle.querySelectorAll('.devui-day')[7];
    leftCurrentDay = leftCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
    CommonFunctions.tickEvent(leftCurrentDayInListEle, new Event('click'), fixture);
    expect(component.leftInputEle.nativeElement[valueParam]).toBe(``);
    expect(component.rightInputEle.nativeElement[valueParam]).toBe(`${CommonFunctions.strDateOrFromNow([0, 0, 0], leftCurrentDay)}`);
    expect(component.rangeEnd).toEqual(new Date(new Date().getFullYear(), new Date().getMonth(), leftCurrentDay));
    CommonFunctions.closeDatePicker(fixture);

    component.rangeStart = component.rangeEnd = undefined;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    CommonFunctions.openDatePicker(fixture, 'right');
    leftDayListEle = wrapperEle.querySelectorAll('tbody')[0];
    leftCurrentDayInListEle = leftDayListEle.querySelectorAll('.devui-day')[7];
    leftCurrentDay = leftCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
    CommonFunctions.tickEvent(leftCurrentDayInListEle, new Event('click'), fixture);
    expect(component.getValue).toHaveBeenCalled();
    expect(component.rightInputEle.nativeElement[valueParam]).toBe(`${CommonFunctions.strDateOrFromNow([0, 0, 0], leftCurrentDay)}`);
    CommonFunctions.openDatePicker(fixture);
    rightDayListEle = wrapperEle.querySelectorAll('tbody')[1];
    rightCurrentDayInListEle = rightDayListEle.querySelectorAll('.devui-day')[8];
    rightCurrentDay = rightCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
    CommonFunctions.tickEvent(rightCurrentDayInListEle, new Event('click'), fixture);
    expect(component.leftInputEle.nativeElement[valueParam]).toBe(`${CommonFunctions.strDateOrFromNow([0, 0, 0], rightCurrentDay)}`);
    expect(component.rightInputEle.nativeElement[valueParam]).toBe(``);
    expect(component.rangeStart).toEqual(new Date(new Date().getFullYear(), new Date().getMonth(), rightCurrentDay));
    CommonFunctions.closeDatePicker(fixture);

    if (isInput) {
      component.rangeStart = new Date();
      component.rangeEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      CommonFunctions.openDatePicker(fixture);
      leftDayListEle = wrapperEle.querySelectorAll('tbody')[0];
      rightDayListEle = wrapperEle.querySelectorAll('tbody')[1];
      leftCurrentDayInListEle = leftDayListEle.querySelector('.active');
      rightCurrentDayInListEle = rightDayListEle.querySelector('.active');
      leftCurrentDay = leftCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
      rightCurrentDay = rightCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
      expect(component.leftInputEle.nativeElement[valueParam]).toBe(`${CommonFunctions.strDateOrFromNow([0, 0, 0])}`);
      expect(component.rightInputEle.nativeElement[valueParam]).toBe(`${CommonFunctions.strDateOrFromNow([0, 1, 0])}`);
      expect(Number(leftCurrentDay)).toBe(new Date().getDate());
      expect(Number(rightCurrentDay)).toBe(new Date(CommonFunctions.strDateOrFromNow([0, 1, 0])).getDate());
      CommonFunctions.closeDatePicker(fixture);
      component.leftInputEle.nativeElement.value = `${CommonFunctions.strDateOrFromNow([0, 0, 0], '05')}`;
      component.rightInputEle.nativeElement.value = `${CommonFunctions.strDateOrFromNow([0, 1, 0], '05')}`;
      CommonFunctions.tickEvent(component.leftInputEle.nativeElement, new KeyboardEvent('keyup', { key: 'Enter' }), fixture, 1000);
      CommonFunctions.tickEvent(component.leftInputEle.nativeElement, new Event('blur'), fixture, 1000);
      CommonFunctions.tickEvent(component.rightInputEle.nativeElement, new KeyboardEvent('keyup', { key: 'Enter' }), fixture, 1000);
      CommonFunctions.tickEvent(component.rightInputEle.nativeElement, new Event('blur'), fixture, 1000);
      CommonFunctions.openDatePicker(fixture);
      leftDayListEle = wrapperEle.querySelectorAll('tbody')[0];
      rightDayListEle = wrapperEle.querySelectorAll('tbody')[1];
      leftCurrentDayInListEle = leftDayListEle.querySelector('.active');
      rightCurrentDayInListEle = rightDayListEle.querySelector('.active');
      leftCurrentDay = leftCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
      rightCurrentDay = rightCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
      expect(component.rangeStart).toEqual(new Date(new Date().getFullYear(), new Date().getMonth(), 5));
      expect(component.rangeEnd).toEqual(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5));
      expect(leftCurrentDay).toBe('05');
      expect(rightCurrentDay).toBe('05');
      CommonFunctions.closeDatePicker(fixture);

      component.leftInputEle.nativeElement.value = `${CommonFunctions.strDateOrFromNow([0, 0, 0], '05')}`;
      component.rightInputEle.nativeElement.value = `${CommonFunctions.strDateOrFromNow([0, 1, 0], '05')}`;

      CommonFunctions.tickEvent(component.leftInputEle.nativeElement, new KeyboardEvent('keyup', { key: 'Enter' }), fixture, 1000);
      CommonFunctions.tickEvent(component.leftInputEle.nativeElement, new Event('blur'), fixture, 1000);
      CommonFunctions.tickEvent(component.rightInputEle.nativeElement, new KeyboardEvent('keyup', { key: 'Enter' }), fixture, 1000);
      CommonFunctions.tickEvent(component.rightInputEle.nativeElement, new Event('blur'), fixture, 1000);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(component.leftInputEle.nativeElement.value).toBe(`${CommonFunctions.strDateOrFromNow([0, 0, 0], '05')}`);
      expect(component.rightInputEle.nativeElement.value).toBe(`${CommonFunctions.strDateOrFromNow([0, 1, 0], '05')}`);

      component.leftInputEle.nativeElement.value = '';
      component.rightInputEle.nativeElement.value = '';
      CommonFunctions.tickEvent(component.leftInputEle.nativeElement, new Event('input'), fixture, 1000);
      CommonFunctions.tickEvent(component.leftInputEle.nativeElement, new Event('blur'), fixture, 1000);
      CommonFunctions.tickEvent(component.rightInputEle.nativeElement, new Event('input'), fixture, 1000);
      CommonFunctions.tickEvent(component.rightInputEle.nativeElement, new Event('blur'), fixture, 1000);
      expect(component.leftInputEle.nativeElement.value).toBe('');
      expect(component.rightInputEle.nativeElement.value).toBe('');
      expect(component.getValue).toHaveBeenCalled();

      component.leftInputEle.nativeElement.value = '';
      component.rightInputEle.nativeElement.value = '';
      CommonFunctions.tickEvent(component.leftInputEle.nativeElement, new Event('input'), fixture, 1000);
      CommonFunctions.tickEvent(component.leftInputEle.nativeElement, new Event('blur'), fixture, 1000);
      CommonFunctions.tickEvent(component.rightInputEle.nativeElement, new Event('input'), fixture, 1000);
      CommonFunctions.tickEvent(component.rightInputEle.nativeElement, new Event('blur'), fixture, 1000);
      expect(component.leftInputEle.nativeElement.value).toBe('');
      expect(component.rightInputEle.nativeElement.value).toBe('');
    }
  }

  static testInputParam(fixture, wrapperEle, component) {
    component.cssClass = 'test-class';
    component.dateFormat = 'MM.dd.y';
    component.minDate = new Date();
    component.maxDate = new Date();
    component.maxDate.setMonth(component.maxDate.getMonth() + 1);
    fixture.detectChanges();

    const minDate = component.minDate;
    let maxDate = new Date(component.maxDate);
    maxDate.setDate(maxDate.getDate() + 1);
    maxDate = component.maxDate;
    component.rangeStart = minDate;
    component.rangeEnd = maxDate;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    CommonFunctions.openDatePicker(fixture);
    // cssClass
    expect(wrapperEle.querySelector('.test-class')).toBeTruthy();
    // minDate、maxDate
    const currentDayInListEle = this.testMinMax(fixture, wrapperEle, minDate, maxDate);
    // dateFormat
    const leftCurrentDayInListEle = currentDayInListEle.left;
    const rightCurrentDayInListEle = currentDayInListEle.right;
    CommonFunctions.tickEvent(leftCurrentDayInListEle, new Event('click'), fixture);
    CommonFunctions.tickEvent(rightCurrentDayInListEle, new Event('click'), fixture);
    expect(component.getValue).toHaveBeenCalled();
    expect(component.leftInputEle.nativeElement.value)
      .toBe(`${CommonFunctions.strDateOrFromNow([0, 0, 0], undefined, ['mm', 'dd', 'yy'], '.')}`);
    expect(component.rightInputEle.nativeElement.value)
      .toBe(`${CommonFunctions.strDateOrFromNow([0, 1, 0], undefined, ['mm', 'dd', 'yy'], '.')}`);
    CommonFunctions.closeDatePicker(fixture);

    // 今天不在minDate、maxDate之中
    component.minDate.setDate(component.minDate - 2);
    component.maxDate = component.minDate;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    CommonFunctions.openDatePicker(fixture);
    const footer = document.querySelector('.devui-two-date-footer');
    const todayBtn = footer.querySelector('a');
    CommonFunctions.tickEvent(todayBtn, new Event('click'), fixture);
    expect(component.leftInputEle.nativeElement.value)
      .toBe(`${CommonFunctions.strDateOrFromNow([0, 0, 0], undefined, ['mm', 'dd', 'yy'], '.')}`);
    CommonFunctions.tickEvent(todayBtn, new Event('click'), fixture);
    expect(component.rightInputEle.nativeElement.value)
      .toBe(`${CommonFunctions.strDateOrFromNow([0, 1, 0], undefined, ['mm', 'dd', 'yy'], '.')}`);

    CommonFunctions.closeDatePicker(fixture);
  }

  static testDateConfig(fixture, wrapperEle, component, year = 2020, shouldWorks = true) {
    const minDate = new Date(year, 0, 1, 0, 0, 0);
    const maxDate = new Date(year, 11, 31, 23, 59, 59);
    component.rangeStart = minDate;
    component.rangeEnd = maxDate;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    CommonFunctions.openDatePicker(fixture);
    const currentDayInListEle = this.testMinMax(fixture, wrapperEle, minDate, maxDate);
    const leftCurrentDayInListEle = currentDayInListEle.left;
    const rightCurrentDayInListEle = currentDayInListEle.right;
    CommonFunctions.tickEvent(leftCurrentDayInListEle, new Event('click'), fixture);
    CommonFunctions.tickEvent(rightCurrentDayInListEle, new Event('click'), fixture);
    expect(component.getValue).toHaveBeenCalled();
    if (shouldWorks) {
      expect(component.leftInputEle.nativeElement.value)
        .toBe(`${CommonFunctions.strDateOrFromNow(minDate, undefined, ['mm', 'dd', 'yy'], '.')}`);
      expect(component.rightInputEle.nativeElement.value)
        .toBe(`${CommonFunctions.strDateOrFromNow(maxDate, undefined, ['mm', 'dd', 'yy'], '.')}`);
    } else {
      expect(component.leftInputEle.nativeElement.value)
        .not.toBe(`${CommonFunctions.strDateOrFromNow(minDate, undefined, ['mm', 'dd', 'yy'], '.')}`);
      expect(component.rightInputEle.nativeElement.value)
        .not.toBe(`${CommonFunctions.strDateOrFromNow(maxDate, undefined, ['mm', 'dd', 'yy'], '.')}`);
    }
    CommonFunctions.closeDatePicker(fixture);
  }

  static testMinMax(fixture, wrapperEle, minDate, maxDate) {
    const leftDayListEle = wrapperEle.querySelectorAll('tbody')[0];
    const rightDayListEle = wrapperEle.querySelectorAll('tbody')[1];
    let leftCurrentDayInListEle;
    let rightCurrentDayInListEle;
    for (const dayEl of leftDayListEle.querySelectorAll('.devui-in-month-day')) {
      const dayNumber = Number(dayEl.querySelector('.devui-calendar-date').textContent.trim());
      if (dayNumber === (minDate.getDate() - 1)) {
        expect(dayEl.classList).toContain('disabled');
      } else if (dayNumber === (minDate.getDate())) {
        leftCurrentDayInListEle = dayEl;
      }
    }
    const rightMonth = CommonFunctions.resolveMonth(wrapperEle.querySelectorAll('.devui-date-title')[3].textContent.trim());
    if (String(maxDate.getMonth() + 1) !== rightMonth) {
      const nextMonthBtn = wrapperEle.querySelectorAll('.devui-calender-header')[1].querySelectorAll('.devui-btn-link')[2];
      CommonFunctions.tickEvent(nextMonthBtn, new Event('click'), fixture);
    }
    for (const dayEl of rightDayListEle.querySelectorAll('.devui-in-month-day')) {
      const dayNumber = Number(dayEl.querySelector('.devui-calendar-date').textContent.trim());
      if (dayNumber === (maxDate.getDate() + 1)) {
        expect(dayEl.classList).toContain('disabled');
      } else if (dayNumber === (maxDate.getDate())) {
        rightCurrentDayInListEle = dayEl;
      }
    }
    return {
      left: leftCurrentDayInListEle,
      right: rightCurrentDayInListEle
    };
  }
}

@Component({
  template: `
    <div class="place-holder" (click)="twoDatePicker.toggle()" [style.height]="placeHolderHeight ? '900px' : '0'">this is place holder</div>
    <div
      class="two-date-wrapper"
      dTwoDatePicker
      #twoDatePicker="twoDatePicker"
      [cssClass]="cssClass"
      [disabled]="disabled"
      [hideOnRangeSelected]="hideOnRangeSelected"
      [dateConfig]="dateConfig"
      [dateFormat]="dateFormat"
      [minDate]="minDate"
      [maxDate]="maxDate"
      (selectedRangeChange)="getValue('range', $event)"
    >
      <div class="devui-input-group devui-dropdown-origin">
        <input
          class="devui-input devui-form-control"
          placeholder="y/MM/dd"
          [(ngModel)]="rangeStart"
          dTwoDatePickerStart
          #startPicker="twoDatePickerStart"
          (selectStart)="getValue('start', $event)"
          (click)="startPicker.toggle()"
          #leftInputEle
        />
        <div [style.display]="rangeStart ? 'block' : 'none'" 
        class="devui-input-group-addon close-icon-wrapper" 
        (click)="startPicker.clear()">
          <i class="icon icon-close"></i>
        </div>
        <div class="devui-input-group-addon" (click)="startPicker.toggle()">
          <i class="icon icon-calendar"></i>
        </div>
      </div>
      <div class="devui-input-group devui-dropdown-origin">
        <input
          class="devui-input devui-form-control"
          placeholder="y/MM/dd"
          [(ngModel)]="rangeEnd"
          dTwoDatePickerEnd
          #endPicker="twoDatePickerEnd"
          (selectEnd)="getValue('end', $event)"
          (click)="endPicker.toggle()"
          #rightInputEle
        />
        <div [style.display]="rangeEnd ? 'block' : 'none'" class="devui-input-group-addon close-icon-wrapper" (click)="endPicker.clear()">
          <i class="icon icon-close"></i>
        </div>
        <div class="devui-input-group-addon" (click)="endPicker.toggle()">
          <i class="icon icon-calendar"></i>
        </div>
      </div>
    </div>
  `,
})
class TestTwoDatePickerComponent {
  rangeStart = null;
  rangeEnd = null;

  @ViewChild('leftInputEle', { read: ElementRef }) leftInputEle: ElementRef;
  @ViewChild('rightInputEle', { read: ElementRef }) rightInputEle: ElementRef;

  cssClass: string;
  disabled: boolean;
  hideOnRangeSelected = true;
  dateConfig;
  dateFormat = 'y/MM/dd';
  minDate = new Date('01/01/1900 00:00:00');
  maxDate = new Date('11/31/2099 23:59:59');

  getValue = jasmine.createSpy('get value');

  constructor() { }
}

@Component({
  template: `
    <div
      class="two-date-wrapper"
      dTwoDatePicker
      #twoDatePicker="twoDatePicker"
      (selectedRangeChange)="getValue('range', $event)"
    >
      <div
        dTwoDatePickerStart
        #startPicker="twoDatePickerStart"
        [(ngModel)]="rangeStart"
        (selectStart)="getValue('start', $event)"
        (click)="startPicker.toggle()"
        #leftInputEle
      >{{rangeStart || 'Start'}}</div>
      <div
        dTwoDatePickerEnd
        #endPicker="twoDatePickerEnd"
        [(ngModel)]="rangeEnd"
        (selectEnd)="getValue('end', $event)"
        (click)="endPicker.toggle()"
        #rightInputEle
      >{{rangeEnd || 'End'}}</div>
    </div>
  `,
})
class TestTwoDatePickerDivComponent {
  rangeStart = null;
  rangeEnd = null;

  @ViewChild('leftInputEle', { read: ElementRef }) leftInputEle: ElementRef;
  @ViewChild('rightInputEle', { read: ElementRef }) rightInputEle: ElementRef;

  getValue = jasmine.createSpy('get value');

  constructor() { }
}

describe('twoDatePicker', () => {
  let fixture: ComponentFixture<TestTwoDatePickerComponent>;
  let debugEl: DebugElement;
  let component: TestTwoDatePickerComponent;
  let domHelper: DomHelper<TestTwoDatePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DatepickerModule, NoopAnimationsModule, FormsModule],
      declarations: [TestTwoDatePickerComponent]
    }).compileComponents();
  }));

  describe('basic param', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestTwoDatePickerComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;

      domHelper = new DomHelper(fixture);
      fixture.detectChanges();
    });

    it('should datePicker show, should hideOnRangeSelected works', fakeAsync(() => {
      CommonFunctions.openDatePicker(fixture, 'right');
      const classList = [
        '.devui-two-date-wrapper', '.devui-two-date-picker', '.devui-date-picker',
        '.devui-month-view', '.devui-month-view-table',
        '.devui-calender-header', '.devui-week-header',
        '.devui-day', '.devui-out-of-month', '.devui-in-month-day', '.devui-calendar-date'
      ];
      expect(domHelper.judgeAppendToBodyStyleClasses(classList)).toBeTruthy();

      // 上面打开了结束日期
      // 点击开始日期打开开始面板
      CommonFunctions.openDatePicker(fixture);
      let twoDatePicker = document.querySelector('.devui-two-date-wrapper');
      expect(twoDatePicker).toBeTruthy();
      // 点击结束日期打开结束面板
      CommonFunctions.openDatePicker(fixture, 'right');
      twoDatePicker = document.querySelector('.devui-two-date-wrapper');
      expect(twoDatePicker).toBeTruthy();
      // 点击结束日期关闭面板
      CommonFunctions.openDatePicker(fixture, 'right');
      twoDatePicker = document.querySelector('.devui-two-date-wrapper');
      expect(twoDatePicker).toBeFalsy();
      // 点击开始日期打开开始面板
      CommonFunctions.openDatePicker(fixture);
      twoDatePicker = document.querySelector('.devui-two-date-wrapper');
      expect(twoDatePicker).toBeTruthy();
      // 点击开始日期关闭面板
      CommonFunctions.openDatePicker(fixture);
      twoDatePicker = document.querySelector('.devui-two-date-wrapper');
      expect(twoDatePicker).toBeFalsy();
      // 触发twoDatePicker的toggle打开面板
      CommonFunctions.tickEvent(debugEl.query(By.css('.place-holder')).nativeElement, new Event('click'), fixture);
      twoDatePicker = document.querySelector('.devui-two-date-wrapper');
      expect(twoDatePicker).toBeTruthy();
      // 点击日期内部不关闭面板
      CommonFunctions.tickEvent(debugEl.query(By.css('.devui-two-date-wrapper')).nativeElement, new Event('click'), fixture);
      twoDatePicker = document.querySelector('.devui-two-date-wrapper');
      expect(twoDatePicker).toBeTruthy();
      CommonFunctions.closeDatePicker(fixture);

      CommonFunctions.openDatePicker(fixture);
      CommonFunctions.closeDatePicker(fixture);
      twoDatePicker = document.querySelector('.devui-two-date-wrapper');
      expect(twoDatePicker).toBeFalsy();

      component.hideOnRangeSelected = false;
      fixture.detectChanges();
      CommonFunctions.openDatePicker(fixture);
      const leftDayListEle = document.querySelectorAll('tbody')[0];
      const rightDayListEle = document.querySelectorAll('tbody')[1];
      const leftCurrentDayInListEle = leftDayListEle.querySelectorAll('.devui-day')[7];
      const rightCurrentDayInListEle = rightDayListEle.querySelectorAll('.devui-day')[7];
      CommonFunctions.tickEvent(leftCurrentDayInListEle, new Event('click'), fixture);
      CommonFunctions.tickEvent(rightCurrentDayInListEle, new Event('click'), fixture);
      expect(component.getValue).toHaveBeenCalled();
      twoDatePicker = document.querySelector('.devui-two-date-wrapper');
      expect(twoDatePicker).toBeTruthy();
      CommonFunctions.closeDatePicker(fixture);
      twoDatePicker = document.querySelector('.devui-two-date-wrapper');
      expect(twoDatePicker).toBeFalsy();
    }));

    it('should ngModel works, should change year and month works', fakeAsync(() => {
      TestFunctions.testNgModelAndYearMonth(fixture, document, component);
    }));

    it('should basic @Input works', fakeAsync(() => {
      TestFunctions.testInputParam(fixture, document, component);
    }));

    it('should @Input disabled works', fakeAsync(() => {
      component.disabled = true;
      fixture.detectChanges();
      CommonFunctions.openDatePicker(fixture);

      const leftDayListEle = document.querySelectorAll('tbody')[0];
      const rightDayListEle = document.querySelectorAll('tbody')[1];
      const leftCurrentDayInListEle = leftDayListEle.querySelectorAll('.devui-day')[7];
      const rightCurrentDayInListEle = rightDayListEle.querySelectorAll('.devui-day')[7];
      leftDayListEle.querySelectorAll('.devui-in-month-day').forEach((dayEl) => {
        expect(dayEl.classList).toContain('disabled');
      });
      rightDayListEle.querySelectorAll('.devui-in-month-day').forEach((dayEl) => {
        expect(dayEl.classList).toContain('disabled');
      });
      CommonFunctions.tickEvent(leftCurrentDayInListEle, new Event('click'), fixture);
      CommonFunctions.tickEvent(rightCurrentDayInListEle, new Event('click'), fixture);
      expect(component.leftInputEle.nativeElement.value).toBe(``);
      expect(component.rightInputEle.nativeElement.value).toBe(``);
      expect(component.rangeStart).toBeFalsy();
      expect(component.rangeEnd).toBeFalsy();

      CommonFunctions.closeDatePicker(fixture);
    }));

    it('should default buttons works', fakeAsync(() => {
      CommonFunctions.openDatePicker(fixture);
      let footer = document.querySelector('.devui-two-date-footer');
      let todayBtn = footer.querySelector('a');

      CommonFunctions.tickEvent(todayBtn, new Event('click'), fixture);
      expect(component.leftInputEle.nativeElement.value).toBe(`${CommonFunctions.strDateOrFromNow([0, 0, 0])}`);
      CommonFunctions.tickEvent(todayBtn, new Event('click'), fixture);
      expect(component.rightInputEle.nativeElement.value).toBe(`${CommonFunctions.strDateOrFromNow([0, 0, 0])}`);
      CommonFunctions.openDatePicker(fixture);

      footer = document.querySelector('.devui-two-date-footer');
      const clearBtn = footer.querySelector('button');

      CommonFunctions.tickEvent(clearBtn, new Event('click'), fixture);
      expect(component.leftInputEle.nativeElement.value).toBe('');
      CommonFunctions.tickEvent(clearBtn, new Event('click'), fixture);
      expect(component.rightInputEle.nativeElement.value).toBe('');
      CommonFunctions.closeDatePicker(fixture);

      CommonFunctions.openDatePicker(fixture);
      CommonFunctions.tickEvent(todayBtn, new Event('click'), fixture);
      CommonFunctions.tickEvent(todayBtn, new Event('click'), fixture);
      const leftClearBtn = debugEl.queryAll(By.css('.close-icon-wrapper'))[0].nativeElement;
      const rightClearBtn = debugEl.queryAll(By.css('.close-icon-wrapper'))[1].nativeElement;
      footer = document.querySelector('.devui-two-date-footer');
      todayBtn = footer.querySelector('a');
      CommonFunctions.tickEvent(leftClearBtn, new Event('click'), fixture);
      expect(component.leftInputEle.nativeElement.value).toBe('');
      CommonFunctions.tickEvent(rightClearBtn, new Event('click'), fixture);
      expect(component.rightInputEle.nativeElement.value).toBe('');
      CommonFunctions.closeDatePicker(fixture);
    }));
  });

  describe('param need change when init', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestTwoDatePickerComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;
    });

    describe('should dateConfig works', () => {
      const year = 2020;
      beforeEach(() => {
        component.dateConfig = {
          timePicker: false,
          dateConverter: null,
          min: year,
          max: year,
          format: {
            date: 'MM.dd.y',
            time: 'MM.dd.y mm-ss-HH'
          }
        };
        component.dateFormat = undefined;
        component.minDate = undefined;
        component.maxDate = undefined;
      });

      it('should dateConfig works', fakeAsync(() => {
        fixture.detectChanges();
        TestFunctions.testDateConfig(fixture, document, component, year);
      }));
    });

    describe('wrong dateConfig should not work', () => {
      const year = 2020;
      beforeEach(() => {
        component.dateConfig = {
          timePicker: false,
          dateConverter: null,
          min: year,
          max: year
        };
        component.dateFormat = undefined;
        component.minDate = undefined;
        component.maxDate = undefined;
      });

      it('dateConfig should not work', fakeAsync(() => {
        fixture.detectChanges();
        TestFunctions.testDateConfig(fixture, document, component, year, false);
      }));
    });
  });
});

describe('twoDatePickerDiv', () => {
  let fixture: ComponentFixture<TestTwoDatePickerDivComponent>;
  let debugEl: DebugElement;
  let component: TestTwoDatePickerDivComponent;
  let domHelper: DomHelper<TestTwoDatePickerDivComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DatepickerModule, NoopAnimationsModule, FormsModule],
      declarations: [TestTwoDatePickerDivComponent],
      providers: [],
    }).compileComponents();
  }));

  describe('basic param', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestTwoDatePickerDivComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;

      domHelper = new DomHelper(fixture);
      fixture.detectChanges();
    });

    it('should datePicker show, should hideOnRangeSelected works', fakeAsync(() => {
      expect(component.leftInputEle.nativeElement.innerText).toBe('Start');
      expect(component.rightInputEle.nativeElement.innerText).toBe('End');

      CommonFunctions.openDatePicker(fixture, 'left');
      let twoDatePicker = document.querySelector('.devui-two-date-wrapper');
      expect(twoDatePicker).toBeTruthy();

      CommonFunctions.closeDatePicker(fixture);
      twoDatePicker = document.querySelector('.devui-two-date-wrapper');
      expect(twoDatePicker).toBeFalsy();
    }));

    it('test ngModel', fakeAsync(() => {
      TestFunctions.testNgModelAndYearMonth(fixture, document, component, false);
    }));
  });
});
