import { Component } from '@angular/core';
import { TreeNode } from 'ng-devui/tree';

@Component({
  selector: 'd-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})
export class CustomizeComponent {
  currentSelectedNode;
  iconParentOpen = '<span class="icon icon-chevron-down"></span>';
  iconParentClose = '<span class="icon icon-collapse"></span>';
  iconLeaf = '<span></span>';
  disableMouseEvent = false;
  data2 = [{
    'title': '父节点1',
    'data': { 'type': 'mix' },
    'open': true,
    'status': '状态1',
    'children': [{
      'title': '子节点1-1',
      'data': { 'type': 'mix' },
      'open': false,
      'status': '状态1',
      'children': [{
        'title': '子节点1-1-1',
        'data': { 'type': 'ppt' },
        'status': '状态2',
      }, {
        'title': '子节点1-1-2',
        'data': { 'type': 'xls' }, 'status': '状态2',
      }]
    }, {
      'title': '子节点1-2',
      'data': { 'type': 'mix' },
      'open': false,
      'status': '状态1',
      'children': [{
        'title': '子节点1-2-1',
        'data': { 'type': 'ppt' },
        'status': '状态1',
      }, {
        'title': '子节点1-2-2',
        'data': { 'type': 'doc' },
        'status': '状态1',
      }]
    }]
  }, {
    'title': '父节点2',
    'data': { 'type': 'ppt' },
    'open': false,
    'status': '状态1',
    'children': [{
      'title': '子节点2-1',
      'data': { 'type': 'ppt' },
      'status': '状态1',
    }, {
      'title': '子节点2-2',
      'data': { 'type': 'ppt' },
      'status': '状态1',
    }],
  }, {
    'title': '父节点3',
    'data': { 'type': 'xls' },
    'open': false,
    'status': '状态1',
    'children': [{
      'title': '子节点3-1',
      'data': { 'type': 'xls' },
      'status': '状态1',
    }, {
      'title': '子节点3-2',
      'data': { 'type': 'xls' },
      'status': '状态1',
    }]
  }];

  onOperableNodeSelected(treeNode: TreeNode) {
    console.log('selected: ', treeNode);
    this.currentSelectedNode = treeNode;
  }
  onBlurEdit(treeNode) {
    treeNode.editable = false;
  }
  showNode(node) {
    console.log(node);
  }
  onToggle($event, node) {
    if ($event && node.data.isHover) {
      this.disableMouseEvent = true;
    } else {
      node.data.isHover = false;
      this.disableMouseEvent = false;
    }
  }
}
