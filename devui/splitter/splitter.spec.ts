import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { mouseMoveTrigger } from '../utils/testing/event-helper';
import { SplitterComponent } from './splitter.component';
import { SplitterModule } from './splitter.module';
import { SplitterService } from './splitter.service';
@Component({
  template: `
    <section>
      <d-splitter [orientation]="orientation" [splitBarSize]="splitBarSize" style="height: 300px; border: 1px solid #E3E5E9;">
        <d-splitter-pane
          [size]="size"
          [minSize]="minSize"
          [maxSize]="maxSize"
          [collapsible]="collapsible"
          [collapsed]="collapsed"
          (sizeChange)="sizeChange($event)"
        >
          <div class="pane-content">
            <h2>左侧面板</h2>
            <div>左侧内容区域，宽度30%, 最小宽度20%</div>
          </div>
        </d-splitter-pane>
        <d-splitter-pane size="50px">
          <div class="pane-content">
            <h2>中间面板</h2>
            <div>中间内容区域</div>
          </div>
        </d-splitter-pane>
        <d-splitter-pane>
          <div class="pane-content">
            <h2>右侧面板</h2>
            <div>右侧内容区域</div>
          </div>
        </d-splitter-pane>
      </d-splitter>
    </section>
  `,
})
class TestSplitterComponent {
  // splitter input
  orientation = 'horizontal';
  splitBarSize = '2px';
  disabledBarSize = '1px';

  // splitter pane input
  size = '30%';
  minSize = '20%';
  maxSize = '60%';
  collapsible = true;
  collapsed = false;

  sizeChange = jasmine.createSpy('size change');
}

@Component({
  template: `
    <section>
      <d-splitter [orientation]="orientation" style="height: 500px; border: 1px solid #E3E5E9;">
        <d-splitter-pane>
          <div class="pane-content">
            <h2>上面板</h2>
            <div>内容区域</div>
          </div>
        </d-splitter-pane>
        <d-splitter-pane [size]="size" [minSize]="minSize" [maxSize]="maxSize">
          <div class="pane-content">
            <h2>下面板</h2>
            <div>内容区域</div>
          </div>
        </d-splitter-pane>
        <d-splitter-pane [size]="'100px'" [resizable]="false">
          <div class="pane-content">
            <h2>下面板</h2>
            <div>内容区域</div>
          </div>
        </d-splitter-pane>
      </d-splitter>
    </section>
  `,
})
class TestVerticalSplitterComponent {
  // splitter input
  orientation = 'vertical';

  // splitter pane input
  size = '100px';
  minSize = '50px';
  maxSize = '200px';
}

describe('splitter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SplitterModule],
      declarations: [TestSplitterComponent, TestVerticalSplitterComponent],
    }).compileComponents();
  });

  describe('basic', () => {
    let testComponent: TestSplitterComponent;
    let splitterElement: HTMLElement;
    let fixture: ComponentFixture<TestSplitterComponent>;
    let service: SplitterService;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestSplitterComponent);
      testComponent = fixture.componentInstance;
      splitterElement = fixture.debugElement.query(By.directive(SplitterComponent)).nativeElement;
      service = fixture.debugElement.query(By.directive(SplitterComponent)).injector.get(SplitterService);
      fixture.detectChanges();
    });

    it('should create testComponent', () => {
      expect(testComponent).toBeTruthy();
    });

    it('should create splitter container ', () => {
      expect(splitterElement).toBeTruthy();
      expect(splitterElement.classList).toContain('devui-splitter-horizontal');
    });

    it('should render splitter-bar', () => {
      const handles = splitterElement.querySelectorAll('d-splitter-bar');
      expect(handles.length).toBe(2);
    });

    it('should collapse left pane when collapseButton clicked', () => {
      const handleButton = fixture.debugElement.query(By.css('.prev.devui-collapse'));
      handleButton.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(splitterElement.querySelectorAll('d-splitter-pane')[0].clientWidth).toBe(0);
    });

    it('should add collapsed class when collapseButton clicked', () => {
      const handleButton = fixture.debugElement.query(By.css('.prev.devui-collapse'));
      handleButton.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(handleButton.nativeElement.classList).toContain('collapsed');
    });

    it('service should throw error ', () => {
      expect(() => {
        service.getPane(3);
      }).toThrow(new Error('no pane can return.'));
    });

    it('should change collapse state', () => {
      testComponent.collapsible = false;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.prev')).nativeElement.classList).not.toContain('devui-collapse');
    });

    it('should be collapsed', () => {
      testComponent.collapsed = true;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.prev.devui-collapse')).nativeElement.classList).toContain('collapsed');
    });

    it('should change splitterbar size', () => {
      testComponent.splitBarSize = '3px';
      fixture.detectChanges();
      expect(splitterElement.querySelectorAll('d-splitter-bar')[0].clientWidth).toBe(3);
    });

    it('should change splitter direction', () => {
      testComponent.orientation = 'vertical';
      fixture.detectChanges();
      expect(splitterElement.classList).toContain('devui-splitter-vertical');
    });

    it('should change pane size', () => {
      const splitterPaneElement = splitterElement.querySelectorAll('d-splitter-pane')[0];
      testComponent.size = '40%';
      fixture.detectChanges();
      expect((<HTMLElement>splitterPaneElement).style.flexBasis).toEqual('40%');
    });

    it('should change pane size', () => {
      const splitterPaneElement = splitterElement.querySelectorAll('d-splitter-pane')[0];
      testComponent.size = undefined;
      fixture.detectChanges();
      expect(splitterPaneElement.classList).not.toContain('devui-splitter-pane-fixed');
    });

    // 测试拖动时size最小边界
    it('should minimum size work', fakeAsync(() => {
      const leftPaneElement = splitterElement.querySelectorAll('d-splitter-pane')[0];
      const rect = leftPaneElement.getBoundingClientRect();
      const spliterBarElement = splitterElement.querySelectorAll('d-splitter-bar')[0] as HTMLElement;
      // 模拟鼠标事件
      mouseMoveTrigger(spliterBarElement, { x: rect.right, y: rect.height }, { x: rect.right - 2000, y: rect.height });
      fixture.detectChanges();
      expect(leftPaneElement.clientWidth).toEqual(Math.round(service.toPixels('20%')));
    }));

    // 测试拖动时size最大边界
    it('should maximum size work', fakeAsync(() => {
      const leftPaneElement = splitterElement.querySelectorAll('d-splitter-pane')[0];
      const rect = leftPaneElement.getBoundingClientRect();
      const spliterBarElement = splitterElement.querySelectorAll('d-splitter-bar')[0] as HTMLElement;
      // 模拟鼠标事件
      mouseMoveTrigger(spliterBarElement, { x: rect.right, y: rect.height }, { x: rect.right + 5000, y: rect.height });
      fixture.detectChanges();
      expect(leftPaneElement.clientWidth).toEqual(Math.round(service.toPixels('60%')));
    }));

    // 测试拖动时size最小边界
    it('should touchEvent minimum size work', fakeAsync(() => {
      const leftPaneElement = splitterElement.querySelectorAll('d-splitter-pane')[0];
      const rect = leftPaneElement.getBoundingClientRect();
      const spliterBarElement = splitterElement.querySelectorAll('d-splitter-bar')[0] as HTMLElement;
      // 模拟鼠标事件
      touchEventTrigger(spliterBarElement, { x: rect.right, y: rect.height }, { x: rect.right - 2000, y: rect.height });
      fixture.detectChanges();
      expect(leftPaneElement.clientWidth).toEqual(Math.round(service.toPixels('20%')));
    }));

    // 测试模拟多点触控时，不触发拖动
    it('should not fire touchEvent', fakeAsync(() => {
      const leftPaneElement = splitterElement.querySelectorAll('d-splitter-pane')[0];
      const rect = leftPaneElement.getBoundingClientRect();
      const spliterBarElement = splitterElement.querySelectorAll('d-splitter-bar')[0] as HTMLElement;
      // 模拟鼠标事件
      touchEventTrigger(spliterBarElement, { x: rect.right, y: rect.height }, { x: rect.right - 2000, y: rect.height }, 2);
      fixture.detectChanges();
      expect(leftPaneElement.clientWidth).toEqual(Math.round(service.toPixels('30%')));
    }));

    // TODO 目前所有覆盖率80%+，待提供部分只有if分支的代码分支覆盖
  });

  describe('vertical', () => {
    let testComponent: TestVerticalSplitterComponent;
    let splitterElement: HTMLElement;
    let fixture: ComponentFixture<TestVerticalSplitterComponent>;
    let service: SplitterService;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestVerticalSplitterComponent);
      testComponent = fixture.componentInstance;
      splitterElement = fixture.debugElement.query(By.directive(SplitterComponent)).nativeElement;
      service = fixture.debugElement.query(By.directive(SplitterComponent)).injector.get(SplitterService);
      fixture.detectChanges();
    });

    it('should create vertical container ', () => {
      expect(splitterElement).toBeTruthy();
      expect(splitterElement.classList).toContain('devui-splitter-vertical');
    });

    // 测试拖动时size最大边界
    it('should right panel maximum size work', fakeAsync(() => {
      const leftPaneElement = splitterElement.querySelectorAll('d-splitter-pane')[0];
      const rightPaneElement = splitterElement.querySelectorAll('d-splitter-pane')[1];
      const rect = leftPaneElement.getBoundingClientRect();
      const spliterBarElement = splitterElement.querySelectorAll('d-splitter-bar')[0] as HTMLElement;
      // 模拟鼠标事件
      mouseMoveTrigger(spliterBarElement, { x: rect.right, y: rect.height }, { x: rect.right, y: rect.height - 200 });
      fixture.detectChanges();
      expect((<HTMLElement>rightPaneElement).style.flexBasis).toEqual('200px');
    }));
  });
});

function touchEventTrigger(el: HTMLElement, from: { x: number; y: number }, to: { x: number; y: number }, toucheNum?: number): void {
  dispatchTouchEvent(el, 'touchstart', from.x, from.y, toucheNum);
  dispatchTouchEvent(window.document, 'touchmove', to.x, to.y, toucheNum);
  dispatchTouchEvent(window.document, 'touchend');
}

function dispatchTouchEvent(
  node: Node,
  type: string,
  x = 0,
  y = 0,
  toucheNum?: number,
  event: Event = createTouchEvent(type, x, y, toucheNum)
) {
  node.dispatchEvent(event);
}

function createTouchEvent(type: string, pageX = 0, pageY = 0, toucheNum?: number): Event {
  const event = new UIEvent(type, { detail: 0, view: window });
  const touchDetails = { pageX, pageY, clientX: pageX, clientY: pageY };
  let touches = { value: [touchDetails] };
  if (toucheNum && toucheNum !== 1) {
    // 简单模拟多点触控
    touches = { value: [touchDetails, touchDetails] };
  }
  Object.defineProperties(event, {
    touches,
    targetTouches: { value: [touchDetails] },
    changedTouches: { value: [touchDetails] },
  });
  return event;
}
