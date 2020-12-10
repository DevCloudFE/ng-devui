import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TimeAxisModule } from './time-axis.module';
import { By } from '@angular/platform-browser';
import { TimeAxisComponent } from './time-axis.component';
import { Component } from '@angular/core';

@Component({
  template: `<d-time-axis [data]="time_axis_data"></d-time-axis> `,
})
class TestTimeAxisComponent {
  time_axis_data = {
    position: 'left',
    model: 'text',
    list: [
      { time: '2017-07-25', text: '这是2017-07-25发生的事件', type: 'primary' },
      { time: '2017-07-27', text: '这是2017-07-27发生的事件', type: 'success' },
      { time: '2017-07-28', text: '这是2017-07-28发生的事件', type: 'danger' },
      { time: '2017-07-29', text: '这是2017-07-29发生的事件', type: 'success', status: 'running' },
      { time: '2017-07-29', text: '这是2017-07-29发生的事件', type: 'success', status: 'runned' },
    ],
  };
}

describe('time-axis base', () => {
  let fixture: ComponentFixture<TestTimeAxisComponent>;
  let testComponent: TestTimeAxisComponent;
  let timeAxisElement: HTMLElement;
  let table: HTMLTableElement;
  let tds: NodeListOf<HTMLTableDataCellElement>;
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
      table = timeAxisElement.querySelector('table');
      tds = table.querySelectorAll('td');
    });

    it('should be created successfully', () => {
      fixture.detectChanges();
      expect(testComponent).toBeTruthy();
    });

    it('should have correct text', () => {
      for (let i = 0; i < timeAxisDataList.length; i++) {
        expect(tds[2 * i + 1].textContent.trim()).toEqual(timeAxisDataList[i].text);
      }
    });

    it('should have correct className', () => {
      expect(table.classList).toContain('devui-time-axis');
      expect(table.classList).toContain('left');

      // 每条数据包含两个td，带有样式的只有第一个td
      for (let i = 0; i < timeAxisDataList.length; i++) {
        expect(tds[2 * i].classList).toContain(timeAxisDataList[i].type);
      }
    });

    it('should have different position', () => {
      testComponent.time_axis_data.position = 'bottom';
      fixture.detectChanges();
      expect(timeAxisElement.querySelector('.bottom')).not.toBeNull();
    });

    it('should have different direction', () => {
      testComponent.time_axis_data['direction'] = 'horizontal';
      fixture.detectChanges();
      expect(timeAxisElement.querySelector('.devui-time-axis-h')).not.toBeNull();
    });

    it('should status be ok', () => {
      fixture.detectChanges();
      // 最后两个tr元素中的状态样式
      expect(tds[6].classList).toContain('running');
      expect(tds[8].classList).toContain('runned');
    });
  });
});
