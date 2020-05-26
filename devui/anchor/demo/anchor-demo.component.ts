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
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];

  asyncSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./async/async.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./async/async.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./async/async.component.css')}
  ];
  hashSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./hash/hash.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./hash/hash.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./hash/hash.component.css')}
  ];

  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'asynchronous-loading', value: '异步加载'},
    { dAnchorLink: 'support-hash', value: '支持url锚点'}
  ];

  constructor() {

  }
}
