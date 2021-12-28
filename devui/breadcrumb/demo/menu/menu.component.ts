import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'd-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

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
  ngOnInit(): void {

  }

  toggleEvent(event) {
    console.log(event);
  }
}
