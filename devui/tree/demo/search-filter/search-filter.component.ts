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
    'title': '父节点1',
    'customSearchValue': 'a',
  }, {
    'title': '父节点2',
    'customSearchValue': 'b',
    'children': [{
      'title': '子节点2-1',
      'customSearchValue': 'c',
      'children': [{
        'title': '子节点2-1-1',
        'customSearchValue': 'd',
      }, {
        'title': '子节点2-1-2',
        'customSearchValue': 'e',
      }]
    }, {
      'title': '子节点2-2',
      'customSearchValue': 'f',
      'children': [{
        'title': '子节点2-2-1',
        'customSearchValue': 'g',
      }, {
        'title': '子节点2-2-2',
        'customSearchValue': 'h',
      }]
    }]
  }, {
    'title': '父节点3',
    'customSearchValue': 'i',
    'children': [{
      'title': '子节点3-1',
      'customSearchValue': 'j',
    }, {
      'title': '子节点3-2',
      'customSearchValue': 'k',
    }],
  }, {
    'title': '父节点4',
    'customSearchValue': 'l',
    'children': [{
      'title': '子节点4-1',
      'customSearchValue': 'm',
    }, {
      'title': '子节点4-2',
      'customSearchValue': 'n',
    }]
  }, {
    'title': '父节点5',
    'customSearchValue': 'o',
    'children': [{
      'title': '子节点5-1',
      'customSearchValue': 'p',
    }, {
      'title': '子节点5-2',
      'customSearchValue': 'q',
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
    this.dOperableTreeComponent.operableTree.treeFactory.searchTree(event);
  }
  onKeyUp2(event) {
    this.dOperableTreeComponent.operableTree.treeFactory.searchTree(event, true);
  }
  onKeyUp3(event) {
    this.dOperableTreeComponent.operableTree.treeFactory.searchTree(event, true, 'customSearchValue');
  }
  onKeyUp4(event) {
    const regex = new RegExp('^' + event + '[\s\S]*');
    this.dOperableTreeComponent.operableTree.treeFactory.searchTree(event, true, undefined, regex);
  }
}
