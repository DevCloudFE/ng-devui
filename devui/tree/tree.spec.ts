import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DomHelper } from '../utils/testing/dom-helper';
import { ITreeItem } from './tree-factory.class';
import { TreeComponent } from './tree.component';
import { TreeModule } from './tree.module';

@Component({
  template: `
    <d-tree
      #basicTree
      [tree]="treeItems"
      [virtualScroll]="virtualScroll"
      (nodeSelected)="onNodeSelected($event)"
      (nodeToggled)="onNodeToggled($event)"
      (nodeDblClicked)="onDblClick($event)"
      (nodeRightClicked)="onRightClicked($event)"
    >
    </d-tree>
  `
})
class TestTreeComponent {
  @ViewChild('basicTree') basicTree: TreeComponent;
  virtualScroll = false;
  treeItems: Array<ITreeItem> = [
    {
      id: 'parent1',
      title: '父节点1 - 展开',
      open: true,
      disableToggle: false,
      items: [
        {
          id: 'child11',
          title: '父节点11 - 折叠',
          open: true,
          items: [
            {
              title: '叶子节点111'
            }
          ],
          data: {
            isOpen: true
          }
        },
        {
          title: '父节点12 - 折叠',
          open: true,
          items: [
            {
              title: '叶子节点121'
            }
          ],
          data: {
            isOpen: true
          }
        },
        {
          title: '父节点13 - 没有子节点 - 动态加载',
          isParent: true
        }
      ]
    },
    {
      id: 'parent2',
      open: true,
      title: '父节点2',
      data: {
        id: 'data2_1',
        name: 'parentName2'
      }
    }
  ];

  onDblClick = jasmine.createSpy('double click');
  onNodeSelected = jasmine.createSpy('node selected');
  onNodeToggled = jasmine.createSpy('node toggle');
  onRightClicked = jasmine.createSpy('node right clicked');
}

describe('tree', () => {
  let fixture: ComponentFixture<TestTreeComponent>;
  let debugEl: DebugElement;
  let component: TestTreeComponent;
  let domHelper: DomHelper<TestTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TreeModule, NoopAnimationsModule],
      declarations: [TestTreeComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTreeComponent);
    domHelper = new DomHelper(fixture);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('basic', () => {
    it('should create correctly', () => {
      expect(component).toBeTruthy();
    });

    it('should have correct styles', () => {
      const classes = [
        '.devui-tree-node',
        '.devui-tree-node__content',
        '.devui-tree-node__content--value-wrapper',
        '.devui-tree-node__folder',
        '.devui-tree-node__title'
      ];

      expect(domHelper.judgeStyleClasses(classes)).toBeTruthy();
    });

    it('should click apply selectNode function', () => {
      // component.basicTree.selectNode = jasmine.createSpy('select node function');
      const treeEl: HTMLElement = debugEl.query(By.css('.devui-tree-node__content')).nativeElement;

      treeEl.dispatchEvent(new Event('click'));
      expect(component.onNodeSelected).toHaveBeenCalled();
    });

    it('should double click apply nodeDblClick', () => {
      const treeEl: HTMLElement = debugEl.query(By.css('.devui-tree-node__title')).nativeElement;

      treeEl.dispatchEvent(new Event('dblclick'));
      expect(component.onDblClick).toHaveBeenCalled();
    });

    it('should folder icon click work', () => {
      const folderIconEl: HTMLElement = debugEl.query(By.css('.devui-tree-node__folder')).nativeElement;

      folderIconEl.dispatchEvent(new Event('click'));
      expect(component.onNodeToggled).toHaveBeenCalled();
    });
  });

  describe('append item', () => {
    it('should appendTreeItems work', () => {
      const leafNodes = [{ title: '叶子节点311' }, { title: '叶子节点312' }];
      component.basicTree.appendTreeItems([{ title: '父节点31', id: 'test31', open: true, items: leafNodes }], 'parent1');
      fixture.detectChanges();

      for (let i = 0; i < leafNodes.length; i++) {
        const addedLeafNode = debugEl.query(By.css(`span[title=${leafNodes[i].title}]`));
        expect(addedLeafNode).toBeTruthy();
      }
    });

    it('should append items to a void parent throw error', () => {
      const testNode = [{ title: '叶子节点311' }];
      expect(() => {
        component.basicTree.appendTreeItems(testNode, 'unknown');
      }).toThrowError('parent node does not exist.');
    });
  });

  it('should virtual scroll work correctly', () => {
    component.virtualScroll = true;
    fixture.detectChanges();
    const virtualScrollTreeEl: HTMLElement = debugEl.query(By.css('d-tree cdk-virtual-scroll-viewport')).nativeElement;
    expect(virtualScrollTreeEl).not.toBeNull();
  });

  it('should contextmenu work correctly', () => {
    const treeEl: HTMLElement = debugEl.query(By.css('.devui-tree-node__title')).nativeElement;
    treeEl.dispatchEvent(new Event('contextmenu'));
    expect(component.onRightClicked).toHaveBeenCalled();
  });

  it('should disableToggle work correctly', () => {
    component.treeItems = [
      {
        id: 'newNode',
        title: 'New Node',
        open: false,
        disableToggle: true,
        isParent: true
      }
    ];
    fixture.detectChanges();
    const folderIconEl: HTMLElement = debugEl.query(By.css('.devui-tree-node__folder')).nativeElement;
    folderIconEl.dispatchEvent(new Event('click'));
    expect(component.onNodeToggled).not.toHaveBeenCalled();
  });

  it('should view update when tree data changed', () => {
    component.treeItems = [
      {
        id: 'newNode',
        title: 'New Node',
        open: false,
        disableToggle: false,
        items: []
      }
    ];
    fixture.detectChanges();
    const newNodeEl: HTMLElement = debugEl
    .query(By.css('d-tree d-tree-nodes .devui-tree-node__content .devui-tree-node__title')).nativeElement;
    expect(newNodeEl.textContent).toEqual('New Node');

  });
});

describe('tree factory', () => {
  let fixture: ComponentFixture<TestTreeComponent>;
  let debugEl: DebugElement;
  let component: TestTreeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TreeModule, NoopAnimationsModule],
      declarations: [TestTreeComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTreeComponent);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get children by id work', () => {
    const children1Nodes = component.basicTree.treeFactory.getChildrenById('parent1');
    expect(children1Nodes.length).toBe(3);
    for (let i = 0; i < children1Nodes.length; i++) {
      expect(children1Nodes[i].data.title).toBe(component.treeItems[0].items[i].title);
    }
  });

  it('should close nodes by id function work', () => {
    let childrenNodes: Array<DebugElement> = debugEl.queryAll(By.css('.devui-tree-node__children'));
    expect(childrenNodes.length).toBe(4);

    let children1Nodes = component.basicTree.treeFactory.getChildrenById('parent1');
    for (let i = 0; i < children1Nodes.length - 1; i++) {
      // last node has no children nodes
      expect(children1Nodes[i].data.isOpen).toBeTruthy();
    }

    component.basicTree.treeFactory.closeNodesById('parent1');
    fixture.detectChanges();
    childrenNodes = debugEl.queryAll(By.css('.devui-tree-node__children'));
    expect(childrenNodes.length).toBe(1);

    component.basicTree.treeFactory.closeNodesById('parent1', true);
    fixture.detectChanges();
    children1Nodes = component.basicTree.treeFactory.getChildrenById('parent1');
    for (let i = 0; i < children1Nodes.length; i++) {
      expect(children1Nodes[i].data.isOpen).toBeFalsy();
    }
  });

  it('should get node by id work', () => {
    const node = component.basicTree.treeFactory.getNodeById('parent1');
    for (let i = 0; i < node.children.length; i++) {
      expect(node.children[i].data.title).toBe(component.treeItems[0].items[i].title);
    }
  });

  it('should search work', () => {
    const leafNodes = component.basicTree.treeFactory.searchTree('叶子');
    expect(leafNodes.length).toBe(2);
  });

  it('should disabled by id work', () => {
    component.basicTree.treeFactory.disabledNodesById('parent1');
    fixture.detectChanges();
    const node = component.basicTree.treeFactory.getNodeById('parent1');
    expect(node.disabled).toBeTruthy();

    const disabledNodes = component.basicTree.treeFactory.getDisabledNodes();
    fixture.detectChanges();
    expect(disabledNodes.every(item => item.data.disabled)).toBeTruthy();
  });

  it('should check nodes by id of parent node', () => {
    const checkedNodes = component.basicTree.treeFactory.checkNodesById('parent1', true) as any;
    expect(checkedNodes.every(item => item.data.isChecked)).toBeTruthy();
  });

  it('should check nodes by id of child node', () => {
    const checkedNodes = component.basicTree.treeFactory.checkNodesById('child11', true) as any;
    expect(checkedNodes.every(item => item.data.isChecked)).toBeTruthy();
  });
});
