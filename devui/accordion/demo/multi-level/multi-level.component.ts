import { Component } from '@angular/core';

@Component({
  selector: 'd-multi-level',
  templateUrl: './multi-level.component.html',
  styleUrls: ['./multi-level.component.css']
})
export class MultiLevelComponent {
  autoOpenActiveMenu = false;
  menu = [{
    title: '内容一（仅菜单）',
  }, {
    title: '内容二（菜单和内容）',
    children: [
      {title: '子内容1'},
      {title: '子内容2'},
      {title: '子内容3'},
    ]
  }, {
    title: '内容三（菜单和内容）',

    children: [{
        title: '子内容1（有子列表）',
        children: [
          {title: '子子内容1'},
          {title: '子子内容2', active: true},
          {title: '子子内容3'},
        ]
      }, {
        title: '子内容2（有子列表）',
        children: [
          {title: '子子内容1'},
          {
            title: '子子内容2（有子列表）',
            children: [
              {title: '子子子内容1'},
              {title: '子子子内容2'},
              {title: '子子子内容3'},
            ]
          },
          {title: '子子内容3'},
        ]
      },
      {title: '子内容2'},
      {title: '子内容3'},
    ]
  }, {
    title: '内容四（子列表没有内容）',
    children: []
  }];

}
