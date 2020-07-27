import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { EditableSelectModule } from './editable-select.module';
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <d-editable-select [source]="languages" [searchFn]="onSearchLocal" [maxHeight]="300" [(ngModel)]="selectItem1" name="multiple-auto">
    </d-editable-select>
  `,
})
class TestEditableSelectComponent {
  selectItem1;
  languages = ['C#', 'C', 'C++', 'CPython', 'Ruby', 'Python', 'Java', 'c++'];
  onSearchLocal;
}

describe('editable-select', () => {
  describe('basic', () => {
    let fixture: ComponentFixture<TestEditableSelectComponent>;
    let debugEl: DebugElement;
    let component: TestEditableSelectComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, EditableSelectModule, NoopAnimationsModule],
        declarations: [TestEditableSelectComponent],
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestEditableSelectComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
    });

    it('should created correctly', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should click can select dropdown item', fakeAsync(() => {
      fixture.detectChanges();
      const inputDebugEl = debugEl.query(By.css('.devui-form-group.devui-has-feedback > input'));
      let inputValue = inputDebugEl.nativeElement.value;
      expect(inputValue).toBe('');
      inputDebugEl.nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();

      const dropDownMenu = debugEl.query(By.css('.devui-dropdown-menu'));
      expect(dropDownMenu).toBeTruthy();

      const itemCsharp = dropDownMenu.query(By.css('.devui-dropdown-item'));
      itemCsharp.nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      tick(); // wait for dropdown menu close
      fixture.detectChanges();
      inputValue = inputDebugEl.nativeElement.value;
      expect(inputValue).toBe('C#');
    }));

    it('should document click can close dropdown menu', fakeAsync(() => {
      fixture.detectChanges();
      const inputDebugEl = debugEl.query(By.css('.devui-form-group.devui-has-feedback > input'));
      inputDebugEl.nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();

      let dropDownMenu = debugEl.query(By.css('.devui-dropdown-menu'));
      expect(dropDownMenu).toBeTruthy();

      document.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      dropDownMenu = debugEl.query(By.css('.devui-dropdown-menu'));
      expect(dropDownMenu.nativeElement.getBoundingClientRect().height).toBeFalsy();

      // cover branch: document click when dropdown menu is closed
      document.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      dropDownMenu = debugEl.query(By.css('.devui-dropdown-menu'));
      expect(dropDownMenu.nativeElement.getBoundingClientRect().height).toBeFalsy();
    }));

    it('should search work', fakeAsync(() => {
      component.onSearchLocal = () => {
        return of(component.languages.filter((lang) => lang.toLowerCase().indexOf('p') !== -1));
      };

      fixture.detectChanges();
      const inputDebugEl = debugEl.query(By.css('.devui-form-group.devui-has-feedback > input'));
      inputDebugEl.nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();

      const dropDownMenu = debugEl.query(By.css('.devui-dropdown-menu'));
      const items = dropDownMenu.queryAll(By.css('.devui-dropdown-item'));
      for (const item of items) {
        expect(item.nativeElement.textContent.trim().toLowerCase().indexOf('p')).not.toBe(-1);
      }
    }));
  });
});
