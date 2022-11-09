import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProgressComponent } from './progress.component';
import { ProgressModule } from './progress.module';
@Component({
  template: `<d-progress #progress [percentage]="percentage" [percentageText]="percentageText" [showContent]="showContentConfig">
  </d-progress>`,
})
class TestProgressComponent {
  @ViewChild('progress') progress: ProgressComponent;
  percentage = 80;
  percentageText = '80%';
  showContentConfig = {
    showInnerContent: false,
    showOuterContent: true,
    showCenterContent: false,
  };
}

@Component({
  template: ` <d-progress #progress [isCircle]="true" [percentage]="percentage" [strokeColor]="strokeColor" [strokeWidth]="strokeWidth">
  </d-progress>`,
})
class TestCircleProgressComponent {
  @ViewChild('progress') progress: ProgressComponent;
  percentage = 80;
  strokeColor = '#5e7ce0';
  strokeWidth = 8;
}

describe('progress basic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProgressModule],
      declarations: [TestProgressComponent, TestCircleProgressComponent],
    }).compileComponents();
  });

  describe('progress display', () => {
    let fixture: ComponentFixture<TestProgressComponent>;
    let component: TestProgressComponent;
    let debugEl: DebugElement;
    let nativeEl: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestProgressComponent);
      component = fixture.componentInstance;
      debugEl = fixture.debugElement;
      fixture.detectChanges();
      nativeEl = debugEl.query(By.css('.devui-progress .devui-progress-bar')).nativeElement;
    });

    describe('should progress display correctly', () => {
      it('should progress background and text display correctly', () => {
        expect(nativeEl.style.width).toBe(component.percentage + '%');
        expect(debugEl.query(By.css('.devui-progress-default-text')).nativeElement.textContent).toBe(component.percentageText);
      });
    });
  });
  describe('should circle-progress display correctly', () => {
    let fixture: ComponentFixture<TestCircleProgressComponent>;
    it('should progress background and text display correctly', () => {
      fixture = TestBed.createComponent(TestCircleProgressComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.devui-progress-default-text')).nativeElement.textContent).toBe(component.percentage + '%');
      expect(fixture.debugElement.query(By.css('.devui-progress-circle-path')).nativeElement.getAttribute('stroke')).toBe('#5e7ce0');
      expect(fixture.debugElement.query(By.css('.devui-progress-circle-path')).nativeElement.getAttribute('stroke-width')).toBe(
        String(component.strokeWidth)
      );
    });
  });
});
