import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ToggleComponent } from './toggle.component';
import { ToggleModule } from './toggle.module';

@Component({
  template: `
    <d-toggle #comp [disabled]="disabled" [size]="'sm'" [checked]="checked" (change)="onChange()" [beforeChange]="beforeChange"></d-toggle>
  `
})
class TestToggleComponent {
  @ViewChild('comp') comp;
  disabled = false;
  checked = false;
  onChange = jasmine.createSpy('on change');
  beforeChange = () => {
    return;
  }
}

describe('toggle', () => {
  let fixture: ComponentFixture<TestToggleComponent>;
  let debugEl: DebugElement;
  let component: TestToggleComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToggleModule],
      declarations: [TestToggleComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestToggleComponent);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('basic', () => {
    it('should be created correctly', () => {
      expect(component).toBeTruthy();
    });

    it('should toggle close/open status has correct styles', () => {
      const toggleDebugEl: DebugElement = debugEl.query(By.css('.devui-toggle'));
      expect(toggleDebugEl).toBeTruthy();
      expect(toggleDebugEl.classes['devui-toggle-sm']).toBeTruthy();

      component.checked = true;
      fixture.detectChanges();
      expect(toggleDebugEl.classes['devui-checked']).toBeTruthy();
    });

    it('should click can change the toggle status', fakeAsync(() => {
      onClickTest(fixture, debugEl, component);
    }));

    it('should component write value work', () => {
      component.comp.writeValue(true);
      fixture.detectChanges();

      const toggleDebugEl: DebugElement = debugEl.query(By.css('.devui-toggle'));
      expect(toggleDebugEl.classes['devui-checked']).toBeTruthy();

      component.comp.writeValue(true);
      fixture.detectChanges();
      expect(toggleDebugEl.classes['devui-checked']).toBeTruthy();
    });
  });

  describe('disabled', () => {
    it('should disabled cannot change unchecked to checked', () => {
      component.disabled = true;
      fixture.detectChanges();
      const toggleComponent: DebugElement = debugEl.query(By.directive(ToggleComponent));
      const toggleDebugEl: DebugElement = debugEl.query(By.css('.devui-toggle'));
      expect(toggleDebugEl.classes['devui-disabled']).toBeTruthy();

      toggleComponent.triggerEventHandler('click', {});
      expect(toggleDebugEl.classes['devui-checked']).toBeFalsy();
    });

    it('should disabled cannot change checked to unchecked', () => {
      component.checked = true;
      component.disabled = true;
      fixture.detectChanges();

      const toggleComponent: DebugElement = debugEl.query(By.directive(ToggleComponent));
      const toggleDebugEl: DebugElement = debugEl.query(By.css('.devui-toggle'));
      toggleComponent.triggerEventHandler('click', {});
      expect(toggleDebugEl.classes['devui-checked']).toBeTruthy();
    });
  });

  describe('before change function', () => {
    it('should before change function return undefined work', fakeAsync(() => {
      onClickTest(fixture, debugEl, component);
    }));

    it('should before change function is undefined work', fakeAsync(() => {
      component.beforeChange = undefined;
      fixture.detectChanges();
      onClickTest(fixture, debugEl, component);
    }));

    it('should before change function return true/false work', fakeAsync(() => {
      component.beforeChange = () => {
        return false;
      };
      fixture.detectChanges();
      onClickTest(fixture, debugEl, component, false);

      component.beforeChange = () => {
        return true;
      };
      fixture.detectChanges();
      onClickTest(fixture, debugEl, component);
    }));

    it('should before change function return promise true/false work', fakeAsync(() => {
      component.beforeChange = () => {
        return Promise.resolve(false);
      };
      fixture.detectChanges();
      onClickTest(fixture, debugEl, component, false);

      component.beforeChange = () => {
        return Promise.resolve(true);
      };
      fixture.detectChanges();
      onClickTest(fixture, debugEl, component);
    }));

    it('should before change function return observable true/false work', fakeAsync(() => {
      component.beforeChange = () => {
        return of(false);
      };
      fixture.detectChanges();
      onClickTest(fixture, debugEl, component, false);

      component.beforeChange = () => {
        return of(true);
      };
      fixture.detectChanges();
      onClickTest(fixture, debugEl, component);
    }));
  });
});

function onClickTest(fixture, debugEl, component, canChange: boolean = true) {
  const toggleComponent: DebugElement = debugEl.query(By.directive(ToggleComponent));
  toggleComponent.triggerEventHandler('click', {});
  fixture.detectChanges();
  tick(1000);
  fixture.detectChanges();

  if (canChange) {
    expect(component.onChange).toHaveBeenCalled();

    const toggleDebugEl: DebugElement = debugEl.query(By.css('.devui-toggle'));
    expect(toggleDebugEl.classes['devui-checked']).toBeTruthy();
  } else {
    expect(component.onChange).toHaveBeenCalledTimes(0);

    const toggleDebugEl: DebugElement = debugEl.query(By.css('.devui-toggle'));
    expect(toggleDebugEl.classes['devui-checked']).toBeFalsy();
  }
}
