import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement, Component, ViewChild } from '@angular/core';
import { CheckBoxComponent } from './checkbox.component';
import { DomHelper } from '../utils/testing/dom-helper';
import { By } from '@angular/platform-browser';
import { CheckBoxModule } from './checkbox.module';
import { FormsModule } from '@angular/forms';

@Component({
  template: `<d-checkbox
    #comp
    [label]="'选中状态'"
    [isShowTitle]="false"
    (change)="onCheckboxChange($event)"
    [ngModel]="true"
    [disabled]="disabled"
    [halfchecked]="halfchecked"
  >
  </d-checkbox>`,
})
class TestCheckBoxComponent {
  @ViewChild('comp') comp: CheckBoxComponent;
  public checked = false;
  number = 1;
  disabled = false;
  halfchecked = false;

  constructor() {}
  onCheckboxChange(value) {
    console.log('checkbox1 checked:', value);
  }
}

describe('checkbox', () => {
  describe('basic', () => {
    let fixture: ComponentFixture<TestCheckBoxComponent>;
    let debugEl: DebugElement;
    let component: TestCheckBoxComponent;
    let domHelper: DomHelper<TestCheckBoxComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CheckBoxModule, FormsModule],
        declarations: [TestCheckBoxComponent],
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestCheckBoxComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;

      domHelper = new DomHelper(fixture);
      fixture.detectChanges();
    });

    it('should have correct classes', () => {
      const classList = ['devui-checkbox', 'devui-checkbox-input', 'devui-checkbox-material', 'devui-checkbox-tick'];
      domHelper.judgeStyleClasses(classList);
    });

    it('should click trigger toggle function', () => {
      component.comp.toggle = jasmine.createSpy('click toggle');
      const labelEl: HTMLElement = debugEl.query(By.css('label')).nativeElement;
      labelEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(component.comp.toggle).toHaveBeenCalledTimes(1);
    });

    it('should click can change checked status', fakeAsync(() => {
      const labelEl: HTMLElement = debugEl.query(By.css('label')).nativeElement;
      labelEl.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      expect(component.comp.checked).toBeTruthy();

      labelEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(component.checked).toBeFalsy();
    }));

    it('should disabled work', () => {
      component.disabled = true;
      fixture.detectChanges();
      const labelEl: HTMLElement = debugEl.query(By.css('label')).nativeElement;
      labelEl.dispatchEvent(new Event('click'));

      expect(component.checked).toBeFalsy();
    });

    it('should half checked status class apply correctly', () => {
      component.halfchecked = true;
      fixture.detectChanges();

      const labelEl: HTMLElement = debugEl.query(By.css('label')).nativeElement;
      labelEl.dispatchEvent(new Event('click'));

      fixture.detectChanges();
      const classList = ['.devui-checkbox', '.halfchecked', '.devui-no-animation'];
      expect(domHelper.judgeStyleClasses(classList)).toBeTruthy();
    });
  });
});
