import { Component, DebugElement, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DomHelper } from '../utils/testing/dom-helper';
import { TimePickerModule } from './time-picker.module';

interface TimeList {
  disabled: boolean;
  index: number;
}

class CommonFunctions {
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

  static flushEvent(el, event, fixture): void {
    el.dispatchEvent(event);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }

  static closeTimePicker(fixture) {
    this.tickEvent(document, new Event('click'), fixture);
  }

  static openTimePicker(fixture) {
    const el = fixture.debugElement.componentInstance.inputEle.nativeElement;
    this.tickEvent(el, new Event('click'), fixture);
  }

  static padZero(value) {
    return String(value).padStart(2, '0');
  }
}

class TestFunctions {
  static clickList(list: Array<TimeList>, inputEle: ElementRef, fixture) {
    // 下面要根据第几列选择类名
    const whichListMap = ['first', 'second', 'third'];
    // 当前input框的值，用于在disabled的时候抽离默认值
    const inputValueList = inputEle.nativeElement.value.split(':').map((time) => time.trim());
    // 循环列表,对每一列列表进行处理
    const resList = list.map((timeList, whichList) => {
      // 根据第几列拿到类名和列中元素的类名
      const timeEle = document.querySelectorAll(`.devui-${whichListMap[whichList]}-item`)[timeList.index];
      if (timeList.disabled) {
        expect(timeEle.classList).toContain('disabled');
        // 把默认值保存
        return {
          ...timeList,
          res: inputValueList[whichList],
        };
      } else {
        expect(timeEle.textContent.trim()).toBe(String(timeList.index).padStart(2, '0'));
        CommonFunctions.flushEvent(timeEle, new Event('click'), fixture);
        expect(fixture.debugElement.componentInstance.model).toHaveBeenCalled();
        // 把元素展示的值保存
        return {
          ...timeList,
          res: timeEle.textContent.trim(),
        };
      }
    });
    // 点击完之后看整个input框的值展示是否正确
    expect(inputEle.nativeElement.value).toBe(resList.map((timeList) => timeList.res).join(':'));
  }

  static inputValue(value: string, inputEle: ElementRef, fixture) {
    const whichListMap = ['first', 'second', 'third'];
    const defaultValueList = inputEle.nativeElement.value.split(':').map((time) => time.trim());
    const inputValueList = value.split(':').map((time) => time.trim());
    const valueArr = value.split('');
    inputEle.nativeElement.value = '';
    CommonFunctions.flushEvent(inputEle.nativeElement, new Event('input'), fixture);
    CommonFunctions.tickEvent(inputEle.nativeElement, new Event('keyup'), fixture, 300);
    let curValue = '';
    valueArr.forEach((singleValue) => {
      curValue = curValue + singleValue;
      inputEle.nativeElement.value = curValue;
      CommonFunctions.flushEvent(inputEle.nativeElement, new Event('input'), fixture);
      CommonFunctions.tickEvent(inputEle.nativeElement, new Event('keyup'), fixture, 300);
    });
    CommonFunctions.flushEvent(inputEle.nativeElement, new Event('blur'), fixture);
    CommonFunctions.openTimePicker(fixture);
    const resList = inputValueList.map((inputValue, whichList) => {
      const index = Number(inputValue);
      const timeEle = document.querySelectorAll(`.devui-${whichListMap[whichList]}-item`)[index];
      if (timeEle.classList.contains('disabled')) {
        return {
          disabled: true,
          index: index,
          res: defaultValueList[whichList],
        };
      } else {
        return {
          disabled: false,
          index: index,
          res: inputValueList[whichList],
        };
      }
    });
    expect(fixture.debugElement.componentInstance.model).toHaveBeenCalled();
    expect(inputEle.nativeElement.value).toBe(resList.map((timeList) => timeList.res).join(':'));
  }
}

@Component({
  template: `
    <div class="place-holder" (click)="timePicker.toggle()" [style.height]="placeHolderHeight ? '900px' : '0'">this is place holder</div>
    <div class="devui-input-group devui-dropdown-origin-wrapper devui-dropdown-origin">
      <input
        class="devui-input devui-form-control"
        dTimePicker
        #inputEle
        #timePicker="timePicker"
        [disabled]="disabled"
        [customViewTemplate]="customViewTemplate"
        [autoOpen]="autoOpen"
        [minTime]="minTime"
        [maxTime]="maxTime"
        [format]="format"
        [appendToBodyDirections]="appendToBodyDirections"
        [timePickerWidth]="timePickerWidth"
        [(ngModel)]="selectedTime"
        (click)="timePicker.toggle()"
        (selectedTimeChange)="change($event)"
        (ngModelChange)="model($event)"
      />
    </div>

    <ng-template #myCustomView>
      <div class="test-template" (click)="timePicker.clearAll()">test template</div>
    </ng-template>
  `,
})
class TestTimePickerComponent {
  placeHolderHeight = false;

  @ViewChild('inputEle', { read: ElementRef }) inputEle: ElementRef;
  @ViewChild('myCustomView') myCustomView: TemplateRef<any>;

  disabled;
  customViewTemplate;
  autoOpen;
  minTime;
  maxTime;
  format;
  timePickerWidth;
  appendToBodyDirections = ['rightDown'];

  model = jasmine.createSpy('model');
  change = jasmine.createSpy('change');

  constructor() {}
}

describe('timePicker', () => {
  let fixture: ComponentFixture<TestTimePickerComponent>;
  let debugEl: DebugElement;
  let component: TestTimePickerComponent;
  let domHelper: DomHelper<TestTimePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TimePickerModule, NoopAnimationsModule, FormsModule],
      declarations: [TestTimePickerComponent],
    }).compileComponents();
  }));

  describe('basic param', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestTimePickerComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;

      domHelper = new DomHelper(fixture);
      fixture.detectChanges();
    });

    afterEach(fakeAsync(() => {
      CommonFunctions.closeTimePicker(fixture);
    }));

    it('should time picker show hide works', fakeAsync(() => {
      fixture.detectChanges();
      // 本身不显示
      expect(document.querySelector('.devui-time-picker-wrapper')).toBeFalsy();
      // 点击显示
      CommonFunctions.openTimePicker(fixture);
      expect(document.querySelector('.devui-time-picker-wrapper')).toBeTruthy();
      // 并且该有的都有
      expect(
        domHelper.judgeAppendToBodyStyleClasses([
          '.devui-time-picker-wrapper',
          '.devui-time-picker',
          '.devui-time-list',
          '.devui-first-list',
          '.devui-second-list',
          '.devui-third-list',
          '.devui-time-item',
          '.devui-first-item',
          '.devui-second-item',
          '.devui-third-item',
          '.devui-time-footer',
        ])
      ).toBeTruthy();
      // 关闭隐藏
      CommonFunctions.closeTimePicker(fixture);
      expect(document.querySelector('.devui-time-picker-wrapper')).toBeFalsy();
    }));

    it('should ngModel and default change works', fakeAsync(() => {
      CommonFunctions.openTimePicker(fixture);
      // 拿到12点12分12秒的元素
      const curHour: TimeList = {
        disabled: false,
        index: 11,
      };
      const curMin: TimeList = {
        disabled: false,
        index: 11,
      };
      const curSec: TimeList = {
        disabled: false,
        index: 11,
      };
      // 测试点击是否正确
      TestFunctions.clickList([curHour, curMin, curSec], component.inputEle, fixture);
      // 测试确定按钮触发change事件
      const confirmBtn = document.querySelector('.devui-btn-wrapper .devui-btn');
      CommonFunctions.flushEvent(confirmBtn, new Event('click'), fixture);
      expect(component.change).toHaveBeenCalled();
      // 测试是否自动关闭了
      expect(document.querySelector('.devui-time-picker-wrapper')).toBeFalsy();
      // 测试用户输入
      const time = '00:00:00';
      TestFunctions.inputValue(time, component.inputEle, fixture);
      flush();
    }));
  });

  describe('test @Input parammeters', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestTimePickerComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;

      domHelper = new DomHelper(fixture);
      fixture.detectChanges();
    });

    afterEach(fakeAsync(() => {
      CommonFunctions.closeTimePicker(fixture);
    }));

    it('should disabled works', fakeAsync(() => {
      component.disabled = true;
      fixture.detectChanges();
      CommonFunctions.openTimePicker(fixture);
      expect(document.querySelector('.devui-time-picker-wrapper')).toBeFalsy();
    }));

    it('should customViewTemplate and clearAll works', fakeAsync(() => {
      component.customViewTemplate = component.myCustomView;
      fixture.detectChanges();
      CommonFunctions.openTimePicker(fixture);
      expect(document.querySelector('.test-template')).toBeTruthy();

      // 拿到12点12分12秒的元素
      const curHour: TimeList = {
        disabled: false,
        index: 11,
      };
      const curMin: TimeList = {
        disabled: false,
        index: 11,
      };
      const curSec: TimeList = {
        disabled: false,
        index: 11,
      };
      TestFunctions.clickList([curHour, curMin, curSec], component.inputEle, fixture);
      expect(component.inputEle.nativeElement.value).toBeTruthy('12:12:12');
      CommonFunctions.flushEvent(document.querySelector('.test-template'), new Event('click'), fixture);
      expect(component.inputEle.nativeElement.value).toBeTruthy('00:00:00');
    }));

    it('input invalid value should back', fakeAsync(() => {
      component.inputEle.nativeElement.value = 0;
      CommonFunctions.flushEvent(component.inputEle.nativeElement, new Event('input'), fixture);
      CommonFunctions.tickEvent(component.inputEle.nativeElement, new Event('keyup'), fixture, 300);

      expect(component.inputEle.nativeElement.value).toBeTruthy('00:00:00');
    }));

    it('appendToBodyDirections should work', fakeAsync(() => {
      component.appendToBodyDirections = ['rightUp'];
      tick();
      fixture.detectChanges();
      CommonFunctions.openTimePicker(fixture);
      const dropdownEle = document.querySelector('.devui-time-picker') as HTMLElement;
      // 右上时dropdown顶到页面上方
      expect(dropdownEle.offsetTop).toBe(4);
    }));
  });

  describe('test parammeters when init', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestTimePickerComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;

      domHelper = new DomHelper(fixture);
    });

    describe('test autoOpen', () => {
      beforeEach(() => {
        component.autoOpen = true;
      });

      it('should autoOpen works', fakeAsync(() => {
        fixture.detectChanges();
        expect(document.querySelector('.devui-time-picker-wrapper')).toBeTruthy();
        CommonFunctions.closeTimePicker(fixture);
      }));
    });

    describe('test minTime', () => {
      beforeEach(() => {
        // 设置最小为13点13分13秒的元素
        component.minTime = '13:13:13';
      });

      it('should minTime works', fakeAsync(() => {
        fixture.detectChanges();
        CommonFunctions.openTimePicker(fixture);
        // 拿到12点12分12秒的元素
        const curHour: TimeList = {
          disabled: true,
          index: 11,
        };
        const curMin: TimeList = {
          disabled: true,
          index: 11,
        };
        const curSec: TimeList = {
          disabled: true,
          index: 11,
        };
        // 测试点击是否正确
        TestFunctions.clickList([curHour, curMin, curSec], component.inputEle, fixture);
        // 测试确定按钮触发change事件
        const confirmBtn = document.querySelector('.devui-btn-wrapper .devui-btn');
        CommonFunctions.flushEvent(confirmBtn, new Event('click'), fixture);
        expect(component.change).toHaveBeenCalled();
        // 测试用户输入
        const time = '12:12:12';
        TestFunctions.inputValue(time, component.inputEle, fixture);
        CommonFunctions.closeTimePicker(fixture);
      }));
    });

    describe('test time limit', () => {
      beforeEach(() => {
        // 设置最大为11点11分11秒的元素
        component.maxTime = '11:11:11';
        component.minTime = '09:09:09';
      });

      it('should time limit works', fakeAsync(() => {
        fixture.detectChanges();
        CommonFunctions.openTimePicker(fixture);
        // 拿到12点12分12秒的元素
        let curHour: TimeList = {
          disabled: true,
          index: 12,
        };
        let curMin: TimeList = {
          disabled: false,
          index: 12,
        };
        let curSec: TimeList = {
          disabled: false,
          index: 12,
        };
        // 测试点击是否正确
        TestFunctions.clickList([curHour, curMin, curSec], component.inputEle, fixture);

        curHour = {
          disabled: false,
          index: 11,
        };
        curMin = {
          disabled: false,
          index: 11,
        };
        curSec = {
          disabled: false,
          index: 10,
        };
        // 测试点击是否正确
        TestFunctions.clickList([curHour, curMin, curSec], component.inputEle, fixture);
        // 测试确定按钮触发change事件
        const confirmBtn = document.querySelector('.devui-btn-wrapper .devui-btn');
        CommonFunctions.flushEvent(confirmBtn, new Event('click'), fixture);
        expect(component.change).toHaveBeenCalled();
        // 测试用户输入
        const time = '10:10:10';
        TestFunctions.inputValue(time, component.inputEle, fixture);
        CommonFunctions.closeTimePicker(fixture);
      }));
    });

    describe('test format', () => {
      beforeEach(() => {
        component.format = 'mm:ss';
        component.maxTime = '11:11:11';
        component.minTime = '09:09:09';
      });

      it('should format works', fakeAsync(() => {
        fixture.detectChanges();
        CommonFunctions.openTimePicker(fixture);

        let curMin: TimeList = {
          disabled: false,
          index: 11,
        };
        let curSec: TimeList = {
          disabled: true,
          index: 12,
        };
        TestFunctions.clickList([curMin, curSec], component.inputEle, fixture);

        curMin = {
          disabled: false,
          index: 10,
        };
        curSec = {
          disabled: false,
          index: 7,
        };
        TestFunctions.clickList([curMin, curSec], component.inputEle, fixture);

        component.inputEle.nativeElement.value = '';
        CommonFunctions.flushEvent(component.inputEle.nativeElement, new Event('input'), fixture);
        CommonFunctions.tickEvent(component.inputEle.nativeElement, new Event('keyup'), fixture, 300);
        curMin = {
          disabled: false,
          index: 9,
        };
        curSec = {
          disabled: true,
          index: 7,
        };
        TestFunctions.clickList([curMin, curSec], component.inputEle, fixture);

        fixture.detectChanges();
        expect(document.querySelectorAll('.devui-time-list').length).toBe(2);
        expect(document.querySelectorAll('.devui-first-item').length).toBe(60);
        expect(document.querySelectorAll('.devui-second-item').length).toBe(60);

        CommonFunctions.closeTimePicker(fixture);
      }));
    });

    describe('test timePickerWidth', () => {
      beforeEach(() => {
        component.timePickerWidth = 300;
      });

      it('should timePickerWidth works', fakeAsync(() => {
        fixture.detectChanges();
        CommonFunctions.openTimePicker(fixture);
        expect((document.querySelector('.cdk-overlay-pane') as any).style.width).toBe('300px');
        CommonFunctions.closeTimePicker(fixture);
      }));
    });
  });
});
