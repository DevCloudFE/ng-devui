import { Component } from '@angular/core';
import { AccordionComponent } from 'ng-devui/accordion';

@Component({
  selector: 'd-link',
  standalone: true,
  imports: [AccordionComponent],
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent {
  menu = [{
    title: 'Basic',
    children: [
      {title: 'Accordion', link: '/components/zh-cn/accordion'},
      {title: 'Anchor', link: '/components/zh-cn/anchor'},
      {title: 'Button', link: '/components/zh-cn/button'},
    ]
  }, {
    title: 'Advanced',
    children: [
      {title: 'Data Table (disabled)', disabled: true, link: '/components/zh-cn/datatable'},
      {title: 'Drag Drop (parameter example)', link: '/components/zh-cn/dragdrop?query=foo#bar'},
    ]
  }, {
    title: 'Others',
    children: [
      {title: 'Icon Library', link: '/icon'},
      {title: 'Home Page', disabled: true, link: '/'},
    ]
  }];
  menu2 = [{
    title: 'Basic',
    children: [
      {title: 'Alert', link: '/components/zh-cn/alert', target: '_self'},
      {title: 'Anchor', link: '/components/zh-cn/anchor', target: '_self'},
      {title: 'Accordion', link: '/components/zh-cn/accordion', target: '_self'},
    ]
  }, {
    title: 'Advanced',
    children: [
      {title: 'Data Table (disabled)', disabled: true, link: '/components/zh-cn/datatable', target: '_self'},
      {title: 'Drag Drop', link: '/components/zh-cn/dragdrop', target: '_self'},
    ]
  }, {
    title: 'Others',
    children: [
      {title: 'Icon Library', link: '/icon', target: '_self'},
      {title: 'Home Page(open blank page)', link: '/', target: '_blank'},
    ]
  }];
  menu3 = [{
    title: 'Basic',
    children: [
      {title: 'Alert', link: '/components/zh-cn/alert', linkType: 'routerLink'},
      {title: 'Anchor', link: '/components/zh-cn/anchor', linkType: 'routerLink'},
      {title: 'Button', link: '/components/zh-cn/button', linkType: 'routerLink'},
    ]
  }, {
    title: 'Advanced',
    children: [
      {title: 'Data Table (disabled)', disabled: true, link: '/components/zh-cn/datatable', linkType: 'routerLink'},
      {title: 'Drag Drop', link: '/components/zh-cn/dragdrop', linkType: 'routerLink'},
    ]
  }, {
    title: 'Others',
    children: [
      {title: 'Icon Library', link: '/icon', linkType: 'routerLink'},
      {title: 'Home Page(External link open in this window)', link: '/', linkType: 'hrefLink'},
    ]
  }];
}
