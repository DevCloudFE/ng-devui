import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent {
  menu = [{
    title: '基础组件',
    children: [
      {title: '手风琴', link: '/components/accordion'},
      {title: '锚点', link: '/components/anchor'},
      {title: '按钮', link: '/components/button'},
    ]
  }, {
    title: '高级组件',
    children: [
      {title: '表格(禁用)', disabled: true, link: '/components/datatable'},
      {title: '拖拽', link: '/components/dragdrop'},
    ]
  }, {
    title: '其他',
    children: [
      {title: '图标库', link: '/icon'},
      {title: '首页', disabled: true, link: '/'},
    ]
  }];
  menu2 = [{
    title: '基础组件',
    children: [
      {title: '警告', link: '/components/alert', target: '_self'},
      {title: '锚点', link: '/components/anchor', target: '_self'},
      {title: '手风琴', link: '/components/accordion', target: '_self'},
    ]
  }, {
    title: '高级组件',
    children: [
      {title: '表格(禁用)', disabled: true, link: '/components/datatable', target: '_self'},
      {title: '拖拽', link: '/components/dragdrop', target: '_self'},
    ]
  }, {
    title: '其他',
    children: [
      {title: '图标库', link: '/icon', target: '_self'},
      {title: '首页(新开窗口)', link: '/', target: '_blank'},
    ]
  }];
  menu3 = [{
    title: '基础组件',
    children: [
      {title: '警告', link: '/components/alert', linkType: 'routerLink'},
      {title: '锚点', link: '/components/anchor', linkType: 'routerLink'},
      {title: '按钮', link: '/components/button', linkType: 'routerLink'},
    ]
  }, {
    title: '高级组件',
    children: [
      {title: '表格(禁用)', disabled: true, link: '/components/datatable', linkType: 'routerLink'},
      {title: '拖拽', link: '/components/dragdrop', linkType: 'routerLink'},
    ]
  }, {
    title: '其他',
    children: [
      {title: '图标库', link: '/icon', linkType: 'routerLink'},
      {title: '首页(外链且本窗口打开)', link: '/', linkType: 'hrefLink'},
    ]
  }];
}
