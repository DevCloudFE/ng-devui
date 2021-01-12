import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'd-search-menu',
templateUrl: './search-menu.component.html'
})
export class SearchMenuComponent implements OnInit {

  breadData = [{ label: 'DevUI', showMenu: false, link: '/components/zh-cn/get-start' },
  {
    label: '面包屑', showMenu: true, isSearch: true,
    menuList: [
      { name: '锚点', link: '/components/zh-cn/anchor/demo' },
      { name: '按钮', link: '/components/zh-cn/button/demo' }
    ]
  }];
  constructor() {
  }
  ngOnInit(): void {

  }
}
