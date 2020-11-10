import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, Component, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DomHelper } from '../utils/testing/dom-helper';
import * as EventHelper from '../utils/testing/event-helper';

import { DatepickerModule } from './datepicker.module';

@Component({
  template: `
    <div class="devui-input-group devui-dropdown-origin-wrapper devui-dropdown-origin">
      <input
        #inputEle
        class="devui-input devui-form-control"
        dDatepicker
        (focus)="datePicker1.toggle($event)"
        [(ngModel)]="selectedDate1"
        #datePicker1="datepicker"
        (selectedDateChange)="getValue($event)"

        [cssClass]="cssClass"
        [showTime]="showTime"
        [disabled]="disabled"
        [direction]="direction"
        [dateConfig]="dateConfig"
        [dateFormat]="dateFormat"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [autoOpen]="autoOpen"
        [customViewTemplate]="customViewTemplate"
      />
      <div *ngIf="selectedDate1" class="devui-input-group-addon icon-close-wrapper" (click)="datePicker1.clearAll()">
        <i class="icon icon-close"></i>
      </div>
      <div class="devui-input-group-addon" (click)="datePicker1.toggle($event, true)">
        <i class="icon icon-calendar"></i>
      </div>
    </div>
    <ng-template #myCustomView>
      <div class="test-template">test template</div>
    </ng-template>
  `,
})
class TestDatePickerDirectiveComponent {
  selectedDate1;
  @ViewChild('inputEle', {read: ElementRef}) inputEle: ElementRef;
  @ViewChild('myCustomView') myCustomView: TemplateRef<any>;

  cssClass = '';
  disabled = false;
  direction = 'down';
  dateConfig;
  dateFormat = 'y/MM/dd';
  minDate = new Date('01/01/1900 00:00:00');
  maxDate = new Date('11/31/2099 23:59:59');
  autoOpen = false;
  customViewTemplate;
  showTime = false;

  getValue = jasmine.createSpy('get value');

  constructor() {}
}

@Component({
  template: `
    <div class="devui-input-group devui-dropdown-origin-wrapper devui-dropdown-origin">
      <input
        #inputEle
        class="devui-input devui-form-control"
        dDatepicker
        (focus)="datePicker1.toggle($event)"
        [ngModel]="selectedDate1"
        (ngModelChange)="setValue($event)"
        #datePicker1="datepicker"
        (selectedDateChange)="getValue($event)"
        appendToBody

        [cssClass]="cssClass"
        [showTime]="showTime"
        [disabled]="disabled"
        [dateConfig]="dateConfig"
        [dateFormat]="dateFormat"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [autoOpen]="autoOpen"
        [customViewTemplate]="customViewTemplate"
      />
      <div *ngIf="selectedDate1" class="devui-input-group-addon icon-close-wrapper" (click)="datePicker1.clearAll()">
        <i class="icon icon-close"></i>
      </div>
      <div class="devui-input-group-addon" (click)="datePicker1.toggle($event, true)">
        <i class="icon icon-calendar"></i>
      </div>
    </div>
    <ng-template #myCustomView>
      <div class="test-template">test template</div>
    </ng-template>
  `,
})
class TestDatePickerAppendToBodyComponent {
  selectedDate1;
  @ViewChild('inputEle', { read: ElementRef }) inputEle: ElementRef;
  @ViewChild('myCustomView') myCustomView: TemplateRef<any>;

  cssClass = '';
  disabled = false;
  dateConfig;
  dateFormat = 'y/MM/dd';
  minDate = new Date('01/01/1900 00:00:00');
  maxDate = new Date('11/31/2099 23:59:59');
  autoOpen = false;
  customViewTemplate;
  showTime = false;

  getValue = jasmine.createSpy('get value');

  setValue(event) {
    setTimeout(() => {
      this.selectedDate1 = event;
    });
  }

  constructor() {}
}

describe('datePicker', () => {
  describe('directive', () => {
    let fixture: ComponentFixture<TestDatePickerDirectiveComponent>;
    let debugEl: DebugElement;
    let component: TestDatePickerDirectiveComponent;
    let domHelper: DomHelper<TestDatePickerDirectiveComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [DatepickerModule, NoopAnimationsModule, FormsModule],
        declarations: [TestDatePickerDirectiveComponent],
        providers: [],
      }).compileComponents();
    }));

    describe('basic param', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(TestDatePickerDirectiveComponent);
        debugEl = fixture.debugElement;
        component = debugEl.componentInstance;

        domHelper = new DomHelper(fixture);
        fixture.detectChanges();
      });

      it('should datePicker show', fakeAsync(() => {
        tickEvent(component.inputEle.nativeElement, new Event('focus'), fixture);
        const classList = [
          '.devui-month-view', '.devui-month-view-table',
          '.devui-date-header', '.devui-week-header',
          '.devui-day', '.devui-out-of-month', '.devui-in-month-day', '.devui-calendar-date',
          '.time-picker-view'
        ];
        expect(domHelper.judgeStyleClasses(classList)).toBeTruthy();

        const datePicker = debugEl.nativeElement.querySelector('d-datepicker');
        expect(datePicker.style.display).not.toBe('none');

        closeDatePicker(fixture);
        expect(datePicker.style.display).toBe('none');
      }));

      it('should ngModel works, should change year and month works', fakeAsync(() => {
        testNgModelAndYearMonth(fixture, debugEl.nativeElement, component);
      }));

      it('should @Input works', fakeAsync(() => {
        testInputParam(fixture, debugEl.nativeElement, component);
      }));
    });

    describe('param need change when init', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(TestDatePickerDirectiveComponent);
        debugEl = fixture.debugElement;
        component = debugEl.componentInstance;

        domHelper = new DomHelper(fixture);
      });

      describe('first component change', () => {
        beforeEach(() => {
          component.direction = 'up';
          component.autoOpen = true;
          component.showTime = true;
          component.dateFormat = 'y/MM/dd HH:mm:ss';
        });

        it('should autoOpen/direction works', fakeAsync(() => {
          fixture.detectChanges();
          const datePicker = debugEl.nativeElement.querySelector('d-datepicker');

          expect(datePicker.style.display).not.toBe('none');
          expect(datePicker.style.bottom).not.toBe('none');

          closeDatePicker(fixture);
        }));

        it('should showTime works', fakeAsync(() => {
          testTimePicker(fixture, debugEl.nativeElement, component);
        }));
      });

      describe('second component change', () => {
        beforeEach(() => {
          component.showTime = undefined;
          component.dateFormat = undefined;
          component.dateConfig = {
            timePicker: true,
            dateConverter: null,
            min: 2020,
            max: 2020,
            format: {
              date: 'MM.dd.y',
              time: 'MM.dd.y mm-ss-HH'
            }
          };
          component.autoOpen = true;
        });

        it('should dateConfig works', fakeAsync(() => {
          testDateConfig(fixture, debugEl.nativeElement, component);
        }));
      });
    });
  });

  describe('appendToBody', () => {
    let fixture: ComponentFixture<TestDatePickerAppendToBodyComponent>;
    let debugEl: DebugElement;
    let component: TestDatePickerAppendToBodyComponent;
    let domHelper: DomHelper<TestDatePickerAppendToBodyComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [DatepickerModule, NoopAnimationsModule, FormsModule],
        declarations: [TestDatePickerAppendToBodyComponent],
        providers: [],
      }).compileComponents();
    }));

    describe('basic param', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(TestDatePickerAppendToBodyComponent);
        debugEl = fixture.debugElement;
        component = debugEl.componentInstance;

        domHelper = new DomHelper(fixture);
        fixture.detectChanges();
      });

      it('should datePicker show', fakeAsync(() => {
        tickEvent(component.inputEle.nativeElement, new Event('focus'), fixture);
        const classList = [
          '.devui-month-view', '.devui-month-view-table',
          '.devui-date-header', '.devui-week-header',
          '.devui-day', '.devui-out-of-month', '.devui-in-month-day', '.devui-calendar-date',
          '.time-picker-view'
        ];
        expect(domHelper.judgeAppendToBodyStyleClasses(classList)).toBeTruthy();

        let datePicker = document.querySelector('d-datepicker');
        expect(datePicker).toBeTruthy();

        closeDatePicker(fixture);
        datePicker = document.querySelector('d-datepicker');
        expect(datePicker).toBeFalsy();
      }));

      it('should ngModel works, should change year and month works', fakeAsync(() => {
        testNgModelAndYearMonth(fixture, document, component);
      }));

      it('should @Input works', fakeAsync(() => {
        testInputParam(fixture, document, component);
      }));
    });

    describe('param need change when init', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(TestDatePickerAppendToBodyComponent);
        debugEl = fixture.debugElement;
        component = debugEl.componentInstance;

        domHelper = new DomHelper(fixture);
      });

      describe('first component change', () => {
        beforeEach(() => {
          component.autoOpen = true;
          component.showTime = true;
          component.dateFormat = 'y/MM/dd HH:mm:ss';
        });

        it('should autoOpen works', fakeAsync(() => {
          fixture.detectChanges();
          const datePicker = document.querySelector('d-datepicker');

          expect(datePicker).toBeTruthy();

          closeDatePicker(fixture);
        }));

        it('should showTime works', fakeAsync(() => {
          testTimePicker(fixture, document, component);
        }));
      });

      describe('second component change', () => {
        beforeEach(() => {
          component.showTime = undefined;
          component.dateFormat = undefined;
          component.dateConfig = {
            timePicker: true,
            dateConverter: null,
            min: 2020,
            max: 2020,
            format: {
              date: 'MM.dd.y',
              time: 'MM.dd.y mm-ss-HH'
            }
          };
          component.autoOpen = true;
        });

        it('should dateConfig works', fakeAsync(() => {
          testDateConfig(fixture, document, component);
        }));
      });
    });
  });
});

function padZero(value) {
  return (value + '').padStart(2, '0');
}

function resolveMonth(str) {
  if (str.length === 3) {
    return str.slice(0, 2);
  } else if (str.length === 2) {
    if (isNaN(Number(str))) {
      return str.slice(0, 1);
    } else {
      return str;
    }
  } else if (str.length === 1) {
    return str;
  }
}

function closeDatePicker(fixture) {
  tickEvent(document, new Event('click'), fixture);
}

function tickEvent(el, event, fixture, delay?: number): void {
  el.dispatchEvent(event);
  fixture.detectChanges();
  if (delay) {
    tick(delay);
  } else {
    tick();
  }
  fixture.detectChanges();
}

function testNgModelAndYearMonth(fixture, wrapperEle, component) {
  component.inputEle.nativeElement.dispatchEvent(new Event('focus'));
  fixture.detectChanges();

  let yearEle = wrapperEle.querySelectorAll('.devui-date-title')[0];
  let monthEle = wrapperEle.querySelectorAll('.devui-date-title')[1];
  const yearListEle = wrapperEle.querySelector('.devui-yearOption');
  const monthListEle = wrapperEle.querySelector('.devui-monthOption');
  const currentYear = yearEle.textContent.trim().slice(0, 4);
  const currentMonth = resolveMonth(monthEle.textContent.trim());
  const nextYearEle = wrapperEle.querySelector('.devui-date-header').querySelectorAll('.devui-btn-link')[3];
  let lastYearEle;

  expect(yearListEle.style.display).toBe('none');
  expect(monthListEle.style.display).toBe('none');

  yearEle.dispatchEvent(new Event('click'));
  fixture.detectChanges();

  expect(yearListEle.style.display).not.toBe('none');

  let currentYearInListEle;
  for (const el of yearListEle.children) {
    if (el.textContent.trim() === currentYear) {
      currentYearInListEle = el;
      break;
    }
  }

  expect(currentYearInListEle.classList).toContain('active');

  let currentLastYearInListEle;
  for (const el of yearListEle.children) {
    if (Number(el.textContent.trim()) === (Number(currentYear) - 1)) {
      currentLastYearInListEle = el;
      break;
    }
  }
  currentLastYearInListEle.dispatchEvent(new Event('click'));
  fixture.detectChanges();
  const currentLastYear = currentLastYearInListEle.textContent.trim();

  expect(yearEle.textContent.trim().slice(0, 4)).toBe(currentLastYear);

  nextYearEle.dispatchEvent(new Event('click'));
  fixture.detectChanges();
  expect(yearEle.textContent.trim().slice(0, 4)).toBe(currentYear);

  monthEle.dispatchEvent(new Event('click'));
  fixture.detectChanges();

  expect(monthListEle.style.display).not.toBe('none');

  let currentMonthInListEle;
  for (const el of monthListEle.children) {
    if (resolveMonth(el.textContent.trim()) === currentMonth) {
      currentMonthInListEle = el;
      break;
    }
  }

  expect(currentMonthInListEle.classList).toContain('active');

  let currentLastMonthInListEle;
  const tempMonth = (currentMonth === '1' ? '13' : currentMonth);
  for (const el of monthListEle.children) {
    if (Number(resolveMonth(el.textContent.trim())) === (Number(tempMonth) - 1)) {
      currentLastMonthInListEle = el;
      break;
    }
  }
  currentLastMonthInListEle.dispatchEvent(new Event('click'));
  fixture.detectChanges();
  const currentLastMonth = resolveMonth(currentLastMonthInListEle.textContent.trim());

  expect(resolveMonth(monthEle.textContent.trim())).toBe(currentLastMonth);

  const nextMonthEle = wrapperEle.querySelector('.devui-date-header').querySelectorAll('.devui-btn-link')[2];
  if (currentLastMonth === '12') {
    lastYearEle = wrapperEle.querySelector('.devui-date-header').querySelectorAll('.devui-btn-link')[0];
    lastYearEle.dispatchEvent(new Event('click'));
    fixture.detectChanges();
  }
  nextMonthEle.dispatchEvent(new Event('click'));
  fixture.detectChanges();
  expect(resolveMonth(monthEle.textContent.trim())).toBe(currentMonth);

  let dayListEle = wrapperEle.querySelector('tbody');
  let currentDayInListEle = dayListEle.querySelector('.active');
  let currentDay = currentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();

  expect(Number(currentDay)).toBe(new Date().getDate());

  let currentWhichDayInListEle;
  let currentWhichDay;

  for (const dayEl of dayListEle.querySelectorAll('.devui-in-month-day')) {
    const dayNumber = Number(dayEl.querySelector('.devui-calendar-date').textContent.trim());
    if (
      (currentDay !== '1') && dayNumber === (Number(currentDay) - 1) ||
      (currentDay === '1') && dayNumber === (Number(currentDay) + 1)
    ) {
      currentWhichDayInListEle = dayEl;
      currentWhichDay = currentWhichDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
      break;
    }
  }

  tickEvent(currentWhichDayInListEle, new Event('click'), fixture);

  const newWhichDay = (currentDay === '1' ? new Date().getDate() + 1 : new Date().getDate() - 1);
  expect(component.getValue).toHaveBeenCalled();
  expect(component.inputEle.nativeElement.value).toBe(
    `${new Date().getFullYear()}/${padZero(new Date().getMonth() + 1)}/${padZero(newWhichDay)}`
  );
  expect(component.selectedDate1).toEqual(new Date(new Date().getFullYear(), new Date().getMonth(), newWhichDay));

  component.inputEle.nativeElement.dispatchEvent(new Event('focus'));
  fixture.detectChanges();

  lastYearEle = wrapperEle.querySelector('.devui-date-header').querySelectorAll('.devui-btn-link')[0];
  lastYearEle.dispatchEvent(new Event('click'));
  fixture.detectChanges();
  yearEle = wrapperEle.querySelectorAll('.devui-date-title')[0];

  expect(yearEle.textContent.trim().slice(0, 4)).toBe(new Date().getFullYear() - 1 + '');

  const lastMonthEle = wrapperEle.querySelector('.devui-date-header').querySelectorAll('.devui-btn-link')[1];
  lastMonthEle.dispatchEvent(new Event('click'));
  fixture.detectChanges();
  monthEle = wrapperEle.querySelectorAll('.devui-date-title')[1];
  let trueMonth = new Date().getMonth() + 1;
  if (trueMonth === 1) {
    trueMonth = 13;
  }

  expect(resolveMonth(monthEle.textContent.trim())).toBe(trueMonth - 1 + '');

  closeDatePicker(fixture);

  component.selectedDate1 = new Date();
  fixture.detectChanges();
  tick();
  fixture.detectChanges();
  component.inputEle.nativeElement.dispatchEvent(new Event('focus'));
  fixture.detectChanges();

  dayListEle = wrapperEle.querySelector('tbody');
  currentDayInListEle = dayListEle.querySelector('.active');
  currentDay = currentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();

  expect(component.inputEle.nativeElement.value).toBe(
    `${new Date().getFullYear()}/${padZero(new Date().getMonth() + 1)}/${padZero(new Date().getDate())}`
  );
  expect(Number(currentDay)).toBe(new Date().getDate());

  closeDatePicker(fixture);

  component.inputEle.nativeElement.value = `${new Date().getFullYear()}/${padZero(new Date().getMonth() + 1)}/05`;
  tickEvent(component.inputEle.nativeElement, new Event('input'), fixture, 1000);
  tickEvent(component.inputEle.nativeElement, new Event('blur'), fixture, 1000);
  component.inputEle.nativeElement.dispatchEvent(new Event('focus'));
  fixture.detectChanges();
  dayListEle = wrapperEle.querySelector('tbody');
  currentDayInListEle = dayListEle.querySelector('.active');
  currentDay = currentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
  expect(component.inputEle.nativeElement.value).toBe(
    `${new Date().getFullYear()}/${padZero(new Date().getMonth() + 1)}/05`
  );
  expect(currentDay).toBe('05');

  closeDatePicker(fixture);
}

function testInputParam(fixture, wrapperEle, component) {
  component.cssClass = 'test-class';
  component.minDate = new Date();
  component.minDate.setDate(component.minDate.getDate() - 1);
  component.maxDate = new Date();
  component.maxDate.setDate(component.minDate.getDate() + 1);
  component.dateFormat = 'MM.dd.y';
  component.customViewTemplate = component.myCustomView;
  fixture.detectChanges();
  component.inputEle.nativeElement.dispatchEvent(new Event('focus'));
  fixture.detectChanges();

  expect(wrapperEle.querySelector('.test-class')).toBeTruthy();
  expect(wrapperEle.querySelector('.test-template')).toBeTruthy();

  const dayListEle = wrapperEle.querySelector('tbody');
  for (const dayEl of dayListEle.querySelectorAll('.devui-in-month-day')) {
    const dayNumber = Number(dayEl.querySelector('.devui-calendar-date').textContent.trim());
    if (
      (component.minDate.getDate() - 1) && dayNumber === (component.minDate.getDate() - 1) ||
      dayNumber === (component.maxDate.getDate() + 1)
    ) {
      expect(dayEl.classList).toContain('disabled');
    }
  }

  const currentDayEle = dayListEle.querySelector('.active');
  currentDayEle.dispatchEvent(new Event('click'));
  fixture.detectChanges();
  tick();
  fixture.detectChanges();

  expect(component.getValue).toHaveBeenCalled();
  expect(component.inputEle.nativeElement.value).toBe(
    `${padZero(new Date().getMonth() + 1)}.${padZero(new Date().getDate())}.${new Date().getFullYear()}`
  );
}

function testTimePicker(fixture, wrapperEle, component) {
  fixture.detectChanges();
  const datePicker = wrapperEle.querySelector('d-datepicker');

  expect(datePicker.querySelector('.devui-timepicker')).toBeTruthy();

  fixture.detectChanges();
  tick();
  fixture.detectChanges();
  const hourInputEle = datePicker.querySelector('.devui-timepicker').querySelectorAll('.devui-time')[0].querySelector('input');
  const minInputEle = datePicker.querySelector('.devui-timepicker').querySelector('.devui-minutes');
  const secInputEle = datePicker.querySelector('.devui-timepicker').querySelector('.devui-seconds');
  const currentHour = padZero(new Date().getHours());
  const currentMin = padZero(new Date().getMinutes());
  const currentSec = padZero(new Date().getSeconds());

  expect(hourInputEle.value).toBe(currentHour);
  expect(minInputEle.value).toBe(currentMin);
  expect(secInputEle.value).toBe(currentSec);

  const timeEvent = '5';

  testTimePickerInput(hourInputEle, fixture, timeEvent);
  testTimePickerInput(minInputEle, fixture, timeEvent);
  testTimePickerInput(secInputEle, fixture, timeEvent);

  testTimePickerBtn(datePicker.querySelectorAll('.devui-btn-nav')[0], fixture, timeEvent, hourInputEle, component);
  testTimePickerBtn(datePicker.querySelectorAll('.devui-btn-nav')[1], fixture, timeEvent, minInputEle, component);
  testTimePickerBtn(datePicker.querySelectorAll('.devui-btn-nav')[2], fixture, timeEvent, secInputEle, component);

  const confirmBtn = wrapperEle.querySelector('.devui-btn-wrapper').querySelector('button');
  tickEvent(confirmBtn, new Event('click'), fixture);

  expect(component.getValue).toHaveBeenCalled();
  // tslint:disable-next-line: max-line-length
  expect(component.inputEle.nativeElement.value).toBe(`${new Date().getFullYear()}/${padZero(new Date().getMonth() + 1)}/${padZero(new Date().getDate())} 0${timeEvent}:0${timeEvent}:0${timeEvent}`);
  expect(component.selectedDate1).toEqual(
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), Number(timeEvent), Number(timeEvent), Number(timeEvent))
  );
}

function testTimePickerInput(inputEle, fixture, timeEvent) {
  const backSpaceKeyboard = EventHelper.createKeyBoardEvent('keydown', { key: 'Backspace', keyCode: 8 });
  const keyBoardEvent = EventHelper.createKeyBoardEvent('keydown', {
    key: timeEvent, code: `Digit${timeEvent}`, charCode: 48 + Number(timeEvent)
  });
  const changeEvent = new Event('change');
  tickEvent(inputEle, backSpaceKeyboard, fixture);
  tickEvent(inputEle, changeEvent, fixture);
  tickEvent(inputEle, backSpaceKeyboard, fixture);
  tickEvent(inputEle, changeEvent, fixture);

  expect(inputEle.value).toBe('00');

  tickEvent(inputEle, keyBoardEvent, fixture);
  tickEvent(inputEle, changeEvent, fixture);

  expect(inputEle.value).toBe(`0${timeEvent}`);
}

function testTimePickerBtn(btnWrapperEle, fixture, timeEvent, inputEle, component) {
  const inBtnEle = btnWrapperEle.querySelector('.btn-up');
  const deBtnEle = btnWrapperEle.querySelector('.btn-down');
  tickEvent(inBtnEle, new Event('click'), fixture);

  expect(inputEle.value).toBe(padZero(Number(timeEvent) + 1));
  expect(component.getValue).toHaveBeenCalled();

  tickEvent(deBtnEle, new Event('click'), fixture);

  expect(inputEle.value).toBe(padZero(timeEvent));
  expect(component.getValue).toHaveBeenCalled();
}

function testDateConfig(fixture, wrapperEle, component) {
  fixture.detectChanges();
  const confirmBtn = wrapperEle.querySelector('.devui-btn-wrapper').querySelector('button');
  fixture.detectChanges();
  tick();
  fixture.detectChanges();
  tickEvent(confirmBtn, new Event('click'), fixture);

  // tslint:disable-next-line: max-line-length  MM.dd.y mm-ss-HH
  expect(component.inputEle.nativeElement.value).toBe(`${padZero(new Date().getMonth() + 1)}.${padZero(new Date().getDate())}.${new Date().getFullYear()} ${padZero(new Date().getMinutes())}-${padZero(new Date().getSeconds())}-${padZero(new Date().getHours())}`);
}
