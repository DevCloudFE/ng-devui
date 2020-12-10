import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'd-demo-back-top',
  templateUrl: './back-top-demo.component.html'
})

export class BackTopDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.scss')}
  ];
  customizeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./customize/customize.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./customize/customize.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./customize/customize.component.scss')}
  ];
  scrollContainerSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./scroll-container/scroll-container.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./scroll-container/scroll-container.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./scroll-container/scroll-container.component.scss')}
  ];

  navItems = [
    { dAnchorLink: 'back-top-basic', value: '基本用法'},
    { dAnchorLink: 'back-top-customize', value: '自定义'},
    { dAnchorLink: 'back-top-scroll-container', value: '滚动容器'},
  ];
}
