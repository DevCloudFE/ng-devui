import { Component } from '@angular/core';
@Component({
  selector: 'd-source-config',
  templateUrl: './source-config.component.html'
})
export class SourceConfigComponent {
  source = [{ title: 'DevUI', showMenu: false, link: '/components/zh-cn/get-start' },
  {
    title: 'Breadcrumb', showMenu: true, link: 'components/zh-cn/breadcrumb/demo', noNavigation: true,
    menuList: [
      { name: 'Anchor', link: '/components/zh-cn/anchor/demo', target: '_blank' },
      { name: 'Button', link: '/components/zh-cn/button/demo#button-primary', linkType: 'routerLink' }
    ]
  }];
  constructor() {
  }
}
