import { Component, ViewChild } from '@angular/core';
import { ITreeItem, OperableTreeComponent, TreeNode } from 'ng-devui';

@Component({
  selector: 'd-operate-btn',
  templateUrl: './operate-btn.component.html',
  styleUrls: ['./operate-btn.component.css']
})
export class OperateBtnComponent {
  currentSelectedNode;
  @ViewChild('operableTree') operableTree: OperableTreeComponent;
  data = [{
    'title': '首页'
  }, {
    'title': '资源',
    'children': [{
      'title': '拓扑',
      'children': [{
        'title': '拓扑管理'
      }, {
        'title': 'IP拓扑管理'
      }]
    }, {
      'title': '监控工具',
      'children': [{
        'title': '大屏监控'
      }, {
        'title': '下级网管监控'
      }]
    }]
  }, {
    'title': '维护',
    'children': [{
      'title': '前端维护',
    }, {
      'title': '后台维护',
    }],
  }, {
    'title': '报表',
    'children': [{
      'title': '报表数据'
    }, {
      'title': '报表统计'
    }]
  }, {
    'title': '管理',
    'children': [{
      'title': '向导'
    }, {
      'title': '配置'
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
}
