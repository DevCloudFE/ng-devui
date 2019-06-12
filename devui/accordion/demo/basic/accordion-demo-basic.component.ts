import { Component } from '@angular/core';

@Component({
  selector: 'ave-accordion-demo-basic',
  templateUrl: './accordion-demo-basic.component.html',
  styleUrls: ['./accordion-demo-basic.component.css']
})
export class AccordionDemoBasicComponent {
  restrictOneOpen = false;
  menu = [{
    title: '内容一',
    children: [
      {title: '子内容1'},
      {title: '子内容2'},
      {title: '子内容3'},
    ]
  }, {
    title: '内容二（超长长长长长长长长长长长长长长内容测试）',
    children: [
      {title: '子内容1（超长长长长长长长长长长长长长长内容测试'},
      {title: '子内容2'},
      {title: '子内容3'},
    ]
  }, {
    title: '内容三（默认展开）',
    open: true,
    children: [
      {title: '子内容1(禁用)', disabled: true},
      {title: '子内容2(默认激活)', active: true},
      {title: '子内容3'},
    ]
  }, {
    title: '内容四（没有子项）'
  }, {
    title: '内容五（禁用）',
    disabled: true,
    children: [
    ]
  }, {
    title: '内容六（动态加载）',
    needLoadChildren: true,
    loading: false,
    children: [
    ]
  }];

  itemClick(event) {
    console.log('item click' + JSON.stringify(event));
  }
  menuToggle(event) {
    console.log('menu toggle' + JSON.stringify(event));

    if (event.open && event.item.needLoadChildren) {
      event.item.loading = true;
      setTimeout(() => {
        event.item.children = [
          {title: '子内容1'},
          {title: '子内容2'}
        ];
        event.item.needLoadChildren = false;
        event.item.loading = false;
      }, 1000);
    }
  }

}
