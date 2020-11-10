import { FormsModule } from '@angular/forms';
import { ComponentFixture, fakeAsync, tick, flush, discardPeriodicTasks } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { Component, DebugElement, ViewChild, OnInit, ElementRef } from '@angular/core';
import { TagsInputComponent } from './tags.input.component';
import { By } from '@angular/platform-browser';
import { createKeyBoardEvent } from '../utils/testing/event-helper';
import { DomHelper } from '../utils/testing/dom-helper';

@Component({
  template: `
    <d-tags-input
      #comp
      (click)="$event.stopPropagation()"
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
  let fixtrue: ComponentFixture<TestTagsInputComponent>;
  let debugEl: DebugElement;
  let component: TestTagsInputComponent;
  let domHelper: DomHelper<TestTagsInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TestTagsInputComponent, TagsInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixtrue = TestBed.createComponent(TestTagsInputComponent);
    debugEl = fixtrue.debugElement;
    component = fixtrue.componentInstance;
    fixtrue.detectChanges();
    domHelper = new DomHelper(fixtrue);
  });

  describe('basic', () => {
    it('should have correct classes', () => {
      const classes = ['.devui-tags-host', '.devui-tags', '.devui-tag-list', '.input.devui-input'];
      expect(domHelper.judgeStyleClasses(classes)).toBeTruthy();
    });

    it('should have correct placeholder', () => {
      const inputEl = debugEl.query(By.css('.input.devui-input')).nativeElement;
      expect(inputEl.placeholder).toBe(component.taskTagConfig.placeholder);
    });

    it('should host element click trigger host_click function', () => {
      component.comp.host_click = jasmine.createSpy('host click');
      const hostEl: HTMLElement = component.comp.selectBoxElement.nativeElement;
      hostEl.click();

      fixtrue.detectChanges();
      expect(component.comp.host_click).toHaveBeenCalledTimes(1);
    });

    it('shuold input element focus/blur trigger input_focus/input_blur function', () => {
      component.comp.input_focus = jasmine.createSpy('input focus');
      component.comp.input_blur = jasmine.createSpy('input blur');

      const inputEl: HTMLElement = debugEl.query(By.css('.input.devui-input')).nativeElement;
      inputEl.dispatchEvent(new Event('focus'));
      inputEl.dispatchEvent(new Event('blur'));

      expect(component.comp.input_focus).toHaveBeenCalledTimes(1);
      expect(component.comp.input_blur).toHaveBeenCalledTimes(1);
    });

    it('should host click function work', fakeAsync(() => {
      // 被调用一次，但是具体是否生效不进行判断
      spyOn(component.comp.tagInputElement.nativeElement, 'focus');
      const hostEl: HTMLElement = component.comp.selectBoxElement.nativeElement;

      hostEl.dispatchEvent(new Event('click'));
      fixtrue.detectChanges();

      expect(component.comp.tagInputElement.nativeElement.focus).toHaveBeenCalledTimes(1);
    }));
  });

  describe('host focus', () => {
    let tagInputEl: HTMLElement;
    beforeEach(() => {
      tagInputEl = component.comp.tagInputElement.nativeElement;
      tagInputEl.dispatchEvent(new Event('focus'));
      fixtrue.detectChanges();
    });

    it('should focus open the select list', () => {
      const classes = ['.devui-tags-autocomplete', '.devui-suggestion-list', '.devui-suggestion-item'];
      expect(domHelper.judgeStyleClasses(classes)).toBeTruthy();
    });

    it('should first item be selected', () => {
      const selectedItem = debugEl.query(By.css('.devui-suggestion-item.selected'));
      const items = debugEl.queryAll(By.css('.devui-suggestion-item'));

      expect(selectedItem).toBe(items[0]);
    });

    it('should blur add input value', fakeAsync(() => {
      const testTxt = 'test';
      (tagInputEl as HTMLInputElement).value = testTxt;
      tagInputEl.dispatchEvent(new Event('input'));
      fixtrue.detectChanges();

      tagInputEl.dispatchEvent(new Event('blur'));
      tick(50);
      fixtrue.detectChanges();

      const items = debugEl.queryAll(By.css('.devui-tag-item'));
      expect(items[1].nativeElement.textContent).toBe(`${testTxt}`);
      discardPeriodicTasks();
    }));

    it('should enter keydown work', fakeAsync(() => {
      const enterEvent = createKeyBoardEvent('keydown', {
        key: 'Enter',
        keyCode: 13
      });

      tagInputEl.dispatchEvent(enterEvent);
      fixtrue.detectChanges();
      tick(50);
      fixtrue.detectChanges();
      discardPeriodicTasks();

      const selectedItem = debugEl.query(By.css('.devui-suggestion-item.selected'));
      const items = debugEl.queryAll(By.css('.devui-suggestion-item'));

      expect(component.tagList.length).toBe(2);
      expect(selectedItem).toBe(items[0]);
      expect(component.getTagValue).toHaveBeenCalled();
    }));

    it('should arrow up work', () => {
      const upEvent = createKeyBoardEvent('keydown', {
        key: 'ArrowUp',
        keyCode: 38
      });

      tagInputEl.dispatchEvent(upEvent);
      fixtrue.detectChanges();

      const selectedItem = debugEl.query(By.css('.devui-suggestion-item.selected'));
      const items = debugEl.queryAll(By.css('.devui-suggestion-item'));

      expect(selectedItem).toBe(items[items.length - 1]);
    });

    it('should arrow down work', () => {
      const downEvent = createKeyBoardEvent('keydown', {
        key: 'ArrowDown',
        keyCode: 40
      });

      tagInputEl.dispatchEvent(downEvent);
      fixtrue.detectChanges();

      const selectedItem = debugEl.query(By.css('.devui-suggestion-item.selected'));
      const items = debugEl.queryAll(By.css('.devui-suggestion-item'));

      expect(selectedItem).toBe(items[1]);
    });

    it('should add tag which is not in suggestion list after enter', fakeAsync(() => {
      const testTxt = 'test';
      (tagInputEl as HTMLInputElement).value = testTxt;
      tagInputEl.dispatchEvent(new Event('input'));
      discardPeriodicTasks();
      fixtrue.detectChanges();

      expect(component.comp.newTag).toBe(testTxt);

      // 模拟搜索函数
      component.suggestionList = component.suggestionList.filter((item) => item.name.toLowerCase().indexOf(testTxt) !== -1);
      fixtrue.detectChanges();

      const enterEvent = createKeyBoardEvent('keydown', {
        key: 'Enter',
        keyCode: 13
      });

      tagInputEl.dispatchEvent(enterEvent);
      fixtrue.detectChanges();
      tick(50);
      fixtrue.detectChanges();
      discardPeriodicTasks();

      const tagItems = debugEl.queryAll(By.css('.devui-tag-item'));
      expect(tagItems[tagItems.length - 1].nativeElement.textContent).toBe(`${testTxt}`);
    }));
  });

  describe('remove button should work', () => {
    it('should have remove button', () => {
      const removeBtn: HTMLElement = debugEl.query(By.css('.devui-tag-item .remove-button')).nativeElement;
      removeBtn.dispatchEvent(new Event('click'));

      fixtrue.detectChanges();
      expect(component.tagList.length).toBe(0);
      expect(component.getTagValue).toHaveBeenCalled();
    });
  });
});
