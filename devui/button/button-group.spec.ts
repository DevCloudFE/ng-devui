import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonModule } from 'ng-devui/button';
import { ButtonGroupComponent } from './button-group.component';

@Component({
  template: `
    <d-button-group [size]="size"></d-button-group>
  `
})

class TestButtonGroupComponent {
  size = 'md';
}

describe('button-group', () => {
  let fixture: ComponentFixture<TestButtonGroupComponent>;
  let debugEl: DebugElement;
  let component: TestButtonGroupComponent;
  let buttonGroupElement: HTMLElement;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [ButtonModule],
          declarations: [TestButtonGroupComponent]
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestButtonGroupComponent);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;
    buttonGroupElement = debugEl.query(By.directive(ButtonGroupComponent)).nativeElement;
    fixture.detectChanges();
  });

  describe('basic', () => {
    it('should create correctly', () => {
      expect(component).toBeTruthy();
    });

    it('should have correct classes', () => {
      expect(buttonGroupElement.querySelector('.devui-btn-group')).toBeTruthy();
    });

    it('should have xs size', () => {
      component.size = 'xs';
      fixture.detectChanges();
      expect(buttonGroupElement.querySelector('.devui-btn-group-xs')).toBeTruthy();
    });

    it('should have sm size', () => {
      component.size = 'sm';
      fixture.detectChanges();
      expect(buttonGroupElement.querySelector('.devui-btn-group-sm')).toBeTruthy();
    });

    it('should have lg size', () => {
      component.size = 'lg';
      fixture.detectChanges();
      expect(buttonGroupElement.querySelector('.devui-btn-group-lg')).toBeTruthy();
    });
  });
});
