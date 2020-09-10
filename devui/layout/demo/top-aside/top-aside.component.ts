import { Component } from '@angular/core';

@Component({
  selector: 'd-layout-top-aside',
  templateUrl: './top-aside.component.html',
  styleUrls: ['./top-aside.component.scss'],
})
export class LayoutTopAsideComponent {
  logoSrc = 'https://res.hc-cdn.com/x-roma-components/1.0.10/assets/devui/logo.svg';
  menu = [
    {
      title: '内容一',
      open: true,
      children: [{ title: '子内容1' }, { title: '子内容2' }, { title: '子内容3' }],
    },
    {
      title: '内容二',
      children: [{ title: '子内容1' }, { title: '子内容2' }, { title: '子内容3' }],
    },
    {
      title: '内容三（默认展开）',
      open: true,
      children: [{ title: '子内容1(禁用)', disabled: true }, { title: '子内容2(默认激活)', active: true }, { title: '子内容3' }],
    },
  ];
}
