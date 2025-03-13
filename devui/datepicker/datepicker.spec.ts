import { Component, DebugElement, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
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
}

@Component({
    template: `
    <div class="devui-input-group devui-dropdown-origin">
      <input
        #inputEle
        class="devui-input devui-form-control"
        dDatepicker
        (focus)="datePicker1.toggle()"
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
      <div *ngIf="selectedDate1" class="devui-input-group-addon close-icon-wrapper" (click)="datePicker1.clearAll()">
        <i class="icon icon-close"></i>
      </div>
      <div class="devui-input-group-addon" (click)="datePicker1.toggle(toggle); toggle = !toggle" #icon>
        <i class="icon icon-calendar"></i>
      </div>
    </div>
    <ng-template #myCustomView>
      <div class="test-template">test template</div>
    </ng-template>
  `,
    standalone: false
})
class TestDatePickerDirectiveComponent {
  selectedDate1;
  @ViewChild('inputEle', {read: ElementRef}) inputEle: ElementRef;
  @ViewChild('icon', { read: ElementRef }) icon: ElementRef;
  @ViewChild('myCustomView') myCustomView: TemplateRef<any>;

  cssClass = '';
  disabled = false;
  direction = 'down';
  dateConfig;
  dateFormat = 'y/MM/dd';
  minDate;
  maxDate;
  autoOpen = false;
  customViewTemplate;
  showTime = false;

  toggle = true;

  getValue = jasmine.createSpy('get value');

  constructor() {}
}

@Component({
    template: `
    <div class="devui-input-group devui-dropdown-origin">
      <input
        #inputEle
        class="devui-input devui-form-control"
        dDatepicker
        (focus)="datePicker1.toggle()"
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
      <div *ngIf="selectedDate1" class="devui-input-group-addon close-icon-wrapper" (click)="datePicker1.clearAll()">
        <i class="icon icon-close"></i>
      </div>
      <div class="devui-input-group-addon" (click)="datePicker1.toggle(toggle); toggle = !toggle" #icon>
        <i class="icon icon-calendar"></i>
      </div>
    </div>
    <ng-template #myCustomView>
      <div class="test-template">test template</div>
    </ng-template>
  `,
    standalone: false
})
class TestDatePickerAppendToBodyComponent {
  selectedDate1;
  @ViewChild('inputEle', { read: ElementRef }) inputEle: ElementRef;
  @ViewChild('icon', { read: ElementRef }) icon: ElementRef;
  @ViewChild('myCustomView') myCustomView: TemplateRef<any>;

  cssClass = '';
  disabled = false;
  dateConfig;
  dateFormat = 'y/MM/dd';
  minDate;
  maxDate;
  autoOpen = false;
  customViewTemplate;
  showTime = false;

  toggle = true;

  getValue = jasmine.createSpy('get value');

  setValue(event) {
    setTimeout(() => {
      this.selectedDate1 = event;
    });
  }

  constructor() {}
}

@Component({
    template: `
    <d-datepicker
      [dateConfig]="dateConfig"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [customViewTemplate]="customViewTemplate"
      [(ngModel)]="selectedDate"
      (selectedDateChange)="getValue($event)"
    ></d-datepicker>
    <ng-template #myCustomView let-clearAll="clearAll">
      <div class="test-template" (click)="clearAll()">
        clear
      </div>
    </ng-template>
  `,
    standalone: false
})
class TestDatePickerCmpComponent {
  dateConfig = null;
  minDate;
  maxDate;
  selectedDate;
  customViewTemplate;
  @ViewChild('myCustomView') myCustomView: TemplateRef<any>;
  getValue = jasmine.createSpy('value change');
}

describe('datePicker', () => {
  describe('directive', () => {
    let fixture: ComponentFixture<TestDatePickerDirectiveComponent>;
    let debugEl: DebugElement;
    let component: TestDatePickerDirectiveComponent;
    let domHelper: DomHelper<TestDatePickerDirectiveComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DatepickerModule, NoopAnimationsModule, FormsModule],
        declarations: [TestDatePickerDirectiveComponent]
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
        flush();
      }));

      it('should ngModel works, should change year and month works', fakeAsync(() => {
        testNgModelAndYearMonth(fixture, debugEl.nativeElement, component);
        flush();
      }));

      it('should @Input works', fakeAsync(() => {
        testInputParam(fixture, debugEl.nativeElement, component);
        flush();
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
          tick();
          fixture.detectChanges();
          const datePicker = debugEl.nativeElement.querySelector('d-datepicker');

          expect(datePicker.style.display).not.toBe('none');
          expect(datePicker.style.bottom).not.toBe('none');

          closeDatePicker(fixture);
          flush();
        }));

        it('should showTime works', fakeAsync(() => {
          testTimePicker(fixture, debugEl.nativeElement, component);
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
              time: 'MM.dd.y mm-ss-HH'
            }
          };
          component.autoOpen = true;
        });

        it('should dateConfig works', fakeAsync(() => {
          testDateConfig(fixture, debugEl.nativeElement, component);
          flush();
        }));
      });

      describe('test wrong control', () => {
        beforeEach(() => {
          component.dateConfig = {
            timePicker: true
          };
        });

        it('should not wrong dateConfig works', fakeAsync(() => {
          fixture.detectChanges();
          component.inputEle.nativeElement.dispatchEvent(new Event('focus'));
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
          expect(document.querySelector('.devui-time')).toBeFalsy();
          closeDatePicker(fixture);
          flush();
        }));
      });
    });
  });

  describe('appendToBody', () => {
    let fixture: ComponentFixture<TestDatePickerAppendToBodyComponent>;
    let debugEl: DebugElement;
    let component: TestDatePickerAppendToBodyComponent;
    let domHelper: DomHelper<TestDatePickerAppendToBodyComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DatepickerModule, NoopAnimationsModule, FormsModule],
        declarations: [TestDatePickerAppendToBodyComponent]
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

        document.dispatchEvent(new Event('mousedown'));
        fixture.detectChanges();
        document.dispatchEvent(new Event('mouseup'));
        fixture.detectChanges();

        closeDatePicker(fixture);
        datePicker = document.querySelector('d-datepicker');
        expect(datePicker).toBeFalsy();
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
          flush();
        }));

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
              time: 'MM.dd.y mm-ss-HH'
            }
          };
          component.autoOpen = true;
        });

        it('should dateConfig works', fakeAsync(() => {
          testDateConfig(fixture, document, component);
          flush();
        }));
      });

      describe('test wrong control', () => {
        beforeEach(() => {
          component.dateConfig = {
            timePicker: true
          };
        });

        it('should not wrong dateConfig works', fakeAsync(() => {
          fixture.detectChanges();
          component.inputEle.nativeElement.dispatchEvent(new Event('focus'));
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
          expect(document.querySelector('.devui-time')).toBeFalsy();
          closeDatePicker(fixture);
          flush();
        }));
      });
    });
  });

  describe('component', () => {
    let fixture: ComponentFixture<TestDatePickerCmpComponent>;
    let debugEl: DebugElement;
    let component: TestDatePickerCmpComponent;
    let domHelper: DomHelper<TestDatePickerCmpComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DatepickerModule, NoopAnimationsModule, FormsModule],
        declarations: [TestDatePickerCmpComponent]
      }).compileComponents();
    }));

    describe('basic param', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(TestDatePickerCmpComponent);
        debugEl = fixture.debugElement;
        component = debugEl.componentInstance;

        domHelper = new DomHelper(fixture);
        fixture.detectChanges();
      });

      it('should datePicker show', fakeAsync(() => {
        const classList = [
          'd-datepicker',
          '.devui-month-view', '.devui-month-view-table',
          '.devui-date-header', '.devui-week-header',
          '.devui-date-title',
          '.devui-day', '.devui-out-of-month', '.devui-in-month-day', '.devui-calendar-date',
          '.time-picker-view'
        ];
        expect(domHelper.judgeAppendToBodyStyleClasses(classList)).toBeTruthy();
        flush();
      }));

      it('should @Input param works', fakeAsync(() => {
        component.selectedDate = '1900-11-25';

        let now = new Date();
        let nowMonthIndex = now.getMonth();
        let lastMonthIndex = (nowMonthIndex - 1 + 12) % 12;
        let nextMonthIndex = (nowMonthIndex + 1) % 12;
        const lastDate = new Date(now.setDate(now.getDate() - 1));
        const nextDate = new Date(now.setDate(now.getDate() + 1));
        if (lastMonthIndex === lastDate.getMonth()) {
          now = nextDate;
        } else if (nextMonthIndex === nextDate.getMonth()) {
          now = lastDate;
        }
        const nowYearIndex = now.getFullYear();
        const nowYear = CommonFunctions.i18nText().datePicker.yearDisplay(nowYearIndex);
        const lastYear = CommonFunctions.i18nText().datePicker.yearDisplay(nowYearIndex - 1);
        const nextYear = CommonFunctions.i18nText().datePicker.yearDisplay(nowYearIndex + 1);
        const yearEl = debugEl.queryAll(By.css('.devui-date-title'))[0].nativeElement;
        nowMonthIndex = now.getMonth();
        lastMonthIndex = (nowMonthIndex - 1 + 12) % 12;
        nextMonthIndex = (nowMonthIndex + 1) % 12;

        fixture.detectChanges();
        expect(yearEl.innerText.trim()).toBe(nowYear);

        component.customViewTemplate = component.myCustomView;
        fixture.detectChanges();
        debugEl.query(By.css('.test-template')).nativeElement.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(component.getValue).toHaveBeenCalled();

        component.minDate = component.maxDate = now;
        const monthTextList = CommonFunctions.i18nText().datePicker.monthsOfYear;
        fixture.detectChanges();
        const doubleLeftEl = debugEl.queryAll(By.css('.devui-btn-link'))[0].nativeElement;
        const singleLeftEl = debugEl.queryAll(By.css('.devui-btn-link'))[1].nativeElement;
        const singleRightEl = debugEl.queryAll(By.css('.devui-btn-link'))[2].nativeElement;
        const doubleRightEl = debugEl.queryAll(By.css('.devui-btn-link'))[3].nativeElement;
        expect(debugEl.queryAll(By.css('.devui-date-title'))[1].nativeElement.innerText.trim()).toBe(monthTextList[nowMonthIndex]);
        singleLeftEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(debugEl.queryAll(By.css('.devui-date-title'))[1].nativeElement.innerText.trim()).not.toBe(monthTextList[lastMonthIndex]);
        singleRightEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(debugEl.queryAll(By.css('.devui-date-title'))[1].nativeElement.innerText.trim()).toBe(monthTextList[nowMonthIndex]);
        singleRightEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(debugEl.queryAll(By.css('.devui-date-title'))[1].nativeElement.innerText.trim()).not.toBe(monthTextList[nextMonthIndex]);

        doubleLeftEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(yearEl.innerText.trim()).not.toBe(lastYear);
        doubleRightEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(yearEl.innerText.trim()).toBe(nowYear);
        doubleRightEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(yearEl.innerText.trim()).not.toBe(nextYear);
        flush();
      }));

      describe('test selectedDate bigger than max or smaller than min', () => {
        const now = new Date();

        it('test selectedDate bigger than max', fakeAsync(() => {
          component.minDate = component.maxDate = now;
          component.selectedDate = new Date(now);
          component.selectedDate.setFullYear(component.selectedDate.getFullYear() + 1);
          fixture.detectChanges();
          expect(
            debugEl.query(By.css('.devui-day.active')).query(By.css('.devui-calendar-date')
            ).nativeElement.innerText.trim()).toBe((String(now.getDate())).padStart(2, '0'));
          flush();
        }));

        it('test selectedDate smaller than min', fakeAsync(() => {
          component.minDate = component.maxDate = now;
          component.selectedDate = new Date(now);
          component.selectedDate.setFullYear(component.selectedDate.getFullYear() - 1);
          fixture.detectChanges();
          expect(
            debugEl.query(By.css('.devui-day.active')).query(By.css('.devui-calendar-date')
            ).nativeElement.innerText.trim()).toBe((String(now.getDate())).padStart(2, '0'));
          flush();
        }));
      });

      it('test event', fakeAsync(() => {
        document.querySelector('d-datepicker').dispatchEvent(new Event('click'));
        let now = new Date();
        let nowMonthIndex = now.getMonth();
        let lastMonthIndex = (nowMonthIndex - 1 + 12) % 12;
        let nextMonthIndex = (nowMonthIndex + 1) % 12;
        const lastDate = new Date(now.setDate(now.getDate() - 1));
        const nextDate = new Date(now.setDate(now.getDate() + 1));
        if (lastMonthIndex === lastDate.getMonth()) {
          now = nextDate;
        } else if (nextMonthIndex === nextDate.getMonth()) {
          now = lastDate;
        }
        const nowYearIndex = now.getFullYear();
        const nowYear = CommonFunctions.i18nText().datePicker.yearDisplay(nowYearIndex);
        const lastYear = CommonFunctions.i18nText().datePicker.yearDisplay(nowYearIndex - 1);
        const nextYear = CommonFunctions.i18nText().datePicker.yearDisplay(nowYearIndex + 1);
        const yearEl = debugEl.queryAll(By.css('.devui-date-title'))[0].nativeElement;
        nowMonthIndex = now.getMonth();
        lastMonthIndex = (nowMonthIndex - 1 + 12) % 12;
        nextMonthIndex = (nowMonthIndex + 1) % 12;
        const monthTextList = CommonFunctions.i18nText().datePicker.monthsOfYear;
        fixture.detectChanges();
        const doubleLeftEl = debugEl.queryAll(By.css('.devui-btn-link'))[0].nativeElement;
        const singleLeftEl = debugEl.queryAll(By.css('.devui-btn-link'))[1].nativeElement;
        const singleRightEl = debugEl.queryAll(By.css('.devui-btn-link'))[2].nativeElement;
        const doubleRightEl = debugEl.queryAll(By.css('.devui-btn-link'))[3].nativeElement;
        expect(debugEl.queryAll(By.css('.devui-date-title'))[1].nativeElement.innerText.trim()).toBe(monthTextList[nowMonthIndex]);
        singleLeftEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(debugEl.queryAll(By.css('.devui-date-title'))[1].nativeElement.innerText.trim()).toBe(monthTextList[lastMonthIndex]);
        singleRightEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(debugEl.queryAll(By.css('.devui-date-title'))[1].nativeElement.innerText.trim()).toBe(monthTextList[nowMonthIndex]);
        singleRightEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(debugEl.queryAll(By.css('.devui-date-title'))[1].nativeElement.innerText.trim()).toBe(monthTextList[nextMonthIndex]);
        singleLeftEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(debugEl.queryAll(By.css('.devui-date-title'))[1].nativeElement.innerText.trim()).toBe(monthTextList[nowMonthIndex]);

        expect(yearEl.innerText.trim()).toBe(nowYear);
        doubleLeftEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(yearEl.innerText.trim()).toBe(lastYear);
        doubleRightEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(yearEl.innerText.trim()).toBe(nowYear);
        doubleRightEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(yearEl.innerText.trim()).toBe(nextYear);
        doubleLeftEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(yearEl.innerText.trim()).toBe(nowYear);

        expect(debugEl.query(By.css('.devui-yearOption')).styles.display).toBe('none');
        yearEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(debugEl.query(By.css('.devui-yearOption')).styles.display).toBe('block');
        doubleLeftEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(debugEl.query(By.css('.devui-yearOption')).query(By.css('.active'))).toBeFalsy();
        doubleRightEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(debugEl.query(By.css('.devui-yearOption')).query(By.css('.active'))).toBeTruthy();
        doubleRightEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(debugEl.query(By.css('.devui-yearOption')).query(By.css('.active'))).toBeFalsy();
        document.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(debugEl.query(By.css('.devui-yearOption')).styles.display).toBe('none');
        flush();
      }));
    });

    describe('param need change when init', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(TestDatePickerCmpComponent);
        debugEl = fixture.debugElement;
        component = debugEl.componentInstance;

        domHelper = new DomHelper(fixture);
      });

      describe('test wrong control', () => {
        const now = new Date();
        beforeEach(() => {
          component.dateConfig = {
            timePicker: true
          };
          component.minDate = component.maxDate = now;
        });

        it('should not wrong dateConfig works', fakeAsync(() => {
          fixture.detectChanges();
          expect(debugEl.query(By.css('.devui-time'))).toBeFalsy();
          flush();
        }));

        it('test click disabled year', fakeAsync(() => {
          fixture.detectChanges();
          const yearEl = debugEl.queryAll(By.css('.devui-date-title'))[0].nativeElement;
          const nowYearIndex = now.getFullYear();
          const nowYear = CommonFunctions.i18nText().datePicker.yearDisplay(nowYearIndex);
          const doubleLeftEl = debugEl.queryAll(By.css('.devui-btn-link'))[0].nativeElement;
          const doubleRightEl = debugEl.queryAll(By.css('.devui-btn-link'))[3].nativeElement;
          expect(debugEl.query(By.css('.devui-yearOption')).styles.display).toBe('none');
          yearEl.dispatchEvent(new Event('click'));
          fixture.detectChanges();
          expect(debugEl.query(By.css('.devui-yearOption')).styles.display).toBe('block');
          doubleLeftEl.dispatchEvent(new Event('click'));
          fixture.detectChanges();
          doubleRightEl.dispatchEvent(new Event('click'));
          fixture.detectChanges();
          expect(yearEl.innerText.trim()).toBe(nowYear);
          debugEl.query(By.css('.devui-yearOption')).query(By.css('.disabled')).nativeElement.dispatchEvent(new Event('click'));
          expect(debugEl.query(By.css('.devui-yearOption')).styles.display).toBe('block');
          document.dispatchEvent(new Event('click'));
          fixture.detectChanges();
          expect(debugEl.query(By.css('.devui-yearOption')).styles.display).toBe('none');

          component.minDate = new Date();
          component.minDate.setFullYear(component.minDate.getFullYear() - 7);
          component.maxDate = new Date();
          component.maxDate.setFullYear(component.maxDate.getFullYear() + 6);
          fixture.detectChanges();
          yearEl.dispatchEvent(new Event('click'));
          fixture.detectChanges();
          doubleLeftEl.dispatchEvent(new Event('click'));
          fixture.detectChanges();
          doubleRightEl.dispatchEvent(new Event('click'));
          fixture.detectChanges();
          doubleRightEl.dispatchEvent(new Event('click'));
          fixture.detectChanges();
        }));
      });

      describe('test single min max year change', () => {
        const now = new Date();
        describe('test single min year change', () => {
          beforeEach(() => {
            component.minDate = now;
          });

          it('test click last year', fakeAsync(() => {
            fixture.detectChanges();
            const yearEl = debugEl.queryAll(By.css('.devui-date-title'))[0].nativeElement;
            const doubleLeftEl = debugEl.queryAll(By.css('.devui-btn-link'))[0].nativeElement;
            const doubleRightEl = debugEl.queryAll(By.css('.devui-btn-link'))[3].nativeElement;
            yearEl.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(debugEl.query(By.css('.devui-yearOption')).query(By.css('.active'))).toBeTruthy();
            doubleLeftEl.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(debugEl.query(By.css('.devui-yearOption')).query(By.css('.active'))).toBeTruthy();
            doubleRightEl.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(debugEl.query(By.css('.devui-yearOption')).query(By.css('.active'))).toBeFalsy();
            document.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(debugEl.query(By.css('.devui-yearOption')).styles.display).toBe('none');
            flush();
          }));
        });

        describe('test single max year change', () => {
          beforeEach(() => {
            component.maxDate = now;
          });

          it('test click last year', fakeAsync(() => {
            fixture.detectChanges();
            const yearEl = debugEl.queryAll(By.css('.devui-date-title'))[0].nativeElement;
            const doubleLeftEl = debugEl.queryAll(By.css('.devui-btn-link'))[0].nativeElement;
            const doubleRightEl = debugEl.queryAll(By.css('.devui-btn-link'))[3].nativeElement;
            yearEl.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(debugEl.query(By.css('.devui-yearOption')).query(By.css('.active'))).toBeTruthy();
            doubleRightEl.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(debugEl.query(By.css('.devui-yearOption')).query(By.css('.active'))).toBeTruthy();
            doubleLeftEl.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(debugEl.query(By.css('.devui-yearOption')).query(By.css('.active'))).toBeFalsy();
            document.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(debugEl.query(By.css('.devui-yearOption')).styles.display).toBe('none');
            flush();
          }));
        });
      });
    });
  });
});

function padZero(value) {
  return (String(value)).padStart(2, '0');
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
  tick();
  fixture.detectChanges();
  let datePicker = document.querySelector('d-datepicker') as HTMLElement;
  expect(datePicker.style.display).not.toBe('none');
  closeDatePicker(fixture);
  component.icon.nativeElement.dispatchEvent(new Event('click'));
  fixture.detectChanges();
  tick();
  fixture.detectChanges();
  datePicker = document.querySelector('d-datepicker') as HTMLElement;
  expect(datePicker.style.display).not.toBe('none');
  component.icon.nativeElement.dispatchEvent(new Event('click'));
  fixture.detectChanges();
  tick();
  fixture.detectChanges();
  datePicker = document.querySelector('d-datepicker') as HTMLElement;
  if (datePicker) {
    expect(datePicker.style.display).toBe('none');
  } else {
    expect(datePicker).toBeFalsy();
  }

  component.inputEle.nativeElement.dispatchEvent(new Event('focus'));
  fixture.detectChanges();
  tick();
  fixture.detectChanges();

  let yearEle = wrapperEle.querySelectorAll('.devui-date-title')[0];
  let monthEle = wrapperEle.querySelectorAll('.devui-date-title')[1];
  const yearListEle = wrapperEle.querySelector('.devui-yearOption');
  const monthListEle = wrapperEle.querySelector('.devui-monthOption');
  const currentYear = yearEle.innerText.trim().slice(0, 4);
  const currentMonth = resolveMonth(monthEle.innerText.trim());
  const nextYearEle = wrapperEle.querySelector('.devui-date-header').querySelectorAll('.devui-btn-link')[3];
  let lastYearEle;

  expect(yearListEle.style.display).toBe('none');
  expect(monthListEle.style.display).toBe('none');

  yearEle.dispatchEvent(new Event('click'));
  fixture.detectChanges();

  expect(yearListEle.style.display).not.toBe('none');

  let currentYearInListEle;
  for (const el of yearListEle.children) {
    if (el.innerText.trim() === currentYear) {
      currentYearInListEle = el;
      break;
    }
  }

  expect(currentYearInListEle.classList).toContain('active');

  let currentLastYearInListEle;
  for (const el of yearListEle.children) {
    if (Number(el.innerText.trim()) === (Number(currentYear) - 1)) {
      currentLastYearInListEle = el;
      break;
    }
  }
  currentLastYearInListEle.dispatchEvent(new Event('click'));
  fixture.detectChanges();
  const currentLastYear = currentLastYearInListEle.innerText.trim();

  expect(yearEle.innerText.trim().slice(0, 4)).toBe(currentLastYear);

  nextYearEle.dispatchEvent(new Event('click'));
  fixture.detectChanges();
  expect(yearEle.innerText.trim().slice(0, 4)).toBe(currentYear);

  monthEle.dispatchEvent(new Event('click'));
  fixture.detectChanges();

  expect(monthListEle.style.display).not.toBe('none');

  let currentMonthInListEle;
  for (const el of monthListEle.children) {
    if (resolveMonth(el.innerText.trim()) === currentMonth) {
      currentMonthInListEle = el;
      break;
    }
  }

  expect(currentMonthInListEle.classList).toContain('active');

  let currentLastMonthInListEle;
  const tempMonth = (currentMonth === '1' ? '13' : currentMonth);
  for (const el of monthListEle.children) {
    if (Number(resolveMonth(el.innerText.trim())) === (Number(tempMonth) - 1)) {
      currentLastMonthInListEle = el;
      break;
    }
  }
  currentLastMonthInListEle.dispatchEvent(new Event('click'));
  fixture.detectChanges();
  const currentLastMonth = resolveMonth(currentLastMonthInListEle.innerText.trim());

  expect(resolveMonth(monthEle.innerText.trim())).toBe(currentLastMonth);

  const nextMonthEle = wrapperEle.querySelector('.devui-date-header').querySelectorAll('.devui-btn-link')[2];
  if (currentLastMonth === '12') {
    lastYearEle = wrapperEle.querySelector('.devui-date-header').querySelectorAll('.devui-btn-link')[0];
    lastYearEle.dispatchEvent(new Event('click'));
    fixture.detectChanges();
  }
  nextMonthEle.dispatchEvent(new Event('click'));
  fixture.detectChanges();
  expect(resolveMonth(monthEle.innerText.trim())).toBe(currentMonth);

  let dayListEle = wrapperEle.querySelector('tbody');
  let currentDayInListEle = dayListEle.querySelector('.active');
  let currentDay = currentDayInListEle.querySelector('.devui-calendar-date').innerText.trim();

  expect(Number(currentDay)).toBe(new Date().getDate());

  let currentWhichDayInListEle;
  let currentWhichDay;

  for (const dayEl of dayListEle.querySelectorAll('.devui-in-month-day')) {
    const dayNumber = Number(dayEl.querySelector('.devui-calendar-date').innerText.trim());
    if (
      (currentDay !== '01') && dayNumber === (Number(currentDay) - 1) ||
      (currentDay === '01') && dayNumber === (Number(currentDay) + 1)
    ) {
      currentWhichDayInListEle = dayEl;
      currentWhichDay = currentWhichDayInListEle.querySelector('.devui-calendar-date').innerText.trim();
      break;
    }
  }

  tickEvent(currentWhichDayInListEle, new Event('click'), fixture);

  const newWhichDay = (currentDay === '01' ? new Date().getDate() + 1 : new Date().getDate() - 1);
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
  tick();
  fixture.detectChanges();
  yearEle = wrapperEle.querySelectorAll('.devui-date-title')[0];

  expect(yearEle.innerText.trim().slice(0, 4)).toBe(String(new Date().getFullYear() - 1));

  const lastMonthEle = wrapperEle.querySelector('.devui-date-header').querySelectorAll('.devui-btn-link')[1];
  lastMonthEle.dispatchEvent(new Event('click'));
  fixture.detectChanges();
  monthEle = wrapperEle.querySelectorAll('.devui-date-title')[1];
  let trueMonth = new Date().getMonth() + 1;
  if (trueMonth === 1) {
    trueMonth = 13;
  }

  expect(resolveMonth(monthEle.innerText.trim())).toBe(String(trueMonth - 1));

  closeDatePicker(fixture);

  component.selectedDate1 = new Date();
  fixture.detectChanges();
  tick();
  fixture.detectChanges();
  component.inputEle.nativeElement.dispatchEvent(new Event('focus'));
  fixture.detectChanges();
  tick();
  fixture.detectChanges();
  dayListEle = wrapperEle.querySelector('tbody');
  currentDayInListEle = dayListEle.querySelector('.active');
  currentDay = currentDayInListEle.querySelector('.devui-calendar-date').innerText.trim();

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
  tick();
  fixture.detectChanges();
  dayListEle = wrapperEle.querySelector('tbody');
  currentDayInListEle = dayListEle.querySelector('.active');
  currentDay = currentDayInListEle.querySelector('.devui-calendar-date').innerText.trim();
  expect(component.inputEle.nativeElement.value).toBe(
    `${new Date().getFullYear()}/${padZero(new Date().getMonth() + 1)}/05`
  );
  closeDatePicker(fixture);

  component.inputEle.nativeElement.value = `${new Date().getFullYear()}/${padZero(new Date().getMonth() + 1)}/05`;
  tickEvent(component.inputEle.nativeElement, new Event('input'), fixture, 1000);
  tickEvent(component.inputEle.nativeElement, new Event('blur'), fixture, 1000);
  fixture.detectChanges();

  component.inputEle.nativeElement.value = '';
  tickEvent(component.inputEle.nativeElement, new Event('input'), fixture, 1000);
  tickEvent(component.inputEle.nativeElement, new Event('blur'), fixture, 1000);
  fixture.detectChanges();
  expect(component.getValue).toHaveBeenCalled();
  component.selectedDate = null;
  component.inputEle.nativeElement.value = '';
  fixture.detectChanges();
  tickEvent(component.inputEle.nativeElement, new Event('input'), fixture, 1000);
  tickEvent(component.inputEle.nativeElement, new Event('blur'), fixture, 1000);
  fixture.detectChanges();
  closeDatePicker(fixture);
}

function testInputParam(fixture, wrapperEle, component) {
  component.cssClass = 'test-class';
  component.minDate = new Date();
  component.minDate.setDate(component.minDate.getDate() - 1);
  component.maxDate = new Date();
  component.maxDate.setDate(component.maxDate.getDate() + 1);
  component.dateFormat = 'MM.dd.y';
  component.customViewTemplate = component.myCustomView;
  fixture.detectChanges();
  component.inputEle.nativeElement.dispatchEvent(new Event('focus'));
  fixture.detectChanges();
  tick();
  fixture.detectChanges();

  expect(wrapperEle.querySelector('.test-class')).toBeTruthy();
  expect(wrapperEle.querySelector('.test-template')).toBeTruthy();

  const dayListEle = wrapperEle.querySelector('tbody');
  const availableDayNumberList: any[] = [new Date()];
  const lastAvailable = new Date();
  lastAvailable.setDate(lastAvailable.getDate() - 1);
  if (availableDayNumberList[0].getDate() !== 1) {
    availableDayNumberList.unshift(lastAvailable);
  }
  const nextAvailable = new Date();
  nextAvailable.setDate(nextAvailable.getDate() + 1);
  if (nextAvailable.getDate() !== 1) {
    availableDayNumberList.push(nextAvailable);
  }
  availableDayNumberList.forEach((date, index) => { availableDayNumberList[index] = (String(date.getDate())).padStart(2, '0'); });
  for (const dayEl of dayListEle.querySelectorAll('.devui-in-month-day')) {
    const dayNumber = dayEl.querySelector('.devui-calendar-date').innerText.trim();
    if (
      availableDayNumberList.indexOf(dayNumber) < 0
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

  component.inputEle.nativeElement.value = '2020-11-25';
  tickEvent(component.inputEle.nativeElement, new Event('input'), fixture, 1000);
  tickEvent(component.inputEle.nativeElement, new Event('blur'), fixture, 1000);
  fixture.detectChanges();
  expect(component.inputEle.nativeElement.value).toBe('');

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
  /* eslint-disable-next-line max-len*/
  expect(component.inputEle.nativeElement.value).toBe(`${new Date().getFullYear()}/${padZero(new Date().getMonth() + 1)}/${padZero(new Date().getDate())} 0${timeEvent}:0${timeEvent}:0${timeEvent}`);
  expect(component.selectedDate1).toEqual(
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), Number(timeEvent), Number(timeEvent), Number(timeEvent))
  );

  component.inputEle.nativeElement.value = '2020-11-25';
  tickEvent(component.inputEle.nativeElement, new Event('input'), fixture, 1000);
  tickEvent(component.inputEle.nativeElement, new Event('blur'), fixture, 1000);
  fixture.detectChanges();
  /* eslint-disable-next-line max-len*/
  expect(component.inputEle.nativeElement.value).toBe(`${new Date().getFullYear()}/${padZero(new Date().getMonth() + 1)}/${padZero(new Date().getDate())} 0${timeEvent}:0${timeEvent}:0${timeEvent}`);
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

  // MM.dd.y mm-ss-HH
  /* eslint-disable-next-line max-len*/
  expect(component.inputEle.nativeElement.value).toBe(`${padZero(new Date().getMonth() + 1)}.${padZero(new Date().getDate())}.${new Date().getFullYear()} ${padZero(new Date().getMinutes())}-${padZero(new Date().getSeconds())}-${padZero(new Date().getHours())}`);
}
