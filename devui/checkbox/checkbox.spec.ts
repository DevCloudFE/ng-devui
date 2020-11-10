import { of } from 'rxjs';
import { ComponentFixture, TestBed, tick, fakeAsync, flush } from '@angular/core/testing';
import { DebugElement, Component, ViewChild } from '@angular/core';
import { CheckBoxComponent } from './checkbox.component';
import { DomHelper } from '../utils/testing/dom-helper';
import { By } from '@angular/platform-browser';
import { CheckBoxModule } from './checkbox.module';
import { FormsModule } from '@angular/forms';

@Component({
  template: `<d-checkbox
    #comp
    [label]="'??'"
    [isShowTitle]="false"
    (change)="onCheckboxChange($event)"
    [ngModel]="true"
    [disabled]="disabled"
    [halfchecked]="halfchecked"
    [beforeChange]="beforeChange"
  >
  </d-checkbox>`,
})
class TestCheckBoxComponent {
  @ViewChild('comp') comp: CheckBoxComponent;
  public checked = false;
  number = 1;
  disabled = false;
  halfchecked = false;
  beforeChange: (label: string) => any;

  constructor() {}
  onCheckboxChange = jasmine.createSpy('onCheckboxChange');
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
      const classList = ['.devui-checkbox', '.devui-checkbox-input', '.devui-checkbox-material', '.devui-checkbox-tick'];
      expect(domHelper.judgeStyleClasses(classList)).toBeTruthy();
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

    it('should avoid by beforechange', fakeAsync(() => {
      component.beforeChange = () => false;
      fixture.detectChanges();

      expect(component.comp.checked).toBeFalsy();

      const labelEl: HTMLElement = debugEl.query(By.css('label')).nativeElement;
      labelEl.dispatchEvent(new Event('click'));

      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(component.comp.checked).toBeFalsy();
    }));

    it('promise beforechange should work', fakeAsync(() => {
      component.beforeChange = () => Promise.resolve(false);
      fixture.detectChanges();

      expect(component.comp.checked).toBeFalsy();

      const labelEl: HTMLElement = debugEl.query(By.css('label')).nativeElement;
      labelEl.dispatchEvent(new Event('click'));

      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(component.comp.checked).toBeFalsy();
    }));

    it('observale beforechange should work', fakeAsync(() => {
      component.beforeChange = () => of(false);
      fixture.detectChanges();

      expect(component.comp.checked).toBeFalsy();

      const labelEl: HTMLElement = debugEl.query(By.css('label')).nativeElement;
      labelEl.dispatchEvent(new Event('click'));

      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(component.comp.checked).toBeFalsy();
    }));
  });
});
