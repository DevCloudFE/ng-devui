import {Component} from '@angular/core';

@Component({
  selector: 'd-tree-select-custom-icon',
  templateUrl: './tree-select-custom-icon.component.html',
  styleUrls: ['./tree-select-custom-icon.component.scss']
})
export class TreeSelectCustomIconComponent {

  data = [{
    'title': 'parent 1',
    'data': {'type': 'mix'},
    'id': 1
  }, {
    'title': 'parent 2',
    'data': {'type': 'mix'},
    'children': [{
      'title': 'parent 2-1',
      'data': {'type': 'mix'},
      'children': [{
        'title': 'leaf 2-1-1',
        'data': {'type': 'ppt'},
        'id': 3
      }, {
        'title': 'leaf 2-1-2',
        'data': {'type': 'xls'},
        'id': 4
      }],
      'id': 2
    }, {
      'title': 'parent 2-2',
      'data': {'type': 'mix'},
      'children': [{
        'title': 'leaf 2-2-1',
        'data': {'type': 'ppt'},
        'id': 6
      }, {
        'title': 'leaf 2-2-2',
        'data': {'type': 'doc'},
        'id': 7
      }],
      'id': 5
    }],
    'id': 18
  }, {
    'title': 'parent 3',
    'data': {'type': 'ppt'},
    'open': true,
    'halfChecked': true,
    'children': [{
      'title': 'leaf 3-1',
      'data': {'type': 'ppt'},
      'id': 9
    }, {
      'title': 'leaf 3-2',
      'data': {'type': 'ppt'},
      'disabled': true,
      'isChecked': true,
      'id': 10
    }, {
      'title': 'leaf 3-3',
      'data': {'type': 'ppt'},
      'disabled': true,
      'id': 11
    }],
    'id': 8
  }, {
    'title': 'parent 4',
    'data': {'type': 'xls'},
    'disabled': true,
    'children': [{
      'title': 'leaf 4-1',
      'data': {'type': 'xls'},
      'id': 13
    }, {
      'title': 'leaf 4-2',
      'data': {'type': 'xls'},
      'id': 14
    }],
    'id': 12
  }, {
    'title': 'parent 5',
    'data': {'type': 'xls'},
    'children': [{
      'title': 'leaf 5-1',
      'data': {'type': 'xls'},
      'id': 16
    }, {
      'title': 'leaf 5-2',
      'data': {'type': 'xls'},
      'id': 17
    }],
    'id': 15
  }];

  value = {
    'title': 'leaf 4-2',
    'data': {'type': 'xls'},
    'id': 14
  };

  showSelected($event: Event) {
    console.log('event emitted: ', $event);
  }
}
