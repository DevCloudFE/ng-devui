import { Component } from '@angular/core';
@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent {
  source = [{ title: 'DevUI', showMenu: false, link: '/components/zh-cn/get-start' },
  {
    title: '面包屑', showMenu: true, link: 'components/zh-cn/breadcrumb/demo', noNavigation: true,
    menuList: [
      { name: '锚点', link: '/components/zh-cn/anchor/demo', target: '_blank' },
      { name: '按钮', link: '/components/zh-cn/button/demo#button-primary', linkType: 'routerLink' }
    ]
  }];
  constructor() {
  }
}
