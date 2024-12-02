import { Component, DebugElement, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DomHelper } from '../utils/testing/dom-helper';
import * as EventHelper from '../utils/testing/event-helper';
import { DatepickerModule } from './datepicker.module';

@Component({
  template: `
    <div class="devui-input-group devui-dropdown-origin">
      <input
        class="devui-input devui-form-control"
        dDateRangePicker
        (focus)="dateRangePicker.toggle()"
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
      <div *ngIf="everyRange(dateRange)" class="devui-input-group-addon close-icon-wrapper" (click)="dateRangePicker.clearAll()">
        <i class="icon icon-close"></i>
      </div>
      <div class="devui-input-group-addon" (click)="$event.stopPropagation(); dateRangePicker.toggle(toggle); toggle = !toggle" #icon>
        <i class="icon icon-calendar"></i>
      </div>
      <ng-template #myCustomView let-chooseDate="chooseDate">
        <div class="test-template" (click)="chooseToday(chooseDate)">test template</div>
      </ng-template>
    </div>
  `,
})
class TestDateRangePickerComponent {
  dateRange = [null, null];
  @ViewChild('inputEle', { read: ElementRef }) inputEle: ElementRef;
  @ViewChild('myCustomView') myCustomView: TemplateRef<any>;
  @ViewChild('icon', { read: ElementRef }) icon: ElementRef;

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
  toggle = true;
  everyRange(range) {
    return range.every((_) => !!_);
  }
  chooseToday(fn) {
    fn([new Date(), new Date()], undefined, false);
  }

  constructor() {}
}

@Component({
  template: `
    <div [style.height]="placeHolderHeight ? '900px' : '0'">this is place holder</div>
    <input
      class="devui-input devui-form-control"
      [ngClass]="{ 'devui-dropdown-origin': isOrigin }"
      dDateRangePicker
      (focus)="dateRangePicker.toggle()"
      #dateRangePicker="dateRangePicker"
      #inputEle
    />
  `,
})
class TestDateRangePickerOriginComponent {
  @ViewChild('inputEle', { read: ElementRef }) inputEle: ElementRef;

  placeHolderHeight = false;
  isOrigin = false;
  constructor() {}
}

@Component({
  template: `
    <d-date-range-picker
      [dateConfig]="dateConfig"
      [selectedRange]="selectedRange"
      [customViewTemplate]="customViewTemplate"
    ></d-date-range-picker>
    <ng-template #myCustomView let-chooseDate="chooseDate" let-clearAll="clearAll">
      <div class="test-template choose" (click)="chooseDate(today())">choose</div>
      <div class="test-template clear" (click)="clearAll(reason)">clear</div>
    </ng-template>
  `,
})
class TestDateRangePickerCmpComponent {
  dateConfig;
  selectedRange;
  customViewTemplate;
  reason;
  @ViewChild('myCustomView') myCustomView: TemplateRef<any>;
  constructor() {}
  today() {
    return [new Date(), new Date()];
  }
}

describe('dateRangePicker', () => {
  let fixture: ComponentFixture<TestDateRangePickerComponent>;
  let debugEl: DebugElement;
  let component: TestDateRangePickerComponent;
  let domHelper: DomHelper<TestDateRangePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DatepickerModule, NoopAnimationsModule, FormsModule],
      declarations: [TestDateRangePickerComponent],
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
      openDatePicker(fixture);
      const classList = [
        '.devui-date-range-wrapper',
        '.devui-date-range-picker',
        '.devui-date-picker',
        '.devui-month-view',
        '.devui-month-view-table',
        '.devui-calender-header',
        '.devui-week-header',
        '.devui-date-title',
        '.devui-day',
        '.devui-out-of-month',
        '.devui-in-month-day',
        '.devui-calendar-date',
      ];
      expect(domHelper.judgeAppendToBodyStyleClasses(classList)).toBeTruthy();

      let dateRangePicker = document.querySelector('.devui-date-range-wrapper');
      expect(dateRangePicker).toBeTruthy();

      closeDatePicker(fixture);
      dateRangePicker = document.querySelector('.devui-date-range-wrapper');
      expect(dateRangePicker).toBeFalsy();

      tickEvent(component.icon.nativeElement, new Event('click'), fixture);
      tick();
      fixture.detectChanges();
      dateRangePicker = document.querySelector('.devui-date-range-wrapper');
      expect(dateRangePicker).toBeTruthy();

      tickEvent(component.icon.nativeElement, new Event('click'), fixture);
      tick();
      fixture.detectChanges();
      dateRangePicker = document.querySelector('.devui-date-range-wrapper');
      expect(dateRangePicker).toBeFalsy();

      component.hideOnRangeSelected = true;
      fixture.detectChanges();
      openDatePicker(fixture);
      const leftDayListEle = document.querySelectorAll('tbody')[0];
      const rightDayListEle = document.querySelectorAll('tbody')[1];
      const leftCurrentDayInListEle = leftDayListEle.querySelectorAll('.devui-day')[7];
      const rightCurrentDayInListEle = rightDayListEle.querySelectorAll('.devui-day')[7];
      tickEvent(leftCurrentDayInListEle, new Event('click'), fixture);
      tickEvent(rightCurrentDayInListEle, new Event('click'), fixture);
      expect(component.getValue).toHaveBeenCalled();
      dateRangePicker = document.querySelector('.devui-date-range-wrapper');
      expect(dateRangePicker).toBeFalsy();
      flush();
    }));

    it('should ngModel works, should change year and month works', fakeAsync(() => {
      testNgModelAndYearMonth(fixture, document, component);
      flush();
    }));

    it('should @Input works', fakeAsync(() => {
      testInputParam(fixture, document, component);
      flush();
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
        flush();
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
            time: 'MM.dd.y mm-ss-HH',
          },
        };
      });

      it('should dateConfig works', fakeAsync(() => {
        testDateConfig(fixture, document, component);
        flush();
      }));
    });

    describe('test disabled', () => {
      beforeEach(() => {
        component.disabled = true;
      });

      it('should disabled works', fakeAsync(() => {
        fixture.detectChanges();
        openDatePicker(fixture);
        const leftDayListEle = document.querySelectorAll('tbody')[0];
        const rightDayListEle = document.querySelectorAll('tbody')[1];
        const leftCurrentDayInListEle = leftDayListEle.querySelectorAll('.devui-day')[7];
        const rightCurrentDayInListEle = rightDayListEle.querySelectorAll('.devui-day')[7];
        tickEvent(leftCurrentDayInListEle, new Event('click'), fixture);
        tickEvent(rightCurrentDayInListEle, new Event('click'), fixture);
        expect(component.getValue).not.toHaveBeenCalled();
        closeDatePicker(fixture);
        flush();
      }));
    });

    describe('test wrong control', () => {
      beforeEach(() => {
        component.dateConfig = {
          timePicker: true,
        };
      });

      it('should not wrong dateConfig works', fakeAsync(() => {
        fixture.detectChanges();
        openDatePicker(fixture);
        expect(document.querySelector('.devui-time')).toBeFalsy();
        closeDatePicker(fixture);
        flush();
      }));
    });
  });
});

describe('dateRangePickerOrigin', () => {
  let fixture: ComponentFixture<TestDateRangePickerOriginComponent>;
  let debugEl: DebugElement;
  let component: TestDateRangePickerOriginComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DatepickerModule, NoopAnimationsModule, FormsModule],
      declarations: [TestDateRangePickerOriginComponent],
    }).compileComponents();
  }));

  describe('param need change when init', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestDateRangePickerOriginComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;
    });

    describe('datePickerOrigin', () => {
      beforeEach(() => {
        component.placeHolderHeight = true;
      });

      it('datePickerOrigin', fakeAsync(() => {
        fixture.detectChanges();
        openDatePicker(fixture);
        expect(document.querySelector('.devui-date-range-wrapper')).toBeTruthy();
      }));
    });

    describe('isOrigin', () => {
      beforeEach(() => {
        component.isOrigin = true;
      });

      it('isOrigin', fakeAsync(() => {
        fixture.detectChanges();
        openDatePicker(fixture);
        expect(document.querySelector('.devui-date-range-wrapper')).toBeTruthy();
      }));
    });
  });
});

describe('dateRangePickerComponent', () => {
  let fixture: ComponentFixture<TestDateRangePickerCmpComponent>;
  let debugEl: DebugElement;
  let component: TestDateRangePickerCmpComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DatepickerModule, NoopAnimationsModule, FormsModule],
      declarations: [TestDateRangePickerCmpComponent],
    }).compileComponents();
  }));

  describe('basic param', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestDateRangePickerCmpComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;
    });

    it('should ngModel works', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      component.selectedRange = [new Date(), new Date()];
      fixture.detectChanges();
      expect(debugEl.queryAll(By.css('.active.devui-in-month-day')).length).toBe(1);
    }));

    it('should template works', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      component.customViewTemplate = component.myCustomView;
      fixture.detectChanges();
      expect(debugEl.query(By.css('.test-template'))).toBeTruthy();
      debugEl.query(By.css('.choose')).nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(debugEl.queryAll(By.css('.active.devui-in-month-day')).length).toBe(1);
      debugEl.query(By.css('.clear')).nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(debugEl.queryAll(By.css('.active.devui-in-month-day')).length).toBe(0);
      debugEl.query(By.css('.choose')).nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(debugEl.queryAll(By.css('.active.devui-in-month-day')).length).toBe(1);
      component.reason = 4;
      fixture.detectChanges();
      debugEl.query(By.css('.clear')).nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(debugEl.queryAll(By.css('.active.devui-in-month-day')).length).toBe(0);
    }));
  });

  describe('param need change when init', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestDateRangePickerCmpComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;
    });

    describe('first component change', () => {
      beforeEach(() => {
        component.dateConfig = {
          timePicker: true,
          dateConverter: null,
          min: 2020,
          max: 2020,
          format: {
            date: 'MM.dd.y',
            time: 'MM.dd.y mm-ss-HH',
          },
        };
      });

      it('should showTime works', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(debugEl.query(By.css('.devui-time'))).toBeTruthy();
      }));
    });

    describe('test wrong control', () => {
      beforeEach(() => {
        component.dateConfig = {
          timePicker: true,
        };
      });

      it('should not wrong dateConfig works', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(document.querySelector('.devui-time')).toBeFalsy();
      }));
    });
  });
});

function padZero(value) {
  return String(value).padStart(2, '0');
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
  const fullDate = new Date(new Date().getFullYear() + addYear, new Date().getMonth() + addMonth, currentDate);
  return EventHelper.dateToStrWithArr(fullDate, arr, splitter);
}

function closeDatePicker(fixture) {
  tickEvent(document, new Event('click'), fixture);
  tick();
  fixture.detectChanges();
}

function openDatePicker(fixture) {
  const el = fixture.debugElement.componentInstance.inputEle.nativeElement;
  tickEvent(el, new Event('focus'), fixture);
  tick();
  fixture.detectChanges();
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
  openDatePicker(fixture);

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
    },
  };
  const showEle = {
    left: {
      year: fun.showEles[0],
      month: fun.showEles[1],
    },
    right: {
      year: fun.showEles[2],
      month: fun.showEles[3],
    },
  };
  const currentShowNum = {
    left: {
      year: fun.yearShow(showEle.left.year),
      month: fun.monthShow(showEle.left.month),
    },
    right: {
      year: fun.yearShow(showEle.right.year),
      month: fun.monthShow(showEle.right.month),
    },
  };
  const btnEle = {
    left: {
      year: {
        last: fun.btnEles(0, 0),
        next: fun.btnEles(0, 3),
      },
      month: {
        last: fun.btnEles(0, 1),
        next: fun.btnEles(0, 2),
      },
    },
    right: {
      year: {
        next: fun.btnEles(1, 3),
        last: fun.btnEles(1, 0),
      },
      month: {
        next: fun.btnEles(1, 2),
        last: fun.btnEles(1, 1),
      },
    },
  };

  for (const side in btnEle) {
    if (side) {
      for (const time in btnEle[side]) {
        if (time) {
          let current = 0;
          for (const type in btnEle[side][time]) {
            if (type) {
              current = type === 'next' ? current + 1 : current - 1;
              btnEle[side][time][type].dispatchEvent(new Event('click'));
              fixture.detectChanges();
              let currentMonth = Number(currentShowNum[side][time]) + current;
              if (time === 'month') {
                currentMonth = currentMonth % 12 || 12;
              }
              expect(fun[`${time}Show`](showEle[side][time])).toBe(String(currentMonth));
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
  const rightCurrentLastDayInListEle = rightDayListEle.querySelectorAll('.devui-day')[6];
  let leftCurrentDay = leftCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
  let rightCurrentDay = rightCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
  tickEvent(leftCurrentDayInListEle, new Event('click'), fixture);
  tickEvent(rightCurrentDayInListEle, new Event('mouseover'), fixture);
  expect(rightCurrentLastDayInListEle.classList).toContain('devui-in-range');
  tickEvent(rightCurrentDayInListEle, new Event('click'), fixture);
  expect(component.getValue).toHaveBeenCalled();
  expect(component.inputEle.nativeElement.value).toBe(
    `${strDate(0, 0, 0, leftCurrentDay)}${component.splitter}${strDate(0, 1, 0, rightCurrentDay)}`
  );
  expect(component.dateRange).toEqual([
    new Date(new Date().getFullYear(), new Date().getMonth(), leftCurrentDay),
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, rightCurrentDay, 23, 59, 59),
  ]);
  closeDatePicker(fixture);

  component.dateRange = [new Date(), new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())];
  fixture.detectChanges();
  tick();
  fixture.detectChanges();
  openDatePicker(fixture);
  leftDayListEle = wrapperEle.querySelectorAll('tbody')[0];
  rightDayListEle = wrapperEle.querySelectorAll('tbody')[1];
  leftCurrentDayInListEle = leftDayListEle.querySelector('.active');
  rightCurrentDayInListEle = rightDayListEle.querySelector('.active');
  leftCurrentDay = leftCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
  rightCurrentDay = rightCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
  expect(component.inputEle.nativeElement.value).toBe(`${strDate(0, 0, 0)}${component.splitter}${strDate(0, 1, 0)}`);
  expect(Number(leftCurrentDay)).toBe(new Date().getDate());
  expect(Number(rightCurrentDay)).toBe(new Date(strDate(0, 1, 0)).getDate());
  closeDatePicker(fixture);

  component.inputEle.nativeElement.value = `${strDate(0, 0, 0, '05')}${component.splitter}${strDate(0, 1, 0, '05')}`;
  tickEvent(component.inputEle.nativeElement, new KeyboardEvent('keyup', { key: 'Enter' }), fixture, 1000);
  tickEvent(component.inputEle.nativeElement, new Event('blur'), fixture, 1000);
  openDatePicker(fixture);
  leftDayListEle = wrapperEle.querySelectorAll('tbody')[0];
  rightDayListEle = wrapperEle.querySelectorAll('tbody')[1];
  leftCurrentDayInListEle = leftDayListEle.querySelector('.active');
  rightCurrentDayInListEle = rightDayListEle.querySelector('.active');
  leftCurrentDay = leftCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
  rightCurrentDay = rightCurrentDayInListEle.querySelector('.devui-calendar-date').textContent.trim();
  expect(component.dateRange).toEqual([
    new Date(new Date().getFullYear(), new Date().getMonth(), 5),
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5),
  ]);
  expect(leftCurrentDay).toBe('05');
  expect(rightCurrentDay).toBe('05');
  closeDatePicker(fixture);

  component.inputEle.nativeElement.value = '';
  tickEvent(component.inputEle.nativeElement, new Event('input'), fixture, 1000);
  tickEvent(component.inputEle.nativeElement, new Event('blur'), fixture, 1000);
  expect(component.getValue).toHaveBeenCalled();
  expect(component.inputEle.nativeElement.value).toBe('');

  component.splitter = '/';
  fixture.detectChanges();
  component.inputEle.nativeElement.value = `${strDate(0, 0, 0, '05')}${component.splitter}${strDate(0, 1, 0, '05')}`;
  tickEvent(component.inputEle.nativeElement, new Event('input'), fixture, 1000);
  tickEvent(component.inputEle.nativeElement, new Event('blur'), fixture, 1000);
  expect(component.getValue).toHaveBeenCalled();
  expect(component.inputEle.nativeElement.value).toBe(`${strDate(0, 0, 0, '05')}${component.splitter}${strDate(0, 1, 0, '05')}`);

  component.inputEle.nativeElement.value = `${strDate(0, 0, 0, '05')}${component.splitter}${strDate(0, 1, 0, '05')}`;
  tickEvent(component.inputEle.nativeElement, new Event('input'), fixture, 1000);
  tickEvent(component.inputEle.nativeElement, new Event('blur'), fixture, 1000);
  expect(component.inputEle.nativeElement.value).toBe(`${strDate(0, 0, 0, '05')}${component.splitter}${strDate(0, 1, 0, '05')}`);

  component.minDate = new Date();
  component.maxDate = new Date();
  component.selectedRange = [new Date(`${strDate(0, 0, 0, '05')}`), new Date(`${strDate(0, 0, 0, '05')}`)];
  fixture.detectChanges();
  openDatePicker(fixture);
  component.selectedRange = [new Date(`${strDate(0, 0, 0, '05')}`), new Date(`${strDate(0, 1, 0, '05')}`)];
  fixture.detectChanges();
  component.inputEle.nativeElement.value = `${strDate(0, -1, 0)}${component.splitter}${strDate(0, 1, 0)}`;
  tickEvent(component.inputEle.nativeElement, new Event('input'), fixture, 1000);
  tickEvent(component.inputEle.nativeElement, new Event('blur'), fixture, 1000);
  expect(component.getValue).toHaveBeenCalled();
  expect(component.inputEle.nativeElement.value).toBe(`${strDate(0, 0, 0, '05')}${component.splitter}${strDate(0, 1, 0, '05')}`);

  component.inputEle.nativeElement.value = `${strDate(0, 0, 0, '05')}${component.splitter}${strDate(0, 1, 0, '05')}`;
  tickEvent(component.inputEle.nativeElement, new Event('input'), fixture, 1000);
  tickEvent(component.inputEle.nativeElement, new Event('blur'), fixture, 1000);
  expect(component.inputEle.nativeElement.value).toBe(`${strDate(0, 0, 0, '05')}${component.splitter}${strDate(0, 1, 0, '05')}`);

  component.inputEle.nativeElement.value = `${strDate(0, 0, 0, '05')}${component.splitter}2020`;
  tickEvent(component.inputEle.nativeElement, new Event('input'), fixture, 1000);
  tickEvent(component.inputEle.nativeElement, new Event('blur'), fixture, 1000);
  expect(component.inputEle.nativeElement.value).toBe(`${strDate(0, 0, 0, '05')}${component.splitter}${strDate(0, 1, 0, '05')}`);
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
  openDatePicker(fixture);

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
  for (const dayEl of leftDayListEle.querySelectorAll('.devui-in-month-day')) {
    const dayNumber = Number(dayEl.querySelector('.devui-calendar-date').textContent.trim());
    if (dayNumber === minDate.getDate() - 1) {
      expect(dayEl.classList).toContain('disabled');
      tickEvent(dayEl, new Event('mouseover'), fixture);
      dayEl.dispatchEvent(new Event('click'));
    } else if (dayNumber === minDate.getDate()) {
      leftCurrentDayInListEle = dayEl;
    }
  }
  const rightMonth = resolveMonth(wrapperEle.querySelectorAll('.devui-date-title')[3].textContent.trim());
  if (String(component.maxDate.getMonth() + 1) !== rightMonth) {
    const nextMonthBtn = wrapperEle.querySelectorAll('.devui-calender-header')[1].querySelectorAll('.devui-btn-link')[2];
    tickEvent(nextMonthBtn, new Event('click'), fixture);
  }
  for (const dayEl of rightDayListEle.querySelectorAll('.devui-in-month-day')) {
    const dayNumber = Number(dayEl.querySelector('.devui-calendar-date').textContent.trim());
    if (dayNumber === component.maxDate.getDate() + 1) {
      expect(dayEl.classList).toContain('disabled');
      tickEvent(dayEl, new Event('mouseover'), fixture);
      dayEl.dispatchEvent(new Event('click'));
    } else if (dayNumber === component.maxDate.getDate()) {
      rightCurrentDayInListEle = dayEl;
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
  const testTemplate = wrapperEle.querySelector('.test-template');
  expect(testTemplate).toBeTruthy();
  // ToDo: click后会直接进入组件的ngOnDestroy，并且没有走chooseDate，但是toHaveBeenCalled没有报错也没有执行，预测detectChanges直接结束了it

  tickEvent(document.querySelector('.devui-date-range-custom'), new Event('click'), fixture);
  expect(wrapperEle.querySelector('.test-class')).toBeTruthy();
  closeDatePicker(fixture);
}

function testTimePicker(fixture, wrapperEle, component) {
  fixture.detectChanges();

  component.selectedRange = [new Date(`${strDate(0, 0, 0)}`), new Date(`${strDate(0, 1, 0)}`)];
  fixture.detectChanges();
  component.inputEle.nativeElement.value = `${strDate(0, -1, 0)}${component.splitter}${strDate(0, 1, 0)}`;
  tickEvent(component.inputEle.nativeElement, new Event('input'), fixture, 1000);
  tickEvent(component.inputEle.nativeElement, new Event('blur'), fixture, 1000);

  openDatePicker(fixture);

  const leftDayListEle = wrapperEle.querySelectorAll('tbody')[0];
  const rightDayListEle = wrapperEle.querySelectorAll('tbody')[1];
  const leftCurrentDayInListEle = leftDayListEle.querySelectorAll('.devui-day')[7];
  const rightCurrentDayInListEle = rightDayListEle.querySelectorAll('.devui-day')[7];
  tickEvent(leftCurrentDayInListEle, new Event('click'), fixture);
  tickEvent(rightCurrentDayInListEle, new Event('click'), fixture);

  let picker = {
    left: wrapperEle.querySelectorAll('.devui-date-picker')[0],
    right: wrapperEle.querySelectorAll('.devui-date-picker')[1],
  };
  expect(picker.left.querySelector('.devui-timepicker')).toBeTruthy();
  expect(picker.right.querySelector('.devui-timepicker')).toBeTruthy();
  closeDatePicker(fixture);

  component.dateRange = [
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
  ];
  fixture.detectChanges();
  tick();
  fixture.detectChanges();
  openDatePicker(fixture);
  picker = {
    left: wrapperEle.querySelectorAll('.devui-date-picker')[0],
    right: wrapperEle.querySelectorAll('.devui-date-picker')[1],
  };
  function timeEles(whichPicker, type) {
    const index = ['hours', 'minutes', 'seconds'].indexOf(type);
    return whichPicker.querySelector('.devui-timepicker').querySelectorAll('.devui-time')[index];
  }
  function timeInputEles(whichPicker, type) {
    return timeEles(whichPicker, type).querySelector('input');
  }
  function timeBtnEles(whichPicker, type, t) {
    return timeEles(whichPicker, type).querySelector(`.btn-${t}`);
  }
  const timeInputEle = {
    left: {
      hours: timeInputEles(picker.left, 'hours'),
      minutes: timeInputEles(picker.left, 'minutes'),
      seconds: timeInputEles(picker.left, 'seconds'),
    },
    right: {
      hours: timeInputEles(picker.right, 'hours'),
      minutes: timeInputEles(picker.right, 'minutes'),
      seconds: timeInputEles(picker.right, 'seconds'),
    },
  };
  const timeBtnEle = {
    left: {
      hours: {
        up: timeBtnEles(picker.left, 'hours', 'up'),
        down: timeBtnEles(picker.left, 'hours', 'down'),
      },
      minutes: {
        up: timeBtnEles(picker.left, 'minutes', 'up'),
        down: timeBtnEles(picker.left, 'minutes', 'down'),
      },
      seconds: {
        up: timeBtnEles(picker.left, 'seconds', 'up'),
        down: timeBtnEles(picker.left, 'seconds', 'down'),
      },
    },
    right: {
      hours: {
        up: timeBtnEles(picker.right, 'hours', 'up'),
        down: timeBtnEles(picker.right, 'hours', 'down'),
      },
      minutes: {
        up: timeBtnEles(picker.right, 'minutes', 'up'),
        down: timeBtnEles(picker.right, 'minutes', 'down'),
      },
      seconds: {
        up: timeBtnEles(picker.right, 'seconds', 'up'),
        down: timeBtnEles(picker.right, 'seconds', 'down'),
      },
    },
  };

  for (const side in timeBtnEle) {
    if (side) {
      for (const time in timeBtnEle[side]) {
        if (time) {
          for (const t in timeBtnEle[side][time]) {
            if (t) {
              timeBtnEle[side][time][t].dispatchEvent(new Event('click'));
            }
          }
        }
      }
    }
  }

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
          testTimePickerBtn(
            picker[side].querySelectorAll('.devui-btn-nav')[arr.indexOf(time)],
            fixture,
            timeEvent,
            timeInputEle[side][time],
            component
          );
        }
      }
    }
  }

  const confirmBtn = wrapperEle.querySelector('.devui-btn-wrapper').querySelector('button');
  tickEvent(confirmBtn, new Event('click'), fixture);

  expect(component.getValue).toHaveBeenCalled();
  expect(component.inputEle.nativeElement.value).toBe(
    /* eslint-disable-next-line max-len*/
    `${strDate(0, 0, 0)} 0${timeEvent}:0${timeEvent}:0${timeEvent}${component.splitter}${strDate(
      0,
      1,
      0
    )} 0${timeEvent}:0${timeEvent}:0${timeEvent}`
  );
  expect(component.dateRange).toEqual([
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      Number(timeEvent),
      Number(timeEvent),
      Number(timeEvent)
    ),
    new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate(),
      Number(timeEvent),
      Number(timeEvent),
      Number(timeEvent)
    ),
  ]);
}

function testTimePickerInput(inputEle, fixture, timeEvent) {
  const backSpaceKeyboard = EventHelper.createKeyBoardEvent('keydown', { key: 'Backspace', keyCode: 8 });
  const keyBoardEvent = EventHelper.createKeyBoardEvent('keydown', {
    key: timeEvent,
    code: `Digit${timeEvent}`,
    charCode: 48 + Number(timeEvent),
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
  tick(300);
  expect(inputEle.value).toBe(padZero(Number(timeEvent) + 1));
  expect(component.getValue).toHaveBeenCalled();

  tickEvent(deBtnEle, new Event('click'), fixture);
  tick(300);
  expect(inputEle.value).toBe(padZero(timeEvent));
  expect(component.getValue).toHaveBeenCalled();
}

function testDateConfig(fixture, wrapperEle, component) {
  component.dateRange = [
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
  ];
  fixture.detectChanges();
  tick();
  fixture.detectChanges();
  openDatePicker(fixture);
  const confirmBtn = wrapperEle.querySelector('.devui-btn-wrapper').querySelector('button');
  fixture.detectChanges();
  tick();
  fixture.detectChanges();
  tickEvent(confirmBtn, new Event('click'), fixture);

  expect(component.inputEle.nativeElement.value).toBe(
    /* eslint-disable-next-line max-len*/
    `${strDate(0, 0, 0, undefined, ['mm', 'dd', 'yy'], '.')} 00-00-00${component.splitter}${strDate(0, 1, 0, undefined, ['mm', 'dd', 'yy'], '.')} 00-00-00`
  );
}
