import { Component } from '@angular/core';
import { TreeNode } from 'ng-devui';

@Component({
  selector: 'd-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent {
  currentSelectedNode;
  iconParentOpen = '<span class="icon icon-chevron-down"></span>';
  iconParentClose = '<span class="icon icon-collapse"></span>';
  iconLeaf = '<span></span>';
  data2 = [{
    'title': '资源',
    'data': { 'type': 'mix' },
    'open': true,
    'children': [{
      'title': '拓扑',
      'data': { 'type': 'mix' },
      'open': false,
      'children': [{
        'title': '拓扑管理',
        'data': { 'type': 'ppt' }
      }, {
        'title': 'IP拓扑管理',
        'data': { 'type': 'xls' }
      }]
    }, {
      'title': '监控工具',
      'data': { 'type': 'mix' },
      'open': false,
      'children': [{
        'title': '工具',
        'data': { 'type': 'ppt' }
      }, {
        'title': '使用方法',
        'data': { 'type': 'doc' }
      }]
    }]
  }, {
    'title': '演示文稿',
    'data': { 'type': 'ppt' },
    'open': false,
    'children': [{
      'title': '前端维护',
      'data': { 'type': 'ppt' }
    }, {
      'title': '后台维护',
      'data': { 'type': 'ppt' }
    }],
  }, {
    'title': '报表',
    'data': { 'type': 'xls' },
    'open': false,
    'children': [{
      'title': '报表数据',
      'data': { 'type': 'xls' }
    }, {
      'title': '报表统计',
      'data': { 'type': 'xls' }
    }]
  }];

  onOperableNodeSelected(treeNode: TreeNode) {
    console.log('selected: ', treeNode);
    this.currentSelectedNode = treeNode;
  }
}
