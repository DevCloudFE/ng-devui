import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TreeSelectModule } from 'ng-devui/tree-select';
import { DomHelper } from '../utils/testing/dom-helper';
import { TreeSelectComponent } from './tree-select.component';

@Component({
  template: `
      <d-tree-select
        placeholder="Standard Input"
        [treeData]="data1"
        [expandTree]="true"
        [(ngModel)]="value1"
        (ngModelChange)="showSelected($event)"
        (nodeToggleEvent)="nodeToggleEvent($event)"
        style="width: 280px"
      ></d-tree-select>
    `
})
class TestSingleTreeSelectComponent {
  data1 = [{
    'title': 'parent 1',
    'id': 1
  }, {
    'title': 'parent 2',
    'children': [{
      'title': 'parent 2-1',
      'children': [{
        'title': 'leaf 2-1-1',
        'id': 3
      }, {
        'title': 'leaf 2-1-2',
        'id': 4
      }],
      'id': 2
    }, {
      'title': 'parent 2-2',
      'children': [{
        'title': 'leaf 2-2-1',
        'id': 6
      }, {
        'title': 'leaf 2-2-2',
        'id': 7
      }],
      'id': 5
    }],
    'id': 18
  }, {
    'title': 'parent 3',
    'open': true,
    'halfChecked': true,
    'children': [{
      'title': 'leaf 3-1',
      'id': 9
    }, {
      'title': 'leaf 3-2',
      'disabled': true,
      'isChecked': true,
      'id': 10
    }, {
      'title': 'leaf 3-3',
      'disabled': true,
      'id': 11
    }],
    'id': 8
  }, {
    'title': 'parent 4',
    'disabled': true,
    'children': [{
      'title': 'leaf 4-1',
      'id': 13
    }, {
      'title': 'leaf 4-2',
      'id': 14
    }],
    'id': 12
  }, {
    'title': 'parent 5',
    'children': [{
      'title': 'leaf 5-1',
      'id': 16
    }, {
      'title': 'leaf 5-2',
      'id': 17
    }],
    'id': 15
  }];
  value1 = {
    'title': 'leaf 4-1',
    'id': 13
  };

  showSelected = jasmine.createSpy('double click');
  nodeToggleEvent = jasmine.createSpy('node toggled');
}

@Component({
  template: `
      <d-tree-select
      #treeSelect
        placeholder="Standard Input"
        [disabled]="disabled"
        [leafOnly]="leafOnly"
        [treeData]="data2"
        [searchable]="true"
        [multiple]="true"
        [expandTree]="true"
        [(ngModel)]="value2"
        (ngModelChange)="showSelected($event)"
        (nodeToggleEvent)="nodeToggleEvent($event)"
        style="width: 280px"
      ></d-tree-select>
    `
})
class TestMultipleTreeSelectComponent {
  @ViewChild('treeSelect') treeSelect: TreeSelectComponent;
  disabled = false;
  leafOnly = false;
  allowUnselect = true;
  data2 = [{
    'title': 'parent 1',
    'id': 1
  }, {
    'title': 'parent 2',
    'children': [{
      'title': 'parent 2-1',
      'children': [{
        'title': 'leaf 2-1-1',
        'id': 3
      }, {
        'title': 'leaf 2-1-2',
        'id': 4
      }],
      'id': 2
    }, {
      'title': 'parent 2-2',
      'children': [{
        'title': 'leaf 2-2-1',
        'id': 6
      }, {
        'title': 'leaf 2-2-2',
        'id': 7
      }],
      'id': 5
    }],
    'id': 18
  }, {
    'title': 'parent 3',
    'open': true,
    'halfChecked': true,
    'children': [{
      'title': 'leaf 3-1',
      'id': 9
    }, {
      'title': 'leaf 3-2',
      'disabled': true,
      'isChecked': true,
      'id': 10
    }, {
      'title': 'leaf 3-3',
      'disabled': true,
      'id': 11
    }],
    'id': 8
  }, {
    'title': 'parent 4',
    'disabled': true,
    'children': [{
      'title': 'leaf 4-1',
      'id': 13
    }, {
      'title': 'leaf 4-2',
      'id': 14
    }],
    'id': 12
  }, {
    'title': 'parent 5',
    'children': [{
      'title': 'leaf 5-1',
      'id': 16
    }, {
      'title': 'leaf 5-2',
      'id': 17
    }],
    'id': 15
  },
  {
    'title': '懒加载节点',
    'isParent': true,
    'isOpen': false,
    'id': 20
  }];
  value2 = [{
    'title': 'leaf 4-2',
    'id': 14
  }, {
    'title': 'leaf 4-1',
    'id': 13
  }, {
    'title': 'leaf 2-1-1',
    'id': 3
  }];

  showSelected = jasmine.createSpy('double click');
  nodeToggleEvent = jasmine.createSpy('node toggled');
}

describe('TreeSelect', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TreeSelectModule, FormsModule, NoopAnimationsModule],
      declarations: [TestSingleTreeSelectComponent, TestMultipleTreeSelectComponent]
    });
  });

  describe('single select', () => {
    let fixture: ComponentFixture<TestSingleTreeSelectComponent>;
    let debugEl: DebugElement;
    let component: TestSingleTreeSelectComponent;
    let domHelper: DomHelper<TestSingleTreeSelectComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSingleTreeSelectComponent);
      domHelper = new DomHelper(fixture);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create correctly', () => {
      expect(component).toBeTruthy();
    });

    it('should have correct styles', () => {
      const classes = [
        '.devui-tree-select',
        '.devui-tree-select-input',
        '.devui-select-chevron-icon',
      ];

      expect(domHelper.judgeStyleClasses(classes)).toBeTruthy();
    });

    it('should open menu while click', fakeAsync(() => {
      const treeSelectEl: HTMLElement = debugEl.query(By.css('d-tree-select .devui-tree-select .devui-tree-select-input'))
        .nativeElement;
      treeSelectEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      const classes = [
        '.devui-dropdown-origin-open'
      ];
      expect(domHelper.judgeStyleClasses(classes)).toBeTruthy();
    }));

    it('should select node correctly', fakeAsync(() => {
      const treeSelectEl: HTMLElement = debugEl.query(By.css('d-tree-select .devui-tree-select .devui-tree-select-input'))
        .nativeElement;
      treeSelectEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      const treeNodeEl: HTMLElement = debugEl
        .query(By.css('body .popper-container  d-operable-tree > div > d-tree > d-tree-nodes > div:nth-child(1) > div'))
        .nativeElement;
      treeNodeEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(200);
      expect(component.value1?.title).toBe('parent 1');
    }));
  });

  describe('multiple select', () => {
    let fixture: ComponentFixture<TestMultipleTreeSelectComponent>;
    let debugEl: DebugElement;
    let component: TestMultipleTreeSelectComponent;
    let domHelper: DomHelper<TestMultipleTreeSelectComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestMultipleTreeSelectComponent);
      domHelper = new DomHelper(fixture);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should not trigger toggle event when disabled', fakeAsync(() => {
      component.disabled = true;
      fixture.detectChanges();
      const treeSelectEl: HTMLElement = debugEl.query(By.css('d-tree-select .devui-tree-select .devui-tree-select-input'))
        .nativeElement;
      treeSelectEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      const classes = [
        '.devui-dropdown-origin-open'
      ];
      expect(domHelper.judgeStyleClasses(classes)).not.toBeTruthy();
    }));

    it('should check node work correctly', fakeAsync(() => {
      const treeSelectEl: HTMLElement = debugEl.query(By.css('d-tree-select .devui-tree-select .devui-tree-select-input'))
        .nativeElement;
      treeSelectEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      const treeNodeEl: HTMLElement = debugEl
        .query(By.css('body .popper-container  d-operable-tree > div > d-tree > d-tree-nodes > div:nth-child(1) > div'))
        .nativeElement;
      treeNodeEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(200);
      expect(debugEl.query(By.css('body .popper-container  d-operable-tree > div > d-tree > d-tree-nodes > div:nth-child(1)'))
        .nativeElement.classList).toContain('selected');
    }));

    it('should check node work correctly while setting leafOnly', fakeAsync(() => {
      component.leafOnly = true;

      // 点击非叶子节点不可选中
      const treeSelectEl: HTMLElement = debugEl.query(By.css('d-tree-select .devui-tree-select .devui-tree-select-input'))
        .nativeElement;
      treeSelectEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      const treeNodeElParent: HTMLElement = debugEl
        .query(By.css('body .popper-container  d-operable-tree > div > d-tree > d-tree-nodes > div:nth-child(2) > div'))
        .nativeElement;
      treeNodeElParent.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(200);
      let selectedNodesArr = component.value2.map(_ => _.title);
      expect(selectedNodesArr).not.toContain('parent 2');

      // 点击叶子节点可选中
      treeSelectEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      const treeNodeEl: HTMLElement = debugEl
        .query(By.css('body .popper-container  d-operable-tree > div > d-tree > d-tree-nodes > div:nth-child(1) > div'))
        .nativeElement;
      treeNodeEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(200);
      selectedNodesArr = component.value2.map(_ => _.title);
      expect(selectedNodesArr).toContain('parent 1');
    }));

    it('should close menu when set isOpen to false', fakeAsync(() => {
      const treeSelectEl: HTMLElement = debugEl.query(By.css('d-tree-select .devui-tree-select .devui-tree-select-input'))
        .nativeElement;
      treeSelectEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      component.treeSelect.isOpen = false;
      const classes = [
        '.devui-dropdown-origin-open',
        '.devui-dropdown-menu'
      ];
      tick(200);
      expect(domHelper.judgeStyleClasses(classes)).not.toBeTruthy();
    }));

    it('should search correctly', fakeAsync(() => {
      const treeSelectEl: HTMLElement = debugEl.query(By.css('d-tree-select .devui-tree-select .devui-tree-select-input'))
        .nativeElement;
      treeSelectEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      const searchInputEl = debugEl
        .query(By.css('body > div> div > div.devui-tree-select.devui-search-container.devui-form-group.devui-has-feedback > input'))
        .nativeElement;
      searchInputEl.dispatchEvent(new Event('focus'));
      searchInputEl.value = '1';
      searchInputEl.dispatchEvent(new Event('input'));
      tick(500);
      fixture.detectChanges();
      expect(component.treeSelect.searchString).toEqual('1');
    }));

    it('should toggle node correctly', fakeAsync(() => {
      const treeSelectEl: HTMLElement = debugEl.query(By.css('d-tree-select .devui-tree-select .devui-tree-select-input'))
        .nativeElement;
      treeSelectEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      const node = debugEl.query(By.css(`body d-operable-tree d-tree > d-tree-nodes > div:nth-child(2)
        > div.devui-tree-node__children > d-tree-nodes > div:nth-child(1) > div.devui-tree-node__content.devui-tree-node--parent
        > div > span.devui-tree-node__folder`)).nativeElement;
      node.dispatchEvent(new Event('click'));
      tick(200);
      expect(component.nodeToggleEvent).toHaveBeenCalled();
    }));

  });
});
