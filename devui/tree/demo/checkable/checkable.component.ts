import { Component, OnInit, ViewChild } from '@angular/core';
import { ITreeItem, OperableTreeComponent, TreeNode } from 'ng-devui/tree';

@Component({
  selector: 'd-checkable',
  templateUrl: './checkable.component.html',
})
export class CheckableComponent implements OnInit {

  @ViewChild('operableTree1', { static: true }) operableTreeComponent: OperableTreeComponent;
  currentSelectedNode;
  checkNote;

  // checkboxInput: ICheckboxInput = { color: '#5170ff' };
  data3 = [{
    'title': 'parent node 1'
  }, {
    'title': 'parent node 2',
    'open': true,
    'children': [{
      'title': 'leaf node 2-1',
      'children': [{
        'title': 'leaf node 2-1-1'
      }, {
        'title': 'leaf node 2-1-2'
      }]
    }, {
      'title': 'leaf node 2-2',
      'open': true,
      'children': [{
        'title': 'leaf node 2-2-1',
        'disabled': true,
        'isChecked': true
      }, {
        'title': 'leaf node 2-2-2',
        'disableSelect': true
      }]
    }]
  }, {
    'title': 'parent node 3',
    'disableToggle': true,
    'children': [{
      'title': 'leaf node 3-1',
    }, {
      'title': 'leaf node 3-2',
    }],
  }, {
    'title': 'parent node 4',
    'children': [{
      'title': 'leaf node 4-1'
    }, {
      'title': 'leaf node 4-2'
    }]
  }, {
    'title': 'parent node 5',
    'children': [{
      'title': 'leaf node 5-1'
    }, {
      'title': 'leaf node 5-2'
    }]
  }];

  ngOnInit() {
    setTimeout(() => this.getCheckedNote(this.operableTreeComponent), 0);
  }

  onOperableNodeDeleted(treeNode: TreeNode) {
    console.log('deleted: ', treeNode);
  }

  onOperableNodeSelected(treeNode: TreeNode) {
    console.log('selected: ', treeNode);
    this.currentSelectedNode = treeNode;
  }

  onOperableNodeToggled(treeNode: TreeNode) {
    console.log('toggled: ', treeNode);
  }

  onOperableNodeChecked(checkedNodes: Array<ITreeItem>) {
    this.getCheckedNote(this.operableTreeComponent);
    console.log('checked: ', checkedNodes);
  }

  getCheckedNote(tree: OperableTreeComponent) {
    if (!tree || !tree.treeFactory) {
      this.checkNote = [];
      return;
    }
    this.checkNote = tree.treeFactory.getCheckedNodes()
      .map((item: any) => ({ id: item.id, data: { title: item.data.title, isChecked: item.data.isChecked } }));
  }

  onOperableNodeDblClicked(node) {
    console.log(node);
  }

  onOperableNodeRightClicked(event) {
    console.log(event.node, event.event);
  }
  currentNodeChecked($event) {
    console.log('current node', $event);
  }
  clearCheckedNodes() {
    this.operableTreeComponent.treeFactory.checkAllNodes(false);
    this.getCheckedNote(this.operableTreeComponent);
  }
}
