// tslint:disable: max-line-length
import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, Component, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DomHelper } from '../utils/testing/dom-helper';
import * as EventHelper from '../utils/testing/event-helper';

import { DatepickerModule } from './datepicker.module';
import { By } from '@angular/platform-browser';
import { DateRangePickerComponent } from '.';

@Component({
  template: `
    <div class="devui-input-group devui-dropdown-origin-wrapper devui-dropdown-origin">
      <input
        class="devui-input devui-form-control"
        dDateRangePicker
        (focus)="dateRangePicker.toggle($event)"
        [(ngModel)]="dateRange"
        #dateRangePicker="dateRangePicker"
        (selectedRangeChange)="getValue($event)"

        [cssClass]="cssClass"
        [showTime]="showTime"
        [disabled]="disabled"
        [dateConfig]="dateConfig"
        [dateFormat]="dateFormat"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [splitter]="splitter"
        [selectedRange]="selectedRange"
        [customViewTemplate]="customViewTemplate"
        [hideOnRangeSelected]="hideOnRangeSelected"
        #inputEle
      />
      <div *ngIf="everyRange(dateRange)" class="devui-input-group-addon icon-close-wrapper" (click)="dateRangePicker.clearAll()">
        <i class="icon icon-close"></i>
      </div>
      <div class="devui-input-group-addon" (click)="dateRangePicker.toggle($event, true)">
        <i class="icon icon-calendar"></i>
      </div>
      <ng-template #myCustomView>
        <div class="test-template">test template</div>
      </ng-template>
    </div>
  `,
})
class TestDateRangePickerComponent {
  dateRange = [null, null];
  @ViewChild('inputEle', { read: ElementRef }) inputEle: ElementRef;
  @ViewChild('myCustomView') myCustomView: TemplateRef<any>;

  cssClass = '';
  showTime = false;
  disabled = false;
  dateConfig;
  dateFormat = 'y/MM/dd';
  minDate = new Date('01/01/1900 00:00:00');
  maxDate = new Date('11/31/2099 23:59:59');
  splitter = ' - ';
  selectedRange = [null, null];
  customViewTemplate;
  hideOnRangeSelected = false;

  getValue = jasmine.createSpy('get value');
  everyRange(range) {
    return range.every(_ => !!_);
  }

  constructor() {}
}

describe('dateRangePicker', () => {
  let fixture: ComponentFixture<TestDateRangePickerComponent>;
  let debugEl: DebugElement;
  let component: TestDateRangePickerComponent;
  let domHelper: DomHelper<TestDateRangePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DatepickerModule, NoopAnimationsModule, FormsModule],
      declarations: [TestDateRangePickerComponent],
      providers: [],
    }).compileComponents();
  }));

  describe('basic param', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestDateRangePickerComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;

      domHelper = new DomHelper(fixture);
      fixture.detectChanges();
    });

    it('should datePicker show, should hideOnRangeSelected works', fakeAsync(() => {
      component.inputEle.nativeElement.dispatchEvent(new Event('focus'));
      fixture.detectChanges();
      const classList = [
        '.devui-date-range-wrapper', '.devui-dropdown-overlay', '.devui-date-range-picker', '.devui-date-picker',
        '.devui-month-view', '.devui-month-view-table',
        '.devui-calender-header', '.devui-week-header', '.devui-date-title',
        '.devui-day', '.devui-out-of-month', '.devui-in-month-day', '.devui-calendar-date'
      ];
      expect(domHelper.judgeAppendToBodyStyleClasses(classList)).toBeTruthy();

      let dateRangePicker = document.querySelector('.devui-date-range-wrapper');
      expect(dateRangePicker).toBeTruthy();

      closeDatePicker(fixture);
      dateRangePicker = document.querySelector('.devui-date-range-wrapper');
      expect(dateRangePicker).toBeFalsy();

      component.hideOnRangeSelected = true;
      fixture.detectChanges();
      component.inputEle.nativeElement.dispatchEvent(new Event('focus'));
      fixture.detectChanges();
      const leftDayListEle = document.querySelectorAll('tbody')[0];
      const rightDayListEle = document.querySelectorAll('tbody')[1];
      const leftCurrentDayInListEle = leftDayListEle.querySelectorAll('.devui-day')[7];
      const rightCurrentDayInListEle = rightDayListEle.querySelectorAll('.devui-day')[7];
      tickEvent(leftCurrentDayInListEle, new Event('click'), fixture);
      tickEvent(rightCurrentDayInListEle, new Event('click'), fixture);
      expect(component.getValue).toHaveBeenCalled();
      dateRangePicker = document.querySelector('.devui-date-range-wrapper');
      expect(dateRangePicker).toBeFalsy();
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
      fixture = TestBed.createComponent(TestDateRangePickerComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;

      domHelper = new DomHelper(fixture);
    });

    describe('first component change', () => {
      beforeEach(() => {
        component.showTime = true;
        component.dateFormat = 'y/MM/dd HH:mm:ss';
      });

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
      });

      it('should dateConfig works', fakeAsync(() => {
        testDateConfig(fixture, document, component);
      }));
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

function strDate(addYear, addMonth, addDate, date?, arr = ['yy', 'mm', 'dd'], splitter = '/') {
  const newArr = [];
  const currentDate = typeof date === 'string' ? date : new Date().getDate() + addDate;
  arr.forEach((type) => {
    switch (type) {
      case 'yy':
        newArr.push(new Date().getFullYear() + addYear);
        break;
      case 'mm':
        newArr.push(padZero(new Date().getMonth() + 1 + addMonth));
        break;
      case 'dd':
        newArr.push(padZero(currentDate));
        break;
    }
  });
  return newArr.join(splitter);
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

  const fun = {
    showEles: wrapperEle.querySelectorAll('.devui-date-title'),
    btnEles: (side, type) => {
      return wrapperEle.querySelectorAll('.devui-calender-header')[side].querySelectorAll('.devui-btn-link')[type];
    },
    yearShow: (ele) => {
      return ele.textContent.trim().slice(0, 4);
    },
    monthShow: (ele) => {
      return resolveMonth(ele.textContent.trim());
    }
  };
  const showEle = {
    left: {
      year: fun.showEles[0],
      month: fun.showEles[1]
    },
    right: {
      year: fun.showEles[2],
      month: fun.showEles[3]
    }
  };
  const currentShowNum = {
    left: {
      year: fun.yearShow(showEle.left.year),
      month: fun.monthShow(showEle.left.month)
    },
    right: {
      year: fun.yearShow(showEle.right.year),
      month: fun.monthShow(showEle.right.month)
    }
  };
  const btnEle = {
    left: {
      year: {
        last: fun.btnEles(0, 0),
        next: fun.btnEles(0, 3)
      },
      month: {
        last: fun.btnEles(0, 1),
        next: fun.btnEles(0, 2)
      }
    },
    right: {
      year: {
        next: fun.btnEles(1, 3),
        last: fun.btnEles(1, 0)
      },
      month: {
        next: fun.btnEles(1, 2),
        last: fun.btnEles(1, 1)
      }
    }
  };

  for (const side in btnEle) {
    if (side) {
      for (const time in btnEle[side]) {
        if (time) {
          let current = 0;
          for (const type in btnEle[side][time]) {
            if (type) {
              current = type === 'next' ? (current + 1) : (current - 1);
              btnEle[side][time][type].dispatchEvent(new Event('click'));
              fixture.detectChanges();
              expect(fun[`${time}Show`](showEle[side][time])).toBe((Number(currentShowNum[side][time]) + current) + '');
            }
          }
        }
      }
    }
  }

  let leftDayListEle = wrapperEle.querySelectorAll('tbody')[0];
  let rightDayListEle = wrapperEle.querySelectorAll('tbody')[1];
  let leftCurrentDayInListEle = leftDayListEle.querySelectorAll('.devui-day')[7];
  let rightCurrentDayInListEle = rightDayListEle.querySelectorAll('.devui-day')[7];
  let leftCurrentDay = leftCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
  let rightCurrentDay = rightCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
  tickEvent(leftCurrentDayInListEle, new Event('click'), fixture);
  tickEvent(rightCurrentDayInListEle, new Event('click'), fixture);
  expect(component.getValue).toHaveBeenCalled();
  expect(component.inputEle.nativeElement.value).toBe(
    `${strDate(0, 0, 0, leftCurrentDay)}${component.splitter}${strDate(0, 1, 0, rightCurrentDay)}`
  );
  expect(component.dateRange).toEqual(
    [
      new Date(new Date().getFullYear(), new Date().getMonth(), leftCurrentDay),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, rightCurrentDay)
    ]
  );

  component.dateRange = [new Date(), new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())];
  fixture.detectChanges();
  tick();
  fixture.detectChanges();
  component.inputEle.nativeElement.dispatchEvent(new Event('focus'));
  fixture.detectChanges();
  leftDayListEle = wrapperEle.querySelectorAll('tbody')[0];
  rightDayListEle = wrapperEle.querySelectorAll('tbody')[1];
  leftCurrentDayInListEle = leftDayListEle.querySelector('.active');
  rightCurrentDayInListEle = rightDayListEle.querySelector('.active');
  leftCurrentDay = leftCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
  rightCurrentDay = rightCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
  expect(component.inputEle.nativeElement.value).toBe(
    `${strDate(0, 0, 0)}${component.splitter}${strDate(0, 1, 0)}`
  );
  expect(Number(leftCurrentDay)).toBe(new Date().getDate());
  expect(Number(rightCurrentDay)).toBe(new Date().getDate());
  closeDatePicker(fixture);

  component.inputEle.nativeElement.value = `${strDate(0, 0, 0, '05')}${component.splitter}${strDate(0, 1, 0, '05')}`;
  tickEvent(component.inputEle.nativeElement, new Event('input'), fixture, 1000);
  tickEvent(component.inputEle.nativeElement, new Event('blur'), fixture, 1000);
  component.inputEle.nativeElement.dispatchEvent(new Event('focus'));
  fixture.detectChanges();
  leftDayListEle = wrapperEle.querySelectorAll('tbody')[0];
  rightDayListEle = wrapperEle.querySelectorAll('tbody')[1];
  leftCurrentDayInListEle = leftDayListEle.querySelector('.active');
  rightCurrentDayInListEle = rightDayListEle.querySelector('.active');
  leftCurrentDay = leftCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
  rightCurrentDay = rightCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
  expect(component.dateRange).toEqual(
    [
      new Date(new Date().getFullYear(), new Date().getMonth(), 5),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5)
    ]
  );
  expect(leftCurrentDay).toBe('05');
  expect(rightCurrentDay).toBe('05');
  closeDatePicker(fixture);
}

function testInputParam(fixture, wrapperEle, component) {
  component.cssClass = 'test-class';
  component.minDate = new Date();
  component.maxDate = new Date();
  component.maxDate.setMonth(component.maxDate.getMonth() + 1);
  component.dateFormat = 'MM.dd.y';
  component.splitter = '~';
  component.customViewTemplate = component.myCustomView;
  fixture.detectChanges();
  component.inputEle.nativeElement.dispatchEvent(new Event('focus'));
  fixture.detectChanges();

  // cssClass
  expect(wrapperEle.querySelector('.test-class')).toBeTruthy();
  // minDate、maxDate
  const minDate = component.minDate;
  const maxDate = new Date(component.maxDate);
  maxDate.setDate(maxDate.getDate() + 1);
  const leftDayListEle = wrapperEle.querySelectorAll('tbody')[0];
  const rightDayListEle = wrapperEle.querySelectorAll('tbody')[1];
  let leftCurrentDayInListEle;
  let rightCurrentDayInListEle;
  if (minDate.getDate() - 1) {
    for (const dayEl of leftDayListEle.querySelectorAll('.devui-in-month-day')) {
      const dayNumber = Number(dayEl.querySelector('.devui-calendar-date').textContent.trim());
      if (dayNumber === (minDate.getDate() - 1)) {
        expect(dayEl.classList).toContain('disabled');
      } else if (dayNumber === (minDate.getDate())) {
        leftCurrentDayInListEle = dayEl;
      }
    }
  }
  if (component.maxDate.getMonth() === maxDate.getMonth()) {
    for (const dayEl of rightDayListEle.querySelectorAll('.devui-in-month-day')) {
      const dayNumber = Number(dayEl.querySelector('.devui-calendar-date').textContent.trim());
      if (dayNumber === (component.maxDate.getDate() + 1)) {
        expect(dayEl.classList).toContain('disabled');
      } else if (dayNumber === (component.maxDate.getDate())) {
        rightCurrentDayInListEle = dayEl;
      }
    }
  }
  // dateFormat、splitter
  tickEvent(leftCurrentDayInListEle, new Event('click'), fixture);
  tickEvent(rightCurrentDayInListEle, new Event('click'), fixture);
  expect(component.getValue).toHaveBeenCalled();
  expect(component.inputEle.nativeElement.value).toBe(
    `${strDate(0, 0, 0, undefined, ['mm', 'dd', 'yy'], '.')}${component.splitter}${strDate(0, 1, 0, undefined, ['mm', 'dd', 'yy'], '.')}`
  );
  // customViewTemplate
  expect(wrapperEle.querySelector('.test-template')).toBeTruthy();
}

function testTimePicker(fixture, wrapperEle, component) {
  const inputEl = fixture.debugElement.query(By.directive(DateRangePickerComponent));
  inputEl.nativeElement.dispatchEvent(new Event('focus'));
  fixture.detectChanges();
  let picker = {
    left: wrapperEle.querySelectorAll('.devui-date-picker')[0],
    right: wrapperEle.querySelectorAll('.devui-date-picker')[1]
  };
  expect(picker['left'].querySelector('.devui-timepicker')).toBeTruthy();
  expect(picker['right'].querySelector('.devui-timepicker')).toBeTruthy();
  closeDatePicker(fixture);

  component.dateRange = [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())];
  fixture.detectChanges();
  tick();
  fixture.detectChanges();
  component.inputEle.nativeElement.dispatchEvent(new Event('focus'));
  fixture.detectChanges();
  tick();
  fixture.detectChanges();
  picker = {
    left: wrapperEle.querySelectorAll('.devui-date-picker')[0],
    right: wrapperEle.querySelectorAll('.devui-date-picker')[1]
  };
  function timeInputEles(whichPicker, type) {
    return type === 'hours' ?
      whichPicker.querySelector('.devui-timepicker').querySelectorAll('.devui-time')[0].querySelector('input') :
      whichPicker.querySelector('.devui-timepicker').querySelector(`.devui-${type}`);
  }
  const timeInputEle = {
    left: {
      hours: timeInputEles(picker['left'], 'hours'),
      minutes: timeInputEles(picker['left'], 'minutes'),
      seconds: timeInputEles(picker['left'], 'seconds')
    },
    right: {
      hours: timeInputEles(picker['right'], 'hours'),
      minutes: timeInputEles(picker['right'], 'minutes'),
      seconds: timeInputEles(picker['right'], 'seconds')
    }
  };
  for (const side in timeInputEle) {
    if (side) {
      for (const time in timeInputEle[side]) {
        if (time) {
          expect(timeInputEle[side][time].value).toBe('00');
        }
      }
    }
  }

  const timeEvent = '5';

  for (const side in timeInputEle) {
    if (side) {
      for (const time in timeInputEle[side]) {
        if (time) {
          testTimePickerInput(timeInputEle[side][time], fixture, timeEvent);
        }
      }
    }
  }

  for (const side in timeInputEle) {
    if (side) {
      for (const time in timeInputEle[side]) {
        if (time) {
          const arr = ['hours', 'minutes', 'seconds'];
          testTimePickerBtn(picker[side].querySelectorAll('.devui-btn-nav')[arr.indexOf(time)], fixture, timeEvent, timeInputEle[side][time], component);
        }
      }
    }
  }

  const confirmBtn = wrapperEle.querySelector('.devui-btn-wrapper').querySelector('button');
  tickEvent(confirmBtn, new Event('click'), fixture);

  expect(component.getValue).toHaveBeenCalled();
  expect(component.inputEle.nativeElement.value).toBe(
    `${strDate(0, 0, 0)} 0${timeEvent}:0${timeEvent}:0${timeEvent}${component.splitter}${strDate(0, 1, 0)} 0${timeEvent}:0${timeEvent}:0${timeEvent}`
  );
  expect(component.dateRange).toEqual(
    [
      new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), Number(timeEvent), Number(timeEvent), Number(timeEvent)),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(), Number(timeEvent), Number(timeEvent), Number(timeEvent))
    ]
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
  component.dateRange = [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())];
  fixture.detectChanges();
  tick();
  fixture.detectChanges();
  component.inputEle.nativeElement.dispatchEvent(new Event('focus'));
  fixture.detectChanges();
  const confirmBtn = wrapperEle.querySelector('.devui-btn-wrapper').querySelector('button');
  fixture.detectChanges();
  tick();
  fixture.detectChanges();
  tickEvent(confirmBtn, new Event('click'), fixture);

  expect(component.inputEle.nativeElement.value).toBe(
    `${strDate(0, 0, 0, undefined, ['mm', 'dd', 'yy'], '.')} 00-00-00${component.splitter}${strDate(0, 1, 0, undefined, ['mm', 'dd', 'yy'], '.')} 00-00-00`
  );
}
