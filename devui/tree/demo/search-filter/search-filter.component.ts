import { Component, ViewChild } from '@angular/core';
import {
  TreeNode
} from 'ng-devui/tree';
import {
  OperableTreeComponent
} from 'ng-devui/tree';
@Component({
  selector: 'd-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent {
  @ViewChild('dOperableTreeComponent', { static: true }) dOperableTreeComponent: OperableTreeComponent;
  currentSelectedNode;
  data2 = [{
    'title': '父节点1'
  }, {
    'title': '父节点2',
    'children': [{
      'title': '子节点2-1',
      'children': [{
        'title': '子节点2-1-1'
      }, {
        'title': '子节点2-1-2'
      }]
    }, {
      'title': '子节点2-2',
      'children': [{
        'title': '子节点2-2-1'
      }, {
        'title': '子节点2-2-2'
      }]
    }]
  }, {
    'title': '父节点3',
    'children': [{
      'title': '子节点3-1',
    }, {
      'title': '子节点3-2',
    }],
  }, {
    'title': '父节点4',
    'children': [{
      'title': '子节点4-1'
    }, {
      'title': '子节点4-2'
    }]
  }, {
    'title': '父节点5',
    'children': [{
      'title': '子节点5-1'
    }, {
      'title': '子节点5-2'
    }]
  }];

  onOperableNodeDeleted(treeNode: TreeNode) {
    console.log('deleted: ', treeNode);
  }

  onOperableNodeSelected(treeNode: TreeNode) {
    console.log('selected: ', treeNode);
    this.currentSelectedNode = treeNode;
  }

  onKeyUp(event) {
    this.dOperableTreeComponent.operableTree.treeFactory.searchTree(event.target.value);
  }
  onKeyUp2(event) {
    this.dOperableTreeComponent.operableTree.treeFactory.searchTree(event.target.value, true);
  }
}
