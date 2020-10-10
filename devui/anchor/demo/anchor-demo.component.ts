import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-anchor-demo',
    templateUrl: './anchor-demo.component.html'
})
export class AnchorDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.scss')}
  ];

  asyncSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./async/async.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./async/async.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./async/async.component.scss')}
  ];
  hashSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./hash/hash.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./hash/hash.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./hash/hash.component.scss')}
  ];

  ScrollTargetSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./scroll-target/scroll-target.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./scroll-target/scroll-target.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./scroll-target/scroll-target.component.scss')}
  ];


  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'asynchronous-loading', value: '异步加载'},
    { dAnchorLink: 'scroll-target', value: '更换滚动容器'},
    { dAnchorLink: 'support-hash', value: '支持url锚点'}
  ];

}
