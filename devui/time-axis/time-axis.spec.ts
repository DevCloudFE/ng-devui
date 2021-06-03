import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TimeAxisComponent } from './time-axis.component';
import { TimeAxisModule } from './time-axis.module';

@Component({
  template: `<d-time-axis [data]="time_axis_data"></d-time-axis> `,
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
      { time: '2017-07-29', text: '这是2017-07-29发生的事件', type: 'waiting' },
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
      declarations: [TestTimeAxisComponent]
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
        expect(lis[i].querySelector(`.devui-time-axis-item-type-${timeAxisDataList[i].type}`)).not.toBeNull();
      }
    });

    it('should have different position', () => {
      testComponent.time_axis_data.position = 'bottom';
      fixture.detectChanges();
      expect(timeAxisElement.querySelector('.devui-time-axis-item-data-time-bottom')).not.toBeNull();
    });

    it('should have different direction', () => {
      testComponent.time_axis_data['direction'] = 'horizontal';
      fixture.detectChanges();
      expect(timeAxisElement.querySelector('.devui-time-axis-item-horizontal')).not.toBeNull();
    });

    it('should status be ok', () => {
      fixture.detectChanges();
      // 最后两个tr元素中的状态样式
      expect(lis[3].querySelector('.devui-time-axis-item-dot')).not.toBeNull();
      expect(lis[4].querySelector('.devui-time-axis-item-type-waiting')).not.toBeNull();
    });
  });
});
