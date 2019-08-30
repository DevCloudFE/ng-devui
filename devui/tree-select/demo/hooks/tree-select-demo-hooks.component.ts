import {Component} from '@angular/core';

@Component({
  selector: 'd-tree-select-hooks',
  templateUrl: './tree-select-demo-hooks.component.html',
})
export class TreeSelectDemoHooksComponent {

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

  value1 = {
    'title': '报表数据',
    'id': 13
  };

  showSelected($event: Event) {
    console.log('event emitted: ', $event);
  }

  openOnInit (selectTreeComponent) {
    if (selectTreeComponent) { selectTreeComponent.isOpen = true; }
  }
}
