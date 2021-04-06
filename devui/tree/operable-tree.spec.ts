import {
  Component,
  DebugElement,
  ViewChild
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { OverlayContainerRef } from '../overlay-container';
import { PopoverDirective } from '../popover';
import { DomHelper } from '../utils/testing/dom-helper';
import { createDragEvent } from '../utils/testing/event-helper';
import { OperableTreeComponent } from './operable-tree.component';
import {
  ITreeItem,
  TreeNode
} from './tree-factory.class';
import { TreeModule } from './tree.module';

@Component({
  template: `
    <d-operable-tree
      #operableTree
      [tree]="treeItems"
      [treeNodeIdKey]="'id'"
      [treeNodeChildrenKey]="'children'"
      [virtualScroll]="virtualScroll"
      (nodeDeleted)="onOperableNodeDeleted($event)"
      (nodeSelected)="onOperableNodeSelected($event)"
      (nodeToggled)="onOperableNodeToggled($event)"
      (nodeChecked)="onOperableNodeChecked($event)"
      (nodeEdited)="onOperableNodeEdited($event)"
      (nodeDblClicked)="onNodeDblClicked($event)"
      [canActivateNode]="activeNode"
      [canActivateParentNode]="activeParentNode"
      (nodeRightClicked)="onRightClicked($event)"
      [postAddNode]="postAddNode"
      [addable]="true"
      [editable]="true"
      [deletable]="true"
      (editValueChange)="editValueChange($event)"
    >
    </d-operable-tree>
  `
})
class TestOperableTreeComponent {
  @ViewChild('operableTree') operableTree: OperableTreeComponent;
  virtualScroll = false;
  treeItems: Array<ITreeItem> = [
    {
      id: 'test',
      title: '父节点1'
    },
    {
      title: '父节点2',
      id: 'parent2',
      children: [
        {
          title: '子节点2-1',
          id: 'child1',
          children: [
            {
              title: '子节点2-1-1'
            },
            {
              title: '子节点2-1-2'
            }
          ]
        }
      ]
    }
  ];

  activeNode = true;
  activeParentNode = true;
  postAddNode;

  onOperableNodeToggled = jasmine.createSpy('operable node toggled');
  onOperableNodeSelected = jasmine.createSpy('operable node selected');
  onNodeDblClicked = jasmine.createSpy('node double click');
  onOperableNodeEdited = jasmine.createSpy('node operable edit');
  nodeDeleted = jasmine.createSpy('node delete');
  onOperableNodeDeleted = jasmine.createSpy('delete node');
  onOperableNodeChecked = jasmine.createSpy('operable node checked');
  onRightClicked = jasmine.createSpy('node right clicked');

  editValueChange(event) {
    if (event.value === '') {
      event.callback({
        errTips: '节点名不能为空!',
        errTipsPosition: 'right'
      });
    } else {
      event.callback();
    }
  }
}

@Component({
  template: `
    <d-operable-tree
      #operableTree
      [tree]="treeItems"
      [treeNodeIdKey]="'id'"
      [treeNodeChildrenKey]="'children'"
      [virtualScroll]="true"
    >
    </d-operable-tree>
  `
})
class TestVirtualScrollTreeComponent {
  @ViewChild('operableTree') operableTree: OperableTreeComponent;
  virtualScroll = false;
  treeItems = [
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
    { 'title': '节点加载-1' },
  ];

}

@Component({
  template: `
    <d-operable-tree
      #comp
      [tree]="data"
      [treeNodeIdKey]="'id'"
      [treeNodeChildrenKey]="'children'"
      [checkable]="false"
      [draggable]="draggable"
      (nodeOnDrop)="onDrop($event)"
      [beforeNodeDrop]="beforeNodeDrop"
      (nodeToggled)="onNodeToggle($event)"
    >
    </d-operable-tree>
    <pre>transferData:{{ transferData }}</pre>
  `
})
class TestDragDropTreeComponent {
  @ViewChild('comp') comp: OperableTreeComponent;
  data = [
    {
      title: '父节点1'
    },
    {
      title: '父节点2',
      open: true,
      children: [
        {
          title: '子节点2-1',
          open: true,
          children: [
            {
              title: '子节点2-1-1'
            },
            {
              title: '子节点2-1-2'
            }
          ]
        },
        {
          title: '子节点2-2',
          children: [
            {
              title: '子节点2-2-1'
            },
            {
              title: '子节点2-2-2'
            }
          ]
        }
      ]
    }
  ];

  draggable = true;
  onNodeToggle = jasmine.createSpy('show node');
  onDrop = jasmine.createSpy('node toggled');

  beforeNodeDrop = _ => {
    return new Promise(resolve => {
      resolve(undefined);
    });
  }

}

describe('virtualScroll Tree', () => {
  let fixture: ComponentFixture<TestVirtualScrollTreeComponent>;
  let debugEl: DebugElement;
  let component: TestVirtualScrollTreeComponent;
  let domHelper: DomHelper<TestVirtualScrollTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TreeModule, NoopAnimationsModule],
      providers: [PopoverDirective, OverlayContainerRef],
      declarations: [TestVirtualScrollTreeComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestVirtualScrollTreeComponent);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
    domHelper = new DomHelper(fixture);
  });

  describe('basic', () => {
    it('should be created correctly', () => {
      expect(component).toBeTruthy();
      expect(component.operableTree.nodes).not.toBeNull();
    });
  });
});

describe('operable tree', () => {
  let fixture: ComponentFixture<TestOperableTreeComponent>;
  let debugEl: DebugElement;
  let component: TestOperableTreeComponent;
  let domHelper: DomHelper<TestOperableTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TreeModule, NoopAnimationsModule],
      providers: [PopoverDirective, OverlayContainerRef],
      declarations: [TestOperableTreeComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestOperableTreeComponent);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
    domHelper = new DomHelper(fixture);
  });

  describe('basic', () => {
    it('should be created correctly', () => {
      expect(component).toBeTruthy();
      expect(component.operableTree.nodes).not.toBeNull();

    });

    it('shuold have correct style classes', () => {
      const classList = [
        '.devui-tree-node',
        '.devui-operable-tree-node',
        '.devui-tree-node__content',
        '.devui-tree-node__content--value-wrapper',
        '.devui-tree-node__folder',
        '.devui-tree-node__leaf'
      ];
      expect(domHelper.judgeStyleClasses(classList)).toBeTruthy();
    });

    it('should click apply selectNode function', () => {
      const treeEl: HTMLElement = debugEl.query(By.css('.devui-tree-node__content')).nativeElement;

      treeEl.dispatchEvent(new Event('click'));
      expect(component.onOperableNodeSelected).toHaveBeenCalled();
    });

    it('should double click apply nodeDblClick', () => {
      const treeEl: HTMLElement = debugEl.query(By.css('.devui-tree-node__title')).nativeElement;

      treeEl.dispatchEvent(new Event('dblclick'));
      expect(component.onNodeDblClicked).toHaveBeenCalled();
    });

    it('should folder icon click work', () => {
      const treeNodes = debugEl.queryAll(By.css('.devui-tree-node.devui-operable-tree-node'));
      const tree2Node = treeNodes[1]; // first one has no children
      const folderIconEl: HTMLElement = tree2Node.query(By.css('.devui-tree-node__folder')).nativeElement;
      folderIconEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(component.onOperableNodeToggled).toHaveBeenCalled();
      expect(tree2Node.query(By.css('.devui-tree-node__children'))).toBeTruthy();
    });

    it('should canActiveNode false work', () => {
      component.activeNode = false;
      fixture.detectChanges();

      const treeEl: HTMLElement = debugEl.query(By.css('.devui-tree-node__content')).nativeElement;
      treeEl.dispatchEvent(new Event('click'));

      expect(component.onOperableNodeChecked).toHaveBeenCalled();
    });

    it('should canActivateParentNode false work', () => {
      component.activeParentNode = false;
      fixture.detectChanges();

      const treeDebugEls: Array<DebugElement> = debugEl.queryAll(By.css('.devui-tree-node__content'));
      const parentTreeNode = treeDebugEls[1].nativeElement;
      parentTreeNode.dispatchEvent(new Event('click'));

      expect(component.onOperableNodeToggled).toHaveBeenCalled();
    });
  });

  describe('operate', () => {
    let tree1Node: DebugElement;
    let tree1NodeContent: HTMLElement;
    let insertedIcons: Array<DebugElement>;

    describe('mouse event & button click', () => {
      beforeEach(() => {
        tree1Node = debugEl.query(By.css('.devui-tree-node.devui-operable-tree-node'));
        tree1NodeContent = tree1Node.query(By.css('.devui-tree-node__content')).nativeElement;
        tree1NodeContent.dispatchEvent(new Event('mouseenter'));
        fixture.detectChanges();
        insertedIcons = tree1Node.queryAll(By.css('.devui-tree-icons'));
      });

      it('should mouse enter show operate icons', () => {
        expect(insertedIcons.length).toBe(3);
      });

      it('should contextmenu work correctly', () => {
        const treeEl: HTMLElement = debugEl.query(By.css('.devui-tree-node__title')).nativeElement;
        treeEl.dispatchEvent(new Event('contextmenu'));
        expect(component.onRightClicked).toHaveBeenCalled();
      });

      it('should edit icon button work', fakeAsync(() => {
        const editBtnIconEl = insertedIcons[1].nativeElement;
        editBtnIconEl.dispatchEvent(new Event('click'));

        fixture.detectChanges();
        tick(1000);
        fixture.detectChanges();
        tick(1000);

        const classList = ['.devui-form-control.devui-input-sm'];
        expect(domHelper.judgeStyleClasses(classList)).toBeTruthy();
        const inputEl: HTMLInputElement = debugEl.query(By.css('.devui-form-control.devui-input-sm')).nativeElement;
        inputEl.value = '测试编辑节点';
        inputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        inputEl.dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        const testNodeTitle = debugEl.query(By.css('.devui-tree-node__title')).nativeElement.textContent;
        expect(testNodeTitle).toContain('测试编辑节点');
      }));

      it('should add icon button work', fakeAsync(() => {
        const addBtnIconEl = insertedIcons[0].nativeElement;
        addBtnIconEl.dispatchEvent(new Event('click'));

        tick(1000);
        fixture.detectChanges();
        tick(1000);

        const inputEl: HTMLInputElement = debugEl.query(By.css('.devui-form-control.devui-input-sm')).nativeElement;
        inputEl.dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        const treeNode: DebugElement = debugEl.query(By.css('.devui-tree-node.devui-operable-tree-node'));
        const childrenNode: HTMLInputElement = treeNode.query(By.css('.devui-tree-node__children')).nativeElement;

        expect(childrenNode.textContent).toBe('新增节点');
      }));

      it('should delete icon button work', fakeAsync(() => {
        const deleteIconEl = insertedIcons[2].nativeElement;
        deleteIconEl.dispatchEvent(new Event('click'));
        tick(1000);
        fixture.detectChanges();

        const treeNodes = debugEl.queryAll(By.css('.devui-tree-node.devui-operable-tree-node'));
        expect(treeNodes.length).toBe(1);
      }));

      it('should postAddNode work', fakeAsync(() => {
        let testNode;
        component.postAddNode = (node: TreeNode) => {
          node.data.title = 'newNode';
          testNode = node;
          return new Promise((resolve, reject) => {
            resolve(node);
          });
        };
        fixture.detectChanges();

        const addBtnIconEl = insertedIcons[0].nativeElement;
        addBtnIconEl.dispatchEvent(new Event('click'));

        tick(1000);
        fixture.detectChanges();
        tick(1000);

        const inputEl: HTMLInputElement = debugEl.query(By.css('.devui-form-control.devui-input-sm')).nativeElement;
        inputEl.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        expect(component.operableTree.treeFactory.nodes[testNode.id].data.title).toEqual('newNode');
      }));
    });
  });

  describe('tree factory', () => {
    it('should checkableRelation work correctly', () => {
      const treeFactory = component.operableTree.treeFactory;
      treeFactory.checkNodesById('parent2', true, 'none');
      expect(treeFactory.getNodeById('child1').isChecked).not.toBeTruthy();
      expect(treeFactory.getNodeById('parent2').isChecked).toBeTruthy();

      treeFactory.checkNodesById('parent2', false);
      treeFactory.checkNodesById('child1', false);
      treeFactory.checkNodesById('parent2', true, 'upward');
      expect(treeFactory.getNodeById('child1').isChecked).not.toBeTruthy();
      expect(treeFactory.getNodeById('parent2').isChecked).toBeTruthy();

      treeFactory.checkNodesById('parent2', false);
      treeFactory.checkNodesById('child1', false);
      treeFactory.checkNodesById('child1', true, 'upward');
      expect(treeFactory.getNodeById('child1').isChecked).toBeTruthy();
      expect(treeFactory.getNodeById('parent2').isChecked).toBeTruthy();

      treeFactory.checkNodesById('parent2', false);
      treeFactory.checkNodesById('child1', false);
      treeFactory.checkNodesById('child1', true, 'downward');
      expect(treeFactory.getNodeById('child1').isChecked).toBeTruthy();
      expect(treeFactory.getNodeById('parent2').isChecked).not.toBeTruthy();

      treeFactory.checkNodesById('parent2', false);
      treeFactory.checkNodesById('child1', false);
      treeFactory.checkNodesById('parent2', true, 'downward');
      expect(treeFactory.getNodeById('child1').isChecked).toBeTruthy();
      expect(treeFactory.getNodeById('parent2').isChecked).toBeTruthy();
    });

    it('should activeNodeById work correctly', () => {
      const treeFactory = component.operableTree.treeFactory;
      treeFactory.activeNodeById('parent2');
      expect(treeFactory.getNodeById('parent2').isActive).toBeTruthy();
    });

    it('should getCompleteNodeById work correctly', () => {
      const treeFactory = component.operableTree.treeFactory;
      expect(treeFactory.getCompleteNodeById('parent2').id).toEqual('parent2');
    });

    it('should checkAllNodes work correctly', () => {
      const treeFactory = component.operableTree.treeFactory;
      treeFactory.checkAllNodes(true);
      expect(treeFactory.getCheckedNodes().length).toEqual(Object.values(treeFactory.nodes).length);
    });

    it('should hideNodeById work correctly', () => {
      const treeFactory = component.operableTree.treeFactory;
      treeFactory.hideNodeById('test', true);
      fixture.detectChanges();
      expect(document.getElementById('devui-tree-node-test')).toBeNull();
    });
  });

  describe('public method', () => {
    it('appendTreeItems work', () => {
      const appendItems = [{ title: '叶子节点11' }, { title: '叶子节点12' }];
      component.operableTree.appendTreeItems(appendItems, 'test');
      fixture.detectChanges();

      const folderIcon1: HTMLElement = debugEl.query(By.css('.devui-tree-node__folder')).nativeElement;
      folderIcon1.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      for (let i = 0; i < appendItems.length; i++) {
        const addedLeafNode = debugEl.query(By.css(`span[title=${appendItems[i].title}]`));
        expect(addedLeafNode).toBeTruthy();
      }
    });

    it('should append children to a void parent throw error', () => {
      const appendItem = [{ title: '叶子节点11' }];
      expect(() => {
        component.operableTree.appendTreeItems(appendItem, 'unknown');
      }).toThrowError('parent node does not exist.');
    });
  });
});

describe('operable tree drag & drop', () => {
  let fixture: ComponentFixture<TestDragDropTreeComponent>;
  let debugEl: DebugElement;
  let component: TestDragDropTreeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TreeModule, NoopAnimationsModule],
      declarations: [TestDragDropTreeComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDragDropTreeComponent);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;
  });

  it('drag work', fakeAsync(() => {
    fixture.detectChanges();
    const debugEls: Array<DebugElement> = debugEl.queryAll(By.css('.devui-tree-node__content'));
    const draggableEl: HTMLElement = debugEls[debugEls.length - 1].nativeElement;
    const dropEl: HTMLElement = debugEls[0].nativeElement;

    const dragElRect = draggableEl.getBoundingClientRect();
    const dropElRect = dropEl.getBoundingClientRect();

    const dragstartEvent = createDragEvent('dragstart', {
      clientX: dragElRect.left,
      clientY: dragElRect.top,
      screenX: window.screenX + dragElRect.left,
      screenY: window.screenY + dragElRect.top
    });
    draggableEl.dispatchEvent(dragstartEvent);
    fixture.detectChanges();

    const dragoverEvent = createDragEvent('dragover', {
      clientX: dropElRect.left,
      clientY: dropElRect.top,
      screenX: window.screenX + dropElRect.left,
      screenY: window.screenY + dropElRect.top
    });

    draggableEl.dispatchEvent(dragoverEvent);
    fixture.detectChanges();
    tick(1000);

    const dragleaveEvent = createDragEvent('dragleave', {
      clientX: dropElRect.left,
      clientY: dropElRect.top,
      screenX: window.screenX + dropElRect.left,
      screenY: window.screenY + dropElRect.top
    });

    draggableEl.dispatchEvent(dragleaveEvent);
    fixture.detectChanges();

    const dropEvent = createDragEvent('drop', {
      clientX: dropElRect.left,
      clientY: dropElRect.top,
      screenX: window.screenX + dropElRect.left,
      screenY: window.screenY + dropElRect.top
    });

    dropEvent.dataTransfer.setData('Text', dragstartEvent.dataTransfer.getData('Text'));

    dropEl.dispatchEvent(dropEvent);
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    const dropChild = debugEl.query(By.css('.devui-tree-node.devui-operable-tree-node')).nativeElement;
    expect(dropChild.textContent).toContain('子节点2-2');
    expect(dropChild.textContent).toContain('子节点2-2-1');
    expect(dropChild.textContent).toContain('子节点2-2-2');
    expect(component.onNodeToggle).toHaveBeenCalled(); // drag over
    expect(component.onDrop).toHaveBeenCalled(); // drop
  }));

  it('draggable false work', fakeAsync(() => {
    component.draggable = false;
    fixture.detectChanges();
    const debugEls: Array<DebugElement> = debugEl.queryAll(By.css('.devui-tree-node__content'));
    const draggableEl: HTMLElement = debugEls[debugEls.length - 1].nativeElement;
    const dropEl: HTMLElement = debugEls[0].nativeElement;

    const dragElRect = draggableEl.getBoundingClientRect();
    const dropElRect = dropEl.getBoundingClientRect();

    const dragstartEvent = createDragEvent('dragstart', {
      clientX: dragElRect.left,
      clientY: dragElRect.top,
      screenX: window.screenX + dragElRect.left,
      screenY: window.screenY + dragElRect.top
    });
    draggableEl.dispatchEvent(dragstartEvent);
    fixture.detectChanges();

    const dropEvent = createDragEvent('drop', {
      clientX: dropElRect.left,
      clientY: dropElRect.top,
      screenX: window.screenX + dropElRect.left,
      screenY: window.screenY + dropElRect.top
    });

    dropEvent.dataTransfer.setData('Text', dragstartEvent.dataTransfer.getData('Text'));

    dropEl.dispatchEvent(dropEvent);
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    expect(component.onDrop).toHaveBeenCalledTimes(0); // drop
  }));

});
