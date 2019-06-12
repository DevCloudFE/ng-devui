import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ave-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.css']
})
export class DraggableComponent implements OnInit {

  transferData: string;
  data = [{
    'title': '资源',
    open: true,
    'children': [{
      'title': '拓扑',
      open: true,
      'children': [{
        'title': '拓扑管理'
      }, {
        'title': 'IP拓扑管理'
      }]
    }, {
      'title': '监控工具',
      'children': [{
        'title': '大屏监控'
      }, {
        'title': '下级网管监控'
      }]
    }]
  }, {
    'title': '维护',
    open: true,
    'children': [{
      'title': '前端维护',
    }, {
      'title': '后台维护',
    }],
  }, {
    'title': '报表',
    open: true,
    'children': [{
      'title': '报表数据'
    }, {
      'title': '报表统计'
    }]
  }];
  constructor() { }

  ngOnInit() {
    document.getElementById('draggableEl').ondragstart = function (event) {
      event.dataTransfer.setData('Text', '外部可拖动元素');
    };
  }

  beforeNodeDrop = (dragNodeId, dropNodeId) => {
    return new Promise((resovle) => {
      console.log('dragNodeId: ' + dragNodeId);
      console.log('dropNodeId: ' + dropNodeId);
      resovle();
    });
  }

  onDrop(data) {
    this.transferData = data.event.dataTransfer.getData('Text');
  }

}
