import { Component, ViewChild } from '@angular/core';
import { ITreeItem, OperableTreeComponent, TreeNode } from 'ng-devui/tree';

@Component({
  selector: 'd-operate-btn',
  templateUrl: './operate-btn.component.html'
})
export class OperateBtnComponent {
  currentSelectedNode;
  @ViewChild('operableTree', { static: true }) operableTree: OperableTreeComponent;
  data = [{
    'title': 'parent node 1'
  }, {
    'title': 'parent node 2',
    'children': [{
      'title': 'leaf node 2-1',
      'children': [{
        'title': 'leaf node 2-1-1'
      }, {
        'title': 'leaf node 2-1-2'
      }]
    }, {
      'title': 'leaf node 2-2',
      'children': [{
        'title': 'leaf node 2-2-1'
      }, {
        'title': 'leaf node 2-2-2'
      }]
    }]
  }, {
    'title': 'parent node 3',
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
  onOperableNodeDeleted(treeNode: TreeNode) {
    console.log('deleted: ', treeNode);
  }

  onOperableNodeSelected(treeNode: TreeNode) {
    console.log('selected: ', treeNode);
    this.currentSelectedNode = treeNode;
  }

  onOperableNodeEdited(treeNode: TreeNode) {
    console.log('edited: ', treeNode);
  }

  onOperableNodeToggled(treeNode: TreeNode) {
    console.log('toggled: ', treeNode);
  }

  onOperableNodeChecked(checkedNodes: Array<ITreeItem>) {
    console.log('checked: ', checkedNodes);
  }

  addNode() {
    if (this.currentSelectedNode) {
      const node = this.operableTree.treeFactory.addNode({ parentId: this.currentSelectedNode.id, title: '新增一个节点' });
      this.currentSelectedNode.data.isOpen = true;
      console.log(node);
    }
  }

  editNodeTitle() {
    if (this.currentSelectedNode) {
      this.operableTree.treeFactory.editNodeTitle(this.currentSelectedNode.id);
    }
  }

  deleteNode() {
    if (this.currentSelectedNode) {
      this.operableTree.treeFactory.deleteNodeById(this.currentSelectedNode.id);
    }
  }

  beforeAddNode(node) {
    console.log('beforeAddNode', node);
    return new Promise((resolve, reject) => {
      resolve({ title: 'new  node ', index: 0 });
    }).catch(err => console.error(err));
  }

  beforeDeleteNode = (node) => {
    console.log('beforeDeleteNode', node);
    return new Promise((resolve, reject) => {
      resolve(node);
    }).catch(err => console.error(err));
  };

  beforeEditNode = (node) => {
    console.log('beforeEditNode', node);
    return new Promise((resolve, reject) => {
      resolve(node);
    }).catch(err => console.error(err));
  };

  postAddNode = (node) => {
    console.log('postAddNode', node);
    return new Promise((resolve, reject) => {
      resolve(node);
    }).catch(err => console.error(err));
  };

  editValueChange(event) {
    console.log('editChanged', event);
    // 标记态校验节点，可通过传入errTips控制报错信息，errTipsPosition控制报错信息的弹出位置
    if (event.value === '') {
      event.callback({
        errTips: 'The node name cannot be null!',
        errTipsPosition: 'right'
      });
    } else {
      // 校验通过后调用callback,取消报错显示
      event.callback();
    }
  }
}
