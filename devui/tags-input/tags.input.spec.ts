import { Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DomHelper } from '../utils/testing/dom-helper';
import { createKeyBoardEvent } from '../utils/testing/event-helper';
import { TagsInputComponent } from './tags.input.component';
import { TagsInputModule } from './tags.input.module';

@Component({
  template: `
    <d-tags-input
      #comp
      [tags]="tagList"
      [suggestionList]="suggestionList"
      [placeholder]="taskTagConfig.placeholder"
      (valueChange)="getTagValue($event)"
    >
    </d-tags-input>
  `,
})
class TestTagsInputComponent implements OnInit {
  @ViewChild('comp') comp: TagsInputComponent;
  tagList: any = [];
  taskTagConfig: any;
  suggestionList: any = [];
  getTagValue = jasmine.createSpy('get tag value');

  ngOnInit() {
    this.tagList = [{ id: 1769, name: '123' }];
    this.suggestionList = [
      { name: 'item1' },
      { name: 'item2' },
      { name: 'item3' },
      { name: 'item4' },
      { name: 'item5' },
      { name: 'item6' },
      { name: 'item7' },
    ];
    this.taskTagConfig = {
      placeholder: '添加一个标签',
    };
  }
}

describe('tags input', () => {
  let fixture: ComponentFixture<TestTagsInputComponent>;
  let debugEl: DebugElement;
  let component: TestTagsInputComponent;
  let domHelper: DomHelper<TestTagsInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NoopAnimationsModule, TagsInputModule],
      declarations: [TestTagsInputComponent, TagsInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTagsInputComponent);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
    domHelper = new DomHelper(fixture);
  });

  describe('basic', () => {
    it('should have correct classes', () => {
      const classes = ['.devui-tags-host', '.devui-toggle-menu-container', '.devui-select-tag-list', '.devui-select-input'];
      expect(domHelper.judgeStyleClasses(classes)).toBeTruthy();
    });

    it('should have correct placeholder', () => {
      const inputEl = debugEl.query(By.css('.devui-select-input')).nativeElement;
      expect(inputEl.placeholder).toBe(component.taskTagConfig.placeholder);
    });

    it('should host element click trigger host_click function', () => {
      component.comp.host_click = jasmine.createSpy('host click');
      const hostEl: HTMLElement = component.comp.tagsInputWrapperItem.nativeElement;
      hostEl.click();

      fixture.detectChanges();
      expect(component.comp.host_click).toHaveBeenCalledTimes(1);
    });

    it('should host click function work', fakeAsync(() => {
      // 被调用一次，但是具体是否生效不进行判断
      const dom = component.comp.tagsInputWrapperItem.nativeElement.querySelector('.devui-toggle-menu-search>input');
      spyOn(dom, 'focus');
      const hostEl: HTMLElement = component.comp.tagsInputWrapperItem.nativeElement;

      hostEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(dom.focus).toHaveBeenCalledTimes(1);
    }));
  });

  describe('action drop-down list', () => {
    let hostEl: HTMLElement;
    let containerEl: HTMLElement;
    beforeEach(fakeAsync(() => {
      hostEl = component.comp.tagsInputWrapperItem.nativeElement;
      hostEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      containerEl = component.comp.selectBoxContainer.selectBoxElement.nativeElement;
      containerEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
    }));

    it('should focus open the select list', () => {
      const classes = ['.devui-dropdown-menu', '.devui-dropdown-menu-wrap', '.devui-toggle-menu-item'];
      expect(domHelper.judgeStyleClasses(classes)).toBeTruthy();
    });

    it('should first item be selected', () => {
      const selectedItem = debugEl.query(By.css('.devui-toggle-menu-item.selected'));
      const items = debugEl.queryAll(By.css('.devui-toggle-menu-item'));

      expect(selectedItem).toBe(items[0]);
    });

    it('should arrow up work', fakeAsync(() => {
      const upEvent = createKeyBoardEvent('keydown', {
        key: 'ArrowUp',
        keyCode: 38,
      });

      containerEl.dispatchEvent(upEvent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      const selectedItem = debugEl.query(By.css('.devui-toggle-menu-item.selected'));
      const items = debugEl.queryAll(By.css('.devui-toggle-menu-item'));

      expect(selectedItem).toBe(items[items.length - 1]);
    }));

    it('should arrow down work', fakeAsync(() => {
      const downEvent = createKeyBoardEvent('keydown', {
        key: 'ArrowDown',
        keyCode: 40,
      });

      containerEl.dispatchEvent(downEvent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      const selectedItem = debugEl.query(By.css('.devui-toggle-menu-item.selected'));
      const items = debugEl.queryAll(By.css('.devui-toggle-menu-item'));

      expect(selectedItem).toBe(items[1]);
    }));

    it('should choose item work', fakeAsync(() => {
      const listItems = debugEl.queryAll(By.css('.devui-toggle-menu-item'));
      const content = listItems[2].nativeNode.innerText;
      listItems[2].nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      const tagItems = debugEl.queryAll(By.css('.devui-select-tag-item>span.over-flow-ellipsis'));
      expect(tagItems[1].nativeNode.innerText).toBe(`${content}`);
    }));
  });

  describe('add tag', () => {
    let containerEl: HTMLElement;
    let tagInputEl: HTMLInputElement;
    beforeEach(fakeAsync(() => {
      tagInputEl = debugEl.query(By.css('.devui-toggle-menu-search>input')).nativeElement;
      containerEl = component.comp.selectBoxContainer.selectBoxElement.nativeElement;
      containerEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
    }));

    it('should add input value on blur', fakeAsync(() => {
      const testTxt = 'test';
      tagInputEl.value = testTxt;
      tagInputEl.dispatchEvent(new Event('input', { bubbles: true }));
      tick(100);
      fixture.detectChanges();

      tagInputEl.dispatchEvent(new Event('blur'));
      component.comp.isOpen = false;
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      const items = debugEl.queryAll(By.css('.devui-select-tag-item>span.over-flow-ellipsis'));
      expect(items[1].nativeNode.textContent).toBe(`${testTxt}`);
    }));

    it('should add tag which is not in suggestion list after enter', fakeAsync(() => {
      const testTxt = 'test';
      tagInputEl.value = testTxt;
      tagInputEl.dispatchEvent(new Event('input', { bubbles: true }));
      tick(100);
      fixture.detectChanges();

      expect(component.comp.newTag).toBe(testTxt);

      const enterEvent = createKeyBoardEvent('keydown', {
        key: 'Enter',
        keyCode: 13,
      });

      containerEl.dispatchEvent(enterEvent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      const tagItems = debugEl.queryAll(By.css('.devui-select-tag-item'));
      expect(tagItems[tagItems.length - 1].nativeNode.innerText).toBe(`${testTxt}`);
    }));

    it('should select tag which is in suggestion list after enter', fakeAsync(() => {
      const testTxt = 'item2';
      tagInputEl.value = testTxt;
      tagInputEl.dispatchEvent(new Event('input', { bubbles: true }));
      tick(100);
      fixture.detectChanges();

      expect(component.comp.newTag).toBe(testTxt);

      const enterEvent = createKeyBoardEvent('keydown', {
        key: 'Enter',
        keyCode: 13,
      });

      containerEl.dispatchEvent(enterEvent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      const tagItems = debugEl.queryAll(By.css('.devui-select-tag-item'));
      expect(tagItems[tagItems.length - 1].nativeNode.innerText).toBe(`${testTxt}`);
    }));
  });

  describe('remove button should work', () => {
    it('should have remove button', fakeAsync(() => {
      const removeBtn: HTMLElement = debugEl.query(By.css('.devui-select-tag-item>.devui-select-tag-remove-button')).nativeElement;
      removeBtn.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(component.comp.selectedItems.length).toBe(0);
      expect(component.getTagValue).toHaveBeenCalled();
    }));
  });
});
