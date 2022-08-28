import { Component, ViewChild } from '@angular/core';
import { OperableTreeComponent } from 'ng-devui/tree';

@Component({
  selector: 'd-custom-key',
  templateUrl: './custom-key.component.html',
})
export class CustomKeyComponent {

  @ViewChild('operableTree1', { static: true }) operableTreeComponent: OperableTreeComponent;
  currentSelectedNode;
  checkedNodes;
  data3 = [{
    'name': 'parent node 1'
  }, {
    'name': 'parent node 2',
    'open': true,
    'children': [{
      'name': 'leaf node 2-1',
      'children': [{
        'name': 'leaf node 2-1-1'
      }, {
        'name': 'leaf node 2-1-2'
      }]
    }, {
      'name': 'leaf node 2-2',
      'open': true,
      'children': [{
        'name': 'leaf node 2-2-1',
        'disabled': true,
        'isChecked': true
      }, {
        'name': 'leaf node 2-2-2',
        'disableSelect': true,
        'disableCheckbox':true
      }]
    }]
  }, {
    'name': 'parent node 3',
    'disableToggle': true,
    'children': [{
      'name': 'leaf node 3-1',
    }, {
      'name': 'leaf node 3-2',
    }],
  }, {
    'name': 'parent node 4',
    'children': [{
      'name': 'leaf node 4-1'
    }, {
      'name': 'leaf node 4-2'
    }]
  }, {
    'name': 'parent node 5',
    'children': [{
      'name': 'leaf node 5-1'
    }, {
      'name': 'leaf node 5-2'
    }]
  }];
}
