import { Component, ViewChild } from '@angular/core';
import { OperableTreeComponent } from 'ng-devui/tree';
@Component({
  selector: 'd-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent {
  @ViewChild('dOperableTreeComponent', { static: true }) dOperableTreeComponent: OperableTreeComponent;
  data2 = [{
    'title': 'parent node 1',
    'customSearchValue': 'a',
  }, {
    'title': 'parent node 2',
    'customSearchValue': 'b',
    'items': [{
      'title': 'child node 2-1',
      'customSearchValue': 'c',
      'items': [{
        'title': 'child node 2-1-1',
        'customSearchValue': 'd',
      }, {
        'title': 'child node 2-1-2',
        'customSearchValue': 'e',
      }]
    }, {
      'title': 'child node 2-2',
      'customSearchValue': 'f',
      'items': [{
        'title': 'child node 2-2-1',
        'customSearchValue': 'g',
      }, {
        'title': 'child node 2-2-2',
        'customSearchValue': 'h',
      }]
    }]
  }, {
    'title': 'parent node 3',
    'customSearchValue': 'i',
    'items': [{
      'title': 'child node 3-1',
      'customSearchValue': 'j',
    }, {
      'title': 'child node 3-2',
      'customSearchValue': 'k',
    }],
  }, {
    'title': 'parent node 4',
    'customSearchValue': 'l',
    'items': [{
      'title': 'child node 4-1',
      'customSearchValue': 'm',
    }, {
      'title': 'child node 4-2',
      'customSearchValue': 'n',
    }]
  }, {
    'title': 'parent node 5',
    'customSearchValue': 'o',
    'items': [{
      'title': 'child node 5-1',
      'customSearchValue': 'p',
    }, {
      'title': 'child node 5-2',
      'customSearchValue': 'q',
    }]
  }];

  toggle = true;

  expandOrCollapse(event) {
    this.dOperableTreeComponent.treeFactory.toggleAllNodes(this.toggle);
    this.toggle = !this.toggle;
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
