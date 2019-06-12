import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ave-accordion-demo-link',
  templateUrl: './accordion-demo-link.component.html',
  styleUrls: ['./accordion-demo-link.component.css']
})
export class AccordionDemoLinkComponent {
  menu = [{
    title: '基础组件',
    children: [
      {title: '警告', link: '/components/alert'},
      {title: '锚点', link: '/components/anchor'},
      {title: '手风琴', link: '/components/accordion'},
    ]
  }, {
    title: '高级组件',
    children: [
      {title: '表格(禁用)', disabled: true, link: '/components/datatable'},
      {title: '拖拽', link: '/components/dragdrop'},
      {title: '图表', link: '/components/echarts'},
    ]
  }, {
    title: '其他',
    children: [
      {title: '图标库', link: '/components/fontIcons'},
      {title: '设计体系', disabled: true, link: '/design-cn'},
      {title: '场景', link: '/scene'},
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
      {title: '图表', link: '/components/echarts', target: '_self'},
    ]
  }, {
    title: '其他',
    children: [
      {title: '图标库', link: '/components/fontIcons', target: '_self'},
      {title: '设计体系(新开窗口)', link: '/design-cn', target: '_blank'},
      {title: '场景(新开窗口)', link: '/scene', target: '_blank'},
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
      {title: '图表', link: '/components/echarts', linkType: 'routerLink'},
    ]
  }, {
    title: '其他',
    children: [
      {title: '图标库', link: '/components/fontIcons', linkType: 'routerLink'},
      {title: '设计体系(外链且本窗口打开)', link: '/design-cn', linkType: 'hrefLink'},
      {title: '场景', link: '/scene', linkType: 'routerLink'},
    ]
  }];
}
