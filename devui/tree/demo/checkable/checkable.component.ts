import { Component, OnInit, ViewChild } from '@angular/core';
import { ICheckboxInput, ITreeItem, OperableTreeComponent, TreeNode } from 'ng-devui';

@Component({
  selector: 'ave-checkable',
  templateUrl: './checkable.component.html',
  styleUrls: ['./checkable.component.css']
})
export class CheckableComponent implements OnInit {

  @ViewChild('operableTree1') operableTreeComponent: OperableTreeComponent;
  currentSelectedNode;
  checkNote;

  checkboxInput: ICheckboxInput; // = { color: '#5170ff' };
  data3 = [{
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
    'open': true,
    'children': [{
      'title': '前端维护',
    }, {
      'title': '后台维护',
      'disabled': true,
      'isChecked': true
    },
    {
      'title': '数据库维护',
      'disabled': true,
    }]
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

  ngOnInit() {
    setTimeout(() => this.getCheckecNote(this.operableTreeComponent), 0);
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
    this.getCheckecNote(this.operableTreeComponent);
    console.log('checked: ', checkedNodes);
  }

  getCheckecNote(tree: OperableTreeComponent) {
    if (!tree || !tree.operableTree || !tree.operableTree.treeFactory) {
      this.checkNote = [];
      return;
    }
    this.checkNote = tree.operableTree.treeFactory.getCheckedNodes()
      .map((item: any) => ({ id: item.id, data: { title: item.data.title, isChecked: item.data.isChecked } }));
  }

}
