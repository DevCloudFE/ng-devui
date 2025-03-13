import {Component} from '@angular/core';

@Component({
    selector: 'd-tree-select-icon-parent',
    templateUrl: './icon-parent.component.html',
    standalone: false
})
export class TreeSelectIconParentComponent {

  data1 = [{
    'title': 'parent 1',
    'id': 1
  }, {
    'title': 'parent 2',
    'children': [{
      'title': 'parent 2-1',
      'children': [{
        'title': 'leaf 2-1-1',
        'id': 3
      }, {
        'title': 'leaf 2-1-2',
        'id': 4
      }],
      'id': 2
    }, {
      'title': 'parent 2-2',
      'children': [{
        'title': 'leaf 2-2-1',
        'id': 6
      }, {
        'title': 'leaf 2-2-2',
        'id': 7
      }],
      'id': 5
    }],
    'id': 18
  }, {
    'title': 'parent 3',
    'open': true,
    'halfChecked': true,
    'children': [{
      'title': 'leaf 3-1',
      'id': 9
    }, {
      'title': 'leaf 3-2',
      'disabled': true,
      'isChecked': true,
      'id': 10
    }, {
      'title': 'leaf 3-3',
      'disabled': true,
      'id': 11
    }],
    'id': 8
  }, {
    'title': 'parent 4',
    'disabled': true,
    'children': [{
      'title': 'leaf 4-1',
      'id': 13
    }, {
      'title': 'leaf 4-2',
      'id': 14
    }],
    'id': 12
  }, {
    'title': 'parent 5',
    'children': [{
      'title': 'leaf 5-1',
      'id': 16
    }, {
      'title': 'leaf 5-2',
      'id': 17
    }],
    'id': 15
  }];

  value1 = {
    'title': 'leaf 4-1',
    'id': 13
  };

  iconParentOpen = `
    <span style="width: 14px; display: inline-block;">O</span>
  `;

  iconParentClose = `
    <span style="width: 14px; display: inline-block;">-</span>
  `;

  showSelected($event: Event) {
    console.log('event emitted: ', $event);
  }
}
