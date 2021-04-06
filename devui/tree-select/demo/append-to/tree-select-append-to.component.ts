import { Component, Input } from '@angular/core';
import { ModalService } from 'ng-devui/modal';

@Component({
  selector: 'd-tree-select-modal',
  template: `
    <div style="padding: 10px;">
      <d-tree-select placeholder="Standard Input" [treeData]="treeDta" [expandTree]="true"
                     [(ngModel)]="value" (ngModelChange)="showSelected($event)" appendTo="#modal-modal"></d-tree-select>
      <div style="margin-top: 10px; text-align: center;">
        <d-button
          (btnClick)='close()'
          bsStyle="stress"
          circled="true"
        >
          Ok
        </d-button>
      </div>
    </div>
  `
})
export class TreeSelectModalComponent {
  @Input() data: any;
  value = {
    'title': 'leaf 4-1',
    'id': 13
  };

  treeDta = [{
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

  showSelected($event: Event) {
    console.log('event emitted: ', $event);
  }
  close () {
    this.data.onClose();
  }
}

@Component({
  selector: 'd-tree-select-append-to',
  templateUrl: './tree-select-append-to.component.html',
  providers: [ModalService]
})
export class TreeSelectAppendToComponent {

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

  data2 = [{
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

  constructor(private modalService: ModalService) {

  }

  showSelected($event: Event) {
    console.log('event emitted: ', $event);
  }

  openModal() {
    const results = this.modalService.open({
      id: 'modal-modal',
      width: '300px',
      backdropCloseable: false,
      component: TreeSelectModalComponent,
      onClose: () => {
        console.log('on modal closed.');
      },
      data: {
        content: 'Error: This is an error message, please take a look.',
        cancelBtnText: 'got it',
        onClose: (event) => {
          results.modalInstance.hide();
        },
      },
    });
    console.log(results);
  }
}
