import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { TooltipModule } from './tooltip.module';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ButtonModule } from '../button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: `
    <d-button dTooltip [content]="direction" [position]="direction">
      {{ direction }}
    </d-button>
  `
})
class TestTooltipBasicComponent {
  direction = 'left';
}

describe('tooltip', () => {

  describe('tooltip basic', () => {
    let testComponent: TestTooltipBasicComponent;
    let fixture: ComponentFixture<TestTooltipBasicComponent>;
    let debugEle: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TooltipModule, ButtonModule, BrowserAnimationsModule],
        declarations: [TestTooltipBasicComponent]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestTooltipBasicComponent);
      testComponent = fixture.componentInstance;
      debugEle = fixture.debugElement;
      fixture.detectChanges();
    });

    describe('Tooltip basic demo has created successfully', () => {

      it('Tooltip basic should create tooltip testComponent', () => {
        expect(testComponent).toBeTruthy();
      });

      /* 初始状态不显示 */
      it('Tooltip basic should not create tooltip tooltipComponent at original state ', () => {
        expect(debugEle.query(By.css('d-tooltip'))).toBeNull();
      });

      /* 四个方向均能正常显示 */
      it('Mouse event should open or hide the tooltip', () => {
        const config = ['left', 'right', 'bottom', 'top'];
        const buttonEle = debugEle.query(By.css('d-button')).nativeElement;

        for (const key of config) {
          testComponent.direction = key;
          fixture.detectChanges();
          buttonEle.dispatchEvent(new Event('mouseenter'));
          fixture.detectChanges();

          expect(document.querySelector('d-tooltip.' + key + ' .devui-tooltip-inner').textContent).toBe(key);
          buttonEle.dispatchEvent(new Event('mouseleave'));
          fixture.detectChanges();
        }
      });

      //  TODO: mouseleave/blur状态下，元素已destroy且不可见，但单元测试仍能检测到元素，单元测试与实际情况有差异，暂时不做测试

    });
  });

});

