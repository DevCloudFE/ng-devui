import { Component } from '@angular/core';
@Component({
    selector: 'd-custom',
    templateUrl: './custom.component.html',
    styleUrls: ['./custom.component.scss'],
    standalone: false
})
export class CustomComponent {
  breadData = [{ label: 'DevUI', showMenu: false, link: '/components/zh-cn/get-start' },
    {
      label: 'Breadcrumb', showMenu: true, isSearch: true,
      menuList: [
        { name: 'Anchor', link: '/components/zh-cn/anchor/demo' },
        { name: 'Button', link: '/components/zh-cn/button/demo' }
      ]
    }];
  constructor() {
  }
}
