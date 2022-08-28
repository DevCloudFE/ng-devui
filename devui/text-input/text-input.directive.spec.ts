import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BasicComponent } from './demo/basic/basic.component';
import { TextDirective } from './text-input.directive';

describe('text-input', () => {
  let fixture: ComponentFixture<BasicComponent>;
  let debugEl: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [TextDirective, BasicComponent],
    }).compileComponents();
  }));

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(BasicComponent);
    debugEl = fixture.debugElement;
  }));

  describe('basic', () => {
    it('should be created successfully', waitForAsync(() => {
      expect(fixture).toBeTruthy();
    }));

    it('should have correct placeholder', waitForAsync(() => {
      const inputs = debugEl.queryAll(By.css('input'));
      expect(inputs[0].nativeElement.placeholder).toContain('Please Enter');
    }));

    it('should have correct class', waitForAsync(() => {
      const inputs = debugEl.queryAll(By.css('input'));
      fixture.detectChanges();
      expect(inputs[2].nativeElement.classList).toContain('error');
    }));
  });
});
