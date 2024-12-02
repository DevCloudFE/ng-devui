import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TimeAxisComponent } from './time-axis.component';
import { TimeAxisModule } from './time-axis.module';

@Component({
  template: `<d-time-axis [data]="time_axis_data" [mode]="'alternative'"></d-time-axis> `,
})
class TestTimeAxisComponent {
  time_axis_data = {
    direction: 'vertical',
    position: 'left',
    model: 'text',
    list: [
      { time: '2017-07-25', text: '这是2017-07-25发生的事件', type: 'primary' },
      { time: '2017-07-27', text: '这是2017-07-27发生的事件', type: 'success' },
      { time: '2017-07-28', text: '这是2017-07-28发生的事件', type: 'danger' },
      { time: '2017-07-29', text: '这是2017-07-29发生的事件', type: 'warning' },
      { time: '2017-07-29', text: '这是2017-07-29发生的事件', type: 'warning' },
    ],
  };
}

describe('time-axis base', () => {
  let fixture: ComponentFixture<TestTimeAxisComponent>;
  let testComponent: TestTimeAxisComponent;
  let timeAxisElement: HTMLElement;
  let ul: HTMLElement;
  let lis: NodeListOf<HTMLElement>;
  let timeAxisDataList;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TimeAxisModule],
      declarations: [TestTimeAxisComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTimeAxisComponent);
    testComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    timeAxisElement = fixture.debugElement.query(By.directive(TimeAxisComponent)).nativeElement;
    timeAxisDataList = testComponent.time_axis_data.list;
  });

  describe('basic', () => {
    beforeEach(() => {
      fixture.detectChanges();
      ul = timeAxisElement.querySelector('.devui-time-axis-vertical');
      lis = ul.querySelectorAll('.devui-time-axis-item-vertical');
    });

    it('should be created successfully', () => {
      fixture.detectChanges();
      expect(testComponent).toBeTruthy();
    });

    it('should have correct className', () => {
      expect(ul.classList).toContain('devui-time-axis-vertical');

      for (let i = 0; i < timeAxisDataList.length; i++) {
        const type = timeAxisDataList[i].type === 'success' ? 'right' : timeAxisDataList[i].type;
        expect(lis[i].querySelector(`.devui-time-axis-item-type-${type}`)).not.toBeNull();
      }
    });

    it('should have different position', () => {
      testComponent.time_axis_data.position = 'bottom';
      fixture.detectChanges();
      expect(timeAxisElement.querySelector('.devui-time-axis-item-data-time-bottom')).not.toBeNull();
    });

    it('should have different direction', () => {
      testComponent.time_axis_data.direction = 'horizontal';
      fixture.detectChanges();
      expect(timeAxisElement.querySelector('.devui-time-axis-item-horizontal')).not.toBeNull();
    });

    it('should status be ok', () => {
      fixture.detectChanges();
      // 最后两个tr元素中的状态样式
      expect(lis[3].querySelector('.devui-time-axis-item-dot')).not.toBeNull();
      expect(lis[4].querySelector('.devui-time-axis-item-type-warning')).not.toBeNull();
    });
  });
});

@Component({
  template: `<d-time-axis [data]="time_axis_data_horizontal" [mode]="'alternative'"></d-time-axis> `,
})
class TestTimeAxisHorizontalComponent {
  time_axis_data_horizontal = {
    direction: 'horizontal',
    model: 'text',
    list: [
      { time: '2022-07-25', text: '这是2022-07-25发生的事件', type: 'primary', position: 'top' },
      { time: '2022-07-27', text: '这是2022-07-27发生的事件', type: 'success', position: 'bottom' },
      { time: '2022-07-28', text: '这是2022-07-28发生的事件', status: '', position: 'top' },
      { time: '2022-07-29', text: '这是2022-07-29发生的事件', status: 'running', position: 'bottom' },
      { time: '2022-07-29', text: '这是2022-07-29发生的事件', status: 'runned', position: 'top' },
    ],
  };
}

describe('time-axis horizontal base', () => {
  let fixture: ComponentFixture<TestTimeAxisHorizontalComponent>;
  let testComponent: TestTimeAxisHorizontalComponent;
  let timeAxisElement: HTMLElement;
  let ul: HTMLElement;
  let lis: NodeListOf<HTMLElement>;
  let timeAxisDataList;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TimeAxisModule],
      declarations: [TestTimeAxisHorizontalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTimeAxisHorizontalComponent);
    testComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    timeAxisElement = fixture.debugElement.query(By.directive(TimeAxisComponent)).nativeElement;
    timeAxisDataList = testComponent.time_axis_data_horizontal.list;
  });

  describe('basic', () => {
    beforeEach(() => {
      fixture.detectChanges();
      ul = timeAxisElement.querySelector('.devui-time-axis-horizontal');
      lis = ul.querySelectorAll('.devui-time-axis-item-horizontal');
    });

    it('should be created successfully', () => {
      fixture.detectChanges();
      expect(testComponent).toBeTruthy();
    });

    it('should have correct horizontal className', fakeAsync(() => {
      expect(ul.classList).toContain('devui-time-axis-horizontal');
      tick();
      fixture.detectChanges();

      for (let i = 0; i < timeAxisDataList.length; i++) {
        if (timeAxisDataList[i]?.type) {
          const type = timeAxisDataList[i].type === 'success' ? 'right' : timeAxisDataList[i].type;
          expect(lis[i].querySelector(`.devui-time-axis-item-type-${type}`)).not.toBeNull();
        }

        const position = timeAxisDataList[i].position;
        expect(lis[i].querySelector(`.devui-time-axis-item-data-horizontal-${position}`)).not.toBeNull();
      }
    }));
  });
});

@Component({
  template: `
    <d-time-axis direction="vertical" [mode]="'alternative'">
      <d-time-axis-item direction="vertical" text="Start" time="2021-3-13"></d-time-axis-item>
      <d-time-axis-item direction="vertical" text="Check" time="2021-4-14"></d-time-axis-item>
      <d-time-axis-item direction="vertical" text="Debug" time="2021-4-21"></d-time-axis-item>
      <d-time-axis-item direction="vertical" text="Display" time="2021-4-25"></d-time-axis-item>
    </d-time-axis>
  `,
})
class TestTimeAxisHTMLComponent {}

describe('time-axis HTML mode base', () => {
  let fixture: ComponentFixture<TestTimeAxisHTMLComponent>;
  let testComponent: TestTimeAxisHTMLComponent;
  let timeAxisElement: HTMLElement;
  let ul: HTMLElement;
  let lis: NodeListOf<HTMLElement>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TimeAxisModule],
      declarations: [TestTimeAxisHTMLComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTimeAxisHTMLComponent);
    testComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    timeAxisElement = fixture.debugElement.query(By.directive(TimeAxisComponent)).nativeElement;
  });

  describe('basic', () => {
    beforeEach(() => {
      fixture.detectChanges();
      ul = timeAxisElement.querySelector('.devui-time-axis-vertical');
      lis = ul.querySelectorAll('d-time-axis-item');
    });

    it('should be created successfully', () => {
      fixture.detectChanges();
      expect(testComponent).toBeTruthy();
    });

    it('should have correct className', () => {
      expect(ul.classList).toContain('devui-time-axis-vertical');
    });

    it('should have correct value number', () => {
      expect(lis.length).toEqual(4);
    });
  });
});
