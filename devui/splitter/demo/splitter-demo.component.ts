import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-demo-splitter',
  templateUrl: './splitter-demo.component.html',
})
export class SplitterDemoComponent implements OnInit {

  SplitterBasicComponent = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./basic/splitter-demo-basic.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/splitter-demo-basic.component.ts')},
    {title: 'SCSS', language: 'css', code: require('!!raw-loader!./splitter-demo.component.scss')},
  ];

  SplitterVerticalComponent = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./vertical/splitter-demo-vertical.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./vertical/splitter-demo-vertical.component.ts')},
    {title: 'SCSS', language: 'css', code: require('!!raw-loader!./splitter-demo.component.scss')},
  ];

  SplitterMultiComponent = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./multi/splitter-demo-multi.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./multi/splitter-demo-multi.component.ts')},
    {title: 'SCSS', language: 'css', code: require('!!raw-loader!./splitter-demo.component.scss')},
  ];

  SplitterDirectionComponent = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./direction/splitter-demo-direction.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./direction/splitter-demo-direction.component.ts')},
    {title: 'SCSS', language: 'css', code: require('!!raw-loader!./splitter-demo.component.scss')},
  ];

  SplitterFoldedMenuComponent = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./shrink/shrink.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./shrink/shrink.component.ts')},
    {title: 'SCSS', language: 'css', code: require('!!raw-loader!./shrink/shrink.component.scss')},
  ];

  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'vertical-layout', value: '垂直布局用法'},
    { dAnchorLink: 'combine-layout', value: '组合布局用法'},
    { dAnchorLink: 'certain-unfold-direction', value: '指定折叠收起方向'},
    { dAnchorLink: 'shrink-show-menu', value: '折叠收缩显示菜单'},
  ];
  ngOnInit() {
  }
}
