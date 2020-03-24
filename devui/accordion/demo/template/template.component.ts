import { Component } from '@angular/core';

@Component({
  selector: 'd-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent {
  menu = [{
    title: '内容一',
    open: true,
    children: [
      {title: '子内容1'},
      {title: '子内容2'},
    ]
  }, {
    title: '内容二',
    children: [
      {title: '子内容1'},
      {title: '子内容2'},
      {title: '子内容3'},
      {title: '子内容4'},
    ]
  }, {
    title: '内容三',
    children: [
      {title: '子内容1(禁用)', disabled: true},
      {title: '子内容2'},
      {title: '子内容3'},
    ]
  }, {
    title: '内容四（自定义无数据模板）',
    children: [] // 可展开菜单节点必须有children非undefined
  }, {
    title: '内容五（自定义加载中模板）',
    needLoadChildren: true,
    loading: false,
    children: []
  }];
  childrenData = [
    {title: '子内容1'},
    {title: '子内容2'},
    {title: '子内容3'},
    {title: '子内容4'},
    {title: '子内容5'},
    {title: '子内容6'},
    {title: '子内容7'},
  ];

  itemClick(event) {
    event.item.clicktimes = ( event.item.clicktimes || 0 ) + 1;
  }

  menuToggle(event) {
    if (event.open && event.item.needLoadChildren) {
      event.item.loading = true;
      setTimeout(() => {
        event.item.children = this.childrenData;
        event.item.needLoadChildren = false;
        event.item.loading = false;
      }, 1000);
    }
  }

  clearChildrenData(event, item) {
    event.stopPropagation();
    item.children = [];
    item.needLoadChildren = true;
    item.open = false;
  }
}
