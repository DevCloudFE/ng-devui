import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PopoverModule } from '../popover/popover.module';
import { DomHelper } from '../utils/testing/dom-helper';
import { dispatchMouseEvent, mouseMoveTrigger } from '../utils/testing/event-helper';
import { SliderComponent } from './slider.component';
import { SliderModule } from './slider.module';

@Component({
    template: `
    <d-slider
      #sliderCmp
      class="slider"
      [(ngModel)]="value"
      [disabled]="disabled"
      (ngModelChange)="valueChange($event)"
      [max]="max"
      [min]="min"
      [step]="step"
      [tipsRenderer]="tipsRenderer"
    >
    </d-slider>
  `,
    styles: [`
    .slider {
      width: 300px;
    }
  `],
    standalone: false
})
class TestSliderBasicComponent {
  @ViewChild('sliderCmp') sliderCmp: SliderComponent;
  value: Number;
  max: Number = 100;
  min: Number = 0;
  step: Number = 1;
  disabled: Boolean;
  valueChange = jasmine.createSpy('valueChange');
  tipsRenderer: (value: number) => string = (value) => `${value}`;
}

describe('slider', () => {
  let fixture: ComponentFixture<TestSliderBasicComponent>;
  let debugEl: DebugElement;
  let testComponent: TestSliderBasicComponent;
  let domHelper: DomHelper<TestSliderBasicComponent>;
  let handleEl: HTMLElement;
  let handleRect;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SliderModule, FormsModule, NoopAnimationsModule, PopoverModule],
      declarations: [TestSliderBasicComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSliderBasicComponent);
    debugEl = fixture.debugElement;
    testComponent = debugEl.componentInstance;
    domHelper = new DomHelper(fixture);

    handleEl = debugEl.query(By.css('.devui-slider-handle')).nativeElement;
    handleRect = handleEl.getBoundingClientRect();
  });

  describe('basic', () => {
    it('should popover show/hide', fakeAsync(() => {
      fixture.detectChanges();
      expect(document.querySelector('d-popover')).toBeFalsy();
      handleEl.dispatchEvent(new MouseEvent('mouseover'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(document.querySelector('d-popover')).toBeTruthy();
      handleEl.dispatchEvent(new MouseEvent('mouseout'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(document.querySelector('d-popover')).toBeFalsy();
    }));

    it('should dragDrop works', fakeAsync(() => {
      fixture.detectChanges();
      dispatchMouseEvent(handleEl, 'mousedown', handleRect.right, handleRect.height);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(document.querySelector('d-popover')).toBeTruthy();
      dispatchMouseEvent(window.document, 'mousemove', handleRect.right + 300, handleRect.height);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(document.querySelector('d-popover').querySelector('.devui-popover-main-content').textContent).toBe('100');
      dispatchMouseEvent(window.document, 'mouseup');
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.value).toEqual(100);
    }));

    it('should ngModel/disabled works', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.value = 20;
      testComponent.disabled = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(handleEl.style.left).toBe('calc(20% - 7px)');
      expect(debugEl.query(By.css('.devui-slider')).nativeElement.classList).toContain('disabled');

      const disabledRect = handleEl.getBoundingClientRect();
      mouseMoveTrigger(
        handleEl,
        {x: disabledRect.right, y: disabledRect.height },
        {x: disabledRect.right + 300, y: disabledRect.height}
      );
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(handleEl.style.left).toBe('calc(20% - 7px)');
      expect(testComponent.value).toEqual(20);
    }));

    it('should min/max works', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.min = 20;
      testComponent.max = 120;
      dispatchMouseEvent(handleEl, 'mousedown', handleRect.right, handleRect.height);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(document.querySelector('d-popover').querySelector('.devui-popover-main-content').textContent).toBe('20');
      dispatchMouseEvent(window.document, 'mousemove', handleRect.right + 300, handleRect.height);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(document.querySelector('d-popover').querySelector('.devui-popover-main-content').textContent).toBe('120');
      dispatchMouseEvent(window.document, 'mouseup');
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.value).toEqual(120);
    }));

    it('should step works', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.step = 100;
      fixture.detectChanges();
      mouseMoveTrigger(
        handleEl,
        {x: handleRect.right, y: handleRect.height },
        {x: handleRect.right + 150, y: handleRect.height}
      );

      expect(testComponent.value).toEqual(100);
    }));

    it('should tipsRenderer works', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.tipsRenderer = (value) => `${value} apples`;
      fixture.detectChanges();

      dispatchMouseEvent(handleEl, 'mousedown', handleRect.right, handleRect.height);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(document.querySelector('d-popover').querySelector('.devui-popover-main-content').textContent).toContain(' apples');

      dispatchMouseEvent(window.document, 'mousemove', handleRect.right + 300, handleRect.height);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(document.querySelector('d-popover').querySelector('.devui-popover-main-content').textContent).toBe('100 apples');
      dispatchMouseEvent(window.document, 'mouseup');
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
    }));
  });
});
