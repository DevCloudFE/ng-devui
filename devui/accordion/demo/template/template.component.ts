import { Component } from '@angular/core';

@Component({
  selector: 'd-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent {
  menu = [{
    title: 'Content 1',
    open: true,
    children: [
      {title: 'Child Content 1'},
      {title: 'Child Content 2'},
    ]
  }, {
    title: 'Content 2',
    children: [
      {title: 'Child Content 1'},
      {title: 'Child Content 2'},
      {title: 'Child Content 3'},
      {title: 'Child Content 4'},
    ]
  }, {
    title: 'Content 3',
    children: [
      {title: 'Child Content 1 (disabled)', disabled: true},
      {title: 'Child Content 2'},
      {title: 'Child Content 3'},
    ]
  }, {
    title: 'Content 4 (Custom No Data Template)',
    children: [] // 可展开菜单节点必须有children非undefined
  }, {
    title: 'Content 5 (Custom loading Template)',
    needLoadChildren: true,
    loading: false,
    children: []
  }];
  childrenData = [
    {title: 'Child Content 1'},
    {title: 'Child Content 2'},
    {title: 'Child Content 3'},
    {title: 'Child Content 4'},
    {title: 'Child Content 5'},
    {title: 'Child Content 6'},
    {title: 'Child Content 7'},
  ];

  itemClick(event) {
    event.item.clicktimes = (event.item.clicktimes || 0) + 1;
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
