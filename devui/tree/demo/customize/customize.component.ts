import { Component, ViewChild } from '@angular/core';
import { TreeComponent } from 'ng-devui/tree';

@Component({
  selector: 'd-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})
export class CustomizeComponent {
  @ViewChild('operableTree', { static: true }) operableTree: TreeComponent;
  iconParentOpen = '<span class="icon icon-chevron-down-2"></span>';
  iconParentClose = '<span style="transform: rotate(90deg)" class="icon icon-chevron-up-2"></span>';
  iconLeaf = '<span></span>';
  disableMouseEvent = false;
  data2 = [{
    'title': 'parent node 1',
    'data': { 'type': 'mix' },
    'open': true,
    'status': 'status1',
    'items': [{
      'title': 'leaf node 1-1',
      'data': { 'type': 'mix' },
      'open': false,
      'status': 'status1',
      'items': [{
        'title': 'leaf node 1-1-1',
        'data': { 'type': 'ppt' },
        'status': 'status2',
      }, {
        'title': 'leaf node 1-1-2',
        'data': { 'type': 'xls' }, 'status': 'status2',
      }]
    }, {
      'title': 'leaf node 1-2',
      'data': { 'type': 'mix' },
      'open': false,
      'status': 'status1',
      'items': [{
        'title': 'leaf node 1-2-1',
        'data': { 'type': 'ppt' },
        'status': 'status1',
      }, {
        'title': 'leaf node 1-2-2',
        'data': { 'type': 'doc' },
        'status': 'status1',
      }]
    }]
  }, {
    'title': 'parent node 2',
    'data': { 'type': 'ppt' },
    'open': false,
    'status': 'status1',
    'items': [{
      'title': 'leaf node 2-1',
      'data': { 'type': 'ppt' },
      'status': 'status1',
    }, {
      'title': 'leaf node 2-2',
      'data': { 'type': 'ppt' },
      'status': 'status1',
    }],
  }, {
    'title': 'parent node 3',
    'data': { 'type': 'xls' },
    'open': false,
    'status': 'status1',
    'items': [{
      'title': 'leaf node 3-1',
      'data': { 'type': 'xls' },
      'status': 'status1',
    }, {
      'title': 'leaf node 3-2',
      'data': { 'type': 'xls' },
      'status': 'status1',
    }]
  }];

  onBlurEdit(treeNode) {
    treeNode.editable = false;
  }
  showNode(node) {
    console.log(node);
  }
  onToggle($event, node) {
    if ($event && node.data.isHover) {
      node.data.disableMouseEvent = true;
    } else {
      node.data.isHover = false;
      node.data.disableMouseEvent = false;
    }
  }
  activeNode(node) {
    this.operableTree.treeFactory.activeNodeById(node.id);
  }
}
