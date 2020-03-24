import { Component } from '@angular/core';
@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent {
  source = [{ title: 'DevUI', showMenu: false, link: '/components/get-start' },
  {
    title: '面包屑', showMenu: true, link: '/components/breadcrumb/demo', noNavigation: true,
    menuList: [
      { name: '锚点', link: '/components/anchor/demo', target: '_blank' },
      { name: '按钮', link: '/components/button/demo#主要按钮', linkType: 'routerLink' }
    ]
  }];
  constructor() {
  }
}
