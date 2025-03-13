import {Component} from '@angular/core';

@Component({
    selector: 'd-tree-select-keys',
    templateUrl: './tree-select-keys.component.html',
    standalone: false
})
export class TreeSelectKeysComponent {

  data1 = [{
    'title': 'parent 1',
    'customId': 1
  }, {
    'title': 'parent 2',
    'children': [{
      'title': 'parent 2-1',
      'children': [{
        'title': 'leaf 2-1-1',
        'customId': 3
      }, {
        'title': 'leaf 2-1-2',
        'customId': 4
      }],
      'customId': 2
    }, {
      'title': 'parent 2-2',
      'children': [{
        'title': 'leaf 2-2-1',
        'customId': 6
      }, {
        'title': 'leaf 2-2-2',
        'customId': 7
      }],
      'customId': 5
    }],
    'customId': 18
  }, {
    'title': 'parent 3',
    'open': true,
    'halfChecked': true,
    'children': [{
      'title': 'leaf 3-1',
      'customId': 9
    }, {
      'title': 'leaf 3-2',
      'disabled': true,
      'isChecked': true,
      'customId': 10
    }, {
      'title': 'leaf 3-3',
      'disabled': true,
      'customId': 11
    }],
    'customId': 8
  }, {
    'title': 'parent 4',
    'disabled': true,
    'children': [{
      'title': 'leaf 4-1',
      'customId': 13
    }, {
      'title': 'leaf 4-2',
      'customId': 14
    }],
    'customId': 12
  }, {
    'title': 'parent 5',
    'children': [{
      'title': 'leaf 5-1',
      'customId': 16
    }, {
      'title': 'leaf 5-2',
      'customId': 17
    }],
    'customId': 15
  }];

  data2 = [{
    'title': 'parent 1',
    'id': 1
  }, {
    'title': 'parent 2',
    'customChildren': [{
      'title': 'parent 2-1',
      'customChildren': [{
        'title': 'leaf 2-1-1',
        'id': 3
      }, {
        'title': 'leaf 2-1-2',
        'id': 4
      }],
      'id': 2
    }, {
      'title': 'parent 2-2',
      'customChildren': [{
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
    'customChildren': [{
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
    'customChildren': [{
      'title': 'leaf 4-1',
      'id': 13
    }, {
      'title': 'leaf 4-2',
      'id': 14
    }],
    'id': 12
  }, {
    'title': 'parent 5',
    'customChildren': [{
      'title': 'leaf 5-1',
      'id': 16
    }, {
      'title': 'leaf 5-2',
      'id': 17
    }],
    'id': 15
  }];

  data3 = [{
    'customTitle': 'parent 1',
    'id': 1
  }, {
    'customTitle': 'parent 2',
    'children': [{
      'customTitle': 'parent 2-1',
      'children': [{
        'customTitle': 'leaf 2-1-1',
        'id': 3
      }, {
        'customTitle': 'leaf 2-1-2',
        'id': 4
      }],
      'id': 2
    }, {
      'customTitle': 'parent 2-2',
      'children': [{
        'customTitle': 'leaf 2-2-1',
        'id': 6
      }, {
        'customTitle': 'leaf 2-2-2',
        'id': 7
      }],
      'id': 5
    }],
    'id': 18
  }, {
    'customTitle': 'parent 3',
    'open': true,
    'halfChecked': true,
    'children': [{
      'customTitle': 'leaf 3-1',
      'id': 9
    }, {
      'customTitle': 'leaf 3-2',
      'disabled': true,
      'isChecked': true,
      'id': 10
    }, {
      'customTitle': 'leaf 3-3',
      'disabled': true,
      'id': 11
    }],
    'id': 8
  }, {
    'customTitle': 'parent 4',
    'disabled': true,
    'children': [{
      'customTitle': 'leaf 4-1',
      'id': 13
    }, {
      'customTitle': 'leaf 4-2',
      'id': 14
    }],
    'id': 12
  }, {
    'customTitle': 'parent 5',
    'children': [{
      'customTitle': 'leaf 5-1',
      'id': 16
    }, {
      'customTitle': 'leaf 5-2',
      'id': 17
    }],
    'id': 15
  }];

  value1 = {
    'title': 'leaf 4-1',
    'customId': 13
  };
  value2 = [{
    'title': 'leaf 4-2',
    'id': 14
  }, {
    'title': 'leaf 4-1',
    'id': 13
  }, {
    'title': 'leaf 2-1-1',
    'id': 3
  }];
  value3 = [{
    'customTitle': 'leaf 4-2',
    'id': 14
  }, {
    'customTitle': 'leaf 4-1',
    'id': 13
  }, {
    'customTitle': 'leaf 2-1-1',
    'id': 3
  }];

  iconLeaf = `
    <span style="width: 14px; display: inline-block;">A</span>
  `;

  showSelected($event: Event) {
    console.log('event emitted: ', $event);
  }
}
