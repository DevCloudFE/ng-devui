import {Component, Input} from '@angular/core';
import {ModalService} from 'ng-devui/modal';

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
          好了
        </d-button>
      </div>
    </div>
  `
})
export class TreeSelectModalComponent {
  @Input() data: any;
  value = {
    'title': '报表数据',
    'id': 13
  };

  treeDta = [{
    'title': '首页',
    'id': 1
  }, {
    'title': '资源',
    'children': [{
      'title': '拓扑',
      'children': [{
        'title': '拓扑管理',
        'id': 3
      }, {
        'title': 'IP拓扑管理',
        'id': 4
      }],
      'id': 2
    }, {
      'title': '监控工具',
      'children': [{
        'title': '大屏监控',
        'id': 6
      }, {
        'title': '下级网管监控',
        'id': 7
      }],
      'id': 5
    }],
    'id': 18
  }, {
    'title': '维护',
    'open': true,
    'halfChecked': true,
    'children': [{
      'title': '前端维护',
      'id': 9
    }, {
      'title': '后台维护',
      'disabled': true,
      'isChecked': true,
      'id': 10
    },
      {
        'title': '数据库维护',
        'disabled': true,
        'id': 11
      }],
    'id': 8
  }, {
    'title': '报表',
    'disabled': true,
    'children': [{
      'title': '报表数据',
      'id': 13
    }, {
      'title': '报表统计',
      'id': 14
    }],
    'id': 12
  }, {
    'title': '管理',
    'children': [{
      'title': '向导',
      'id': 16
    }, {
      'title': '配置',
      'id': 17
    }],
    'id': 15
  }];

  showSelected($event: Event) {
    console.log('event emitted: ', $event);
  }
  close () {
    this.data.onClose(event);
  }
}

@Component({
  selector: 'd-tree-select-append-to',
  templateUrl: './tree-select-demo-append-to.component.html',
  providers: [ModalService]
})
export class TreeSelectDemoAppendToComponent {

  data1 = [{
    'title': '首页',
    'id': 1
  }, {
    'title': '资源',
    'children': [{
      'title': '拓扑',
      'children': [{
        'title': '拓扑管理',
        'id': 3
      }, {
        'title': 'IP拓扑管理',
        'id': 4
      }],
      'id': 2
    }, {
      'title': '监控工具',
      'children': [{
        'title': '大屏监控',
        'id': 6
      }, {
        'title': '下级网管监控',
        'id': 7
      }],
      'id': 5
    }],
    'id': 18
  }, {
    'title': '维护',
    'open': true,
    'halfChecked': true,
    'children': [{
      'title': '前端维护',
      'id': 9
    }, {
      'title': '后台维护',
      'disabled': true,
      'isChecked': true,
      'id': 10
    },
      {
        'title': '数据库维护',
        'disabled': true,
        'id': 11
      }],
    'id': 8
  }, {
    'title': '报表',
    'disabled': true,
    'children': [{
      'title': '报表数据',
      'id': 13
    }, {
      'title': '报表统计',
      'id': 14
    }],
    'id': 12
  }, {
    'title': '管理',
    'children': [{
      'title': '向导',
      'id': 16
    }, {
      'title': '配置',
      'id': 17
    }],
    'id': 15
  }];

  data2 = [{
    'title': '首页',
    'id': 1
  }, {
    'title': '资源',
    'children': [{
      'title': '拓扑',
      'children': [{
        'title': '拓扑管理',
        'id': 3
      }, {
        'title': 'IP拓扑管理',
        'id': 4
      }],
      'id': 2
    }, {
      'title': '监控工具',
      'children': [{
        'title': '大屏监控',
        'id': 6
      }, {
        'title': '下级网管监控',
        'id': 7
      }],
      'id': 5
    }],
    'id': 18
  }, {
    'title': '维护',
    'open': true,
    'halfChecked': true,
    'children': [{
      'title': '前端维护',
      'id': 9
    }, {
      'title': '后台维护',
      'disabled': true,
      'isChecked': true,
      'id': 10
    },
      {
        'title': '数据库维护',
        'disabled': true,
        'id': 11
      }],
    'id': 8
  }, {
    'title': '报表',
    'disabled': true,
    'children': [{
      'title': '报表数据',
      'id': 13
    }, {
      'title': '报表统计',
      'id': 14
    }],
    'id': 12
  }, {
    'title': '管理',
    'children': [{
      'title': '向导',
      'id': 16
    }, {
      'title': '配置',
      'id': 17
    }],
    'id': 15
  }];

  value1 = {
    'title': '报表数据',
    'id': 13
  };
  value2 = [{
    'title': '报表统计',
    'id': 14
  }, {
    'title': '报表数据',
    'id': 13
  }, {
    'title': '拓扑管理',
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
      showAnimate: false,
      component: TreeSelectModalComponent,
      onClose: () => {
        console.log('on modal closed.');
      },
      data: {
        content: 'Error: This is an error message, please take a look.',
        cancelBtnText: '我知道了',
        onClose: (event) => {
          results.modalInstance.hide();
        },
      },
    });
    console.log(results);
  }
}
