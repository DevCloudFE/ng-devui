import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HighlightComponent } from '../utils/highlight/highlight.component';
import { createKeyBoardEvent } from '../utils/testing/event-helper';
import { MultiAutoCompleteComponent } from './multi-auto-complete.component';
import { MultiAutoCompleteModule } from './multi-auto-complete.module';

@Component({
  template: `
    <d-multi-auto-complete
      #multiAutoComplete
      [placeholder]="'请选择...'"
      [source]="languages"
      [(ngModel)]="multiItems"
      [overview]="overview"
      name="multiple-auto"
    ></d-multi-auto-complete>
  `,
})
class TestMultiAutoCompleteComponent {
  @ViewChild('multiAutoComplete') multiAutoComplete: MultiAutoCompleteComponent;
  overview = 'border';
  multiItems: string[] = ['C#', 'C', 'C++', 'CPython', 'Java'];
  latestSource: string[] = ['SQL', 'LiveScript', 'CoffeeScript'];
  languages = [
    'C#',
    'C',
    'C++',
    'CPython',
    'Java',
    'JavaScript',
    'Go',
    'Python',
    'Ruby',
    'F#',
    'TypeScript',
    'SQL',
    'LiveScript',
    'CoffeeScript',
  ];
}

describe('multi-auto-complete', () => {
  describe('string data', () => {
    let fixture: ComponentFixture<TestMultiAutoCompleteComponent>;
    let debugEl: DebugElement;
    let component: TestMultiAutoCompleteComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MultiAutoCompleteModule, FormsModule, NoopAnimationsModule],
        declarations: [TestMultiAutoCompleteComponent]
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestMultiAutoCompleteComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
    });

    it('should create correctly', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should input box has correct item', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const labelItems = debugEl.queryAll(
        By.css('.multi-auto-complete label.multiple-label-auto-complete .devui-dropdown-origin li .label-item')
      );
      expect(labelItems.length).toBe(component.multiItems.length);
    }));

    it('should input duplicate value doesn\'t add item', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const inputDebugEl = debugEl.query(
        By.css('.multi-auto-complete label.multiple-label-auto-complete .devui-dropdown-origin li input.auto-complete-control')
      );
      inputDebugEl.nativeElement.value = 'CPython';
      inputDebugEl.nativeElement.dispatchEvent(new Event('input'));
      tick();

      const enterKeyDown = createKeyBoardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
      });
      inputDebugEl.nativeElement.dispatchEvent(enterKeyDown);
      tick();
      fixture.detectChanges();
      const labelItems = debugEl.queryAll(
        By.css('.multi-auto-complete label.multiple-label-auto-complete .devui-dropdown-origin li .label-item')
      );
      expect(component.multiItems.length).toBe(5);
      expect(labelItems.length).toBe(5);
    }));

    it('should item does not in source can not be added', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const inputDebugEl = debugEl.query(
        By.css('.multi-auto-complete label.multiple-label-auto-complete .devui-dropdown-origin li input.auto-complete-control')
      );
      inputDebugEl.nativeElement.value = 'abcd';
      inputDebugEl.nativeElement.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const enterKeyDown = createKeyBoardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
      });
      inputDebugEl.nativeElement.dispatchEvent(enterKeyDown);
      tick();
      fixture.detectChanges();
      const labelItems = debugEl.queryAll(
        By.css('.multi-auto-complete label.multiple-label-auto-complete .devui-dropdown-origin li .label-item')
      );
      expect(component.multiItems.length).toBe(5);
      expect(labelItems.length).toBe(5);
    }));

    it('should input search element can be select ', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const inputDebugEl = debugEl.query(
        By.css('.multi-auto-complete label.multiple-label-auto-complete .devui-dropdown-origin li input.auto-complete-control')
      );

      inputDebugEl.nativeElement.value = 'J';
      inputDebugEl.nativeElement.dispatchEvent(new Event('input'));
      tick();

      const keyUpEventJ = createKeyBoardEvent('keyup', {
        key: 'KeyJ',
        code: 'KeyJ',
      });
      inputDebugEl.nativeElement.dispatchEvent(keyUpEventJ);
      tick();
      fixture.detectChanges();

      const hightLightEl = debugEl.query(By.directive(HighlightComponent));
      expect(hightLightEl.nativeElement.textContent).toBe('JavaScript');

      const dropDownItem = debugEl.query(
        By.css(
          '.multi-auto-complete label.multiple-label-auto-complete .devui-dropdown-origin li .devui-dropdown-menu .devui-dropdown-item'
        )
      );
      dropDownItem.nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const labelItems = debugEl.queryAll(
        By.css('.multi-auto-complete label.multiple-label-auto-complete .devui-dropdown-origin li .label-item')
      );
      expect(component.multiItems.length).toBe(6);
      expect(labelItems.length).toBe(6);
    }));

    it('should blur delete the input value', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      let inputDebugEl = debugEl.query(
        By.css('.multi-auto-complete label.multiple-label-auto-complete .devui-dropdown-origin li input.auto-complete-control')
      );

      inputDebugEl.nativeElement.dispatchEvent(new Event('focus'));
      inputDebugEl.nativeElement.value = 'J';
      inputDebugEl.nativeElement.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();

      const keyUpEventJ = createKeyBoardEvent('keyup', {
        key: 'KeyJ',
        code: 'KeyJ',
      });
      inputDebugEl.nativeElement.dispatchEvent(keyUpEventJ);
      tick();
      fixture.detectChanges();

      inputDebugEl = debugEl.query(
        By.css('.multi-auto-complete label.multiple-label-auto-complete .devui-dropdown-origin li input.auto-complete-control')
      );
      let dropDownItem = debugEl.query(
        By.css(
          '.multi-auto-complete label.multiple-label-auto-complete .devui-dropdown-origin li .devui-dropdown-menu .devui-dropdown-item'
        )
      );
      expect(inputDebugEl.nativeElement.value).toBe('J');
      expect(dropDownItem).toBeTruthy();

      document.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      inputDebugEl = debugEl.query(
        By.css('.multi-auto-complete label.multiple-label-auto-complete .devui-dropdown-origin li input.auto-complete-control')
      );
      dropDownItem = debugEl.query(
        By.css(
          '.multi-auto-complete label.multiple-label-auto-complete .devui-dropdown-origin li .devui-dropdown-menu .devui-dropdown-item'
        )
      );
      expect(inputDebugEl.nativeElement.value).toBe('');
      expect(dropDownItem).toBeTruthy();
    }));

    it('should backspace can delete element', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const inputDebugEl = debugEl.query(
        By.css('.multi-auto-complete label.multiple-label-auto-complete .devui-dropdown-origin li input.auto-complete-control')
      );

      inputDebugEl.nativeElement.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      const backSpaceKeydown = createKeyBoardEvent('keydown', {
        key: 'Backspace',
      });
      inputDebugEl.nativeElement.dispatchEvent(backSpaceKeydown);
      tick();
      fixture.detectChanges();

      const labelItems = debugEl.queryAll(
        By.css('.multi-auto-complete label.multiple-label-auto-complete .devui-dropdown-origin li .label-item')
      );
      expect(component.multiItems.length).toBe(4);
      expect(labelItems.length).toBe(4);
    }));

    it('should single view work', fakeAsync(() => {
      component.multiItems = ['SQL'];
      component.overview = 'single';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const itemEl = debugEl.query(By.css('.multi-auto-complete label.multiple-label-auto-complete ul li span.label-item .label'));
      itemEl.nativeElement.dispatchEvent(new Event('click', { bubbles: true }));
      tick();
      fixture.detectChanges();

      const inputDebugEl = debugEl.query(
        By.css('.multi-auto-complete label.multiple-label-auto-complete ul li input.auto-complete-control')
      );

      inputDebugEl.nativeElement.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      inputDebugEl.nativeElement.value = 'J';
      inputDebugEl.nativeElement.dispatchEvent(new Event('input'));
      tick();

      const keyUpEventJ = createKeyBoardEvent('keyup', {
        key: 'KeyJ',
        code: 'KeyJ',
      });
      inputDebugEl.nativeElement.dispatchEvent(keyUpEventJ);
      tick();
      fixture.detectChanges();

      const dropDownItem = debugEl.query(By.css('.multi-auto-complete label.multiple-label-auto-complete ul li .devui-dropdown-item'));
      dropDownItem.nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      expect(component.multiItems[0]).toBe('Java');
    }));

    it('should remove label work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      component.multiAutoComplete.removeLabel('C#');
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const labelItems = debugEl.queryAll(
        By.css('.multi-auto-complete label.multiple-label-auto-complete .devui-dropdown-origin li .label-item')
      );
      expect(component.multiItems.length).toBe(4);
      expect(labelItems.length).toBe(4);
      expect(
        labelItems.some((item) => {
          return item.nativeElement.textContent === 'C#';
        })
      ).toBeFalsy();
    }));
  });

  // TODO: object item can not use, but the source code has object item judge
});
