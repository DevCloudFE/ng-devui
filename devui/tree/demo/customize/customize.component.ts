import { Component } from '@angular/core';
import { TreeNode } from 'ng-devui/tree';

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
    'title': '父节点1',
    'data': { 'type': 'mix' },
    'open': true,
    'children': [{
      'title': '子节点1-1',
      'data': { 'type': 'mix' },
      'open': false,
      'children': [{
        'title': '子节点1-1-1',
        'data': { 'type': 'ppt' }
      }, {
        'title': '子节点1-1-2',
        'data': { 'type': 'xls' }
      }]
    }, {
      'title': '子节点1-2',
      'data': { 'type': 'mix' },
      'open': false,
      'children': [{
        'title': '子节点1-2-1',
        'data': { 'type': 'ppt' }
      }, {
        'title': '子节点1-2-2',
        'data': { 'type': 'doc' }
      }]
    }]
  }, {
    'title': '父节点2',
    'data': { 'type': 'ppt' },
    'open': false,
    'children': [{
      'title': '子节点2-1',
      'data': { 'type': 'ppt' }
    }, {
      'title': '子节点2-2',
      'data': { 'type': 'ppt' }
    }],
  }, {
    'title': '父节点3',
    'data': { 'type': 'xls' },
    'open': false,
    'children': [{
      'title': '子节点3-1',
      'data': { 'type': 'xls' }
    }, {
      'title': '子节点3-2',
      'data': { 'type': 'xls' }
    }]
  }];

  onOperableNodeSelected(treeNode: TreeNode) {
    console.log('selected: ', treeNode);
    this.currentSelectedNode = treeNode;
  }
  onBlurEdit(treeNode) {
    treeNode.editable = false;
  }
}
