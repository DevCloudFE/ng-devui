import { Component } from '@angular/core';

@Component({
  selector: 'd-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent {
  menu = [{
    title: '基础组件',
    children: [
      {title: '手风琴', link: '/components/zh-cn/accordion'},
      {title: '锚点', link: '/components/zh-cn/anchor'},
      {title: '按钮', link: '/components/zh-cn/button'},
    ]
  }, {
    title: '高级组件',
    children: [
      {title: '表格(禁用)', disabled: true, link: '/components/zh-cn/datatable'},
      {title: '拖拽(参数示例)', link: '/components/zh-cn/dragdrop?query=foo#bar'},
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
      {title: '警告', link: '/components/zh-cn/alert', target: '_self'},
      {title: '锚点', link: '/components/zh-cn/anchor', target: '_self'},
      {title: '手风琴', link: '/components/zh-cn/accordion', target: '_self'},
    ]
  }, {
    title: '高级组件',
    children: [
      {title: '表格(禁用)', disabled: true, link: '/components/zh-cn/datatable', target: '_self'},
      {title: '拖拽', link: '/components/zh-cn/dragdrop', target: '_self'},
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
      {title: '警告', link: '/components/zh-cn/alert', linkType: 'routerLink'},
      {title: '锚点', link: '/components/zh-cn/anchor', linkType: 'routerLink'},
      {title: '按钮', link: '/components/zh-cn/button', linkType: 'routerLink'},
    ]
  }, {
    title: '高级组件',
    children: [
      {title: '表格(禁用)', disabled: true, link: '/components/zh-cn/datatable', linkType: 'routerLink'},
      {title: '拖拽', link: '/components/zh-cn/dragdrop', linkType: 'routerLink'},
    ]
  }, {
    title: '其他',
    children: [
      {title: '图标库', link: '/icon', linkType: 'routerLink'},
      {title: '首页(外链且本窗口打开)', link: '/', linkType: 'hrefLink'},
    ]
  }];
}
