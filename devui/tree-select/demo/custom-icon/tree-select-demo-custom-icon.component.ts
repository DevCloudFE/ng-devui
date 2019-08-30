import {Component} from '@angular/core';

@Component({
  selector: 'd-tree-select-custom-icon',
  templateUrl: './tree-select-demo-custom-icon.component.html',
  styleUrls: ['./tree-select-demo-custom-icon.component.css']
})
export class TreeSelectDemoCustomIconComponent {

  data = [{
    'title': '首页',
    'data': {'type': 'mix'},
    'id': 1
  }, {
    'title': '资源',
    'data': {'type': 'mix'},
    'children': [{
      'title': '拓扑',
      'data': {'type': 'mix'},
      'children': [{
        'title': '拓扑管理',
        'data': {'type': 'ppt'},
        'id': 3
      }, {
        'title': 'IP拓扑管理',
        'data': {'type': 'xls'},
        'id': 4
      }],
      'id': 2
    }, {
      'title': '监控工具',
      'data': {'type': 'mix'},
      'children': [{
        'title': '大屏监控',
        'data': {'type': 'ppt'},
        'id': 6
      }, {
        'title': '下级网管监控',
        'data': {'type': 'doc'},
        'id': 7
      }],
      'id': 5
    }],
    'id': 18
  }, {
    'title': '维护',
    'data': {'type': 'ppt'},
    'open': true,
    'halfChecked': true,
    'children': [{
      'title': '前端维护',
      'data': {'type': 'ppt'},
      'id': 9
    }, {
      'title': '后台维护',
      'data': {'type': 'ppt'},
      'disabled': true,
      'isChecked': true,
      'id': 10
    },
      {
        'title': '数据库维护',
        'data': {'type': 'ppt'},
        'disabled': true,
        'id': 11
      }],
    'id': 8
  }, {
    'title': '报表',
    'data': {'type': 'xls'},
    'disabled': true,
    'children': [{
      'title': '报表数据',
      'data': {'type': 'xls'},
      'id': 13
    }, {
      'title': '报表统计',
      'data': {'type': 'xls'},
      'id': 14
    }],
    'id': 12
  }, {
    'title': '管理',
    'data': {'type': 'xls'},
    'children': [{
      'title': '向导',
      'data': {'type': 'xls'},
      'id': 16
    }, {
      'title': '配置',
      'data': {'type': 'xls'},
      'id': 17
    }],
    'id': 15
  }];

  value = {
    'title': '报表统计',
    'data': {'type': 'xls'},
    'id': 14
  };

  showSelected($event: Event) {
    console.log('event emitted: ', $event);
  }
}
