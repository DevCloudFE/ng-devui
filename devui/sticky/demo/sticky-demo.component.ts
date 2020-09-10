import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-demo-sticky',
    templateUrl: './sticky-demo.component.html'
})
export class StickyDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];
  ScrollTargetSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./scroll-target/scroll-target.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./scroll-target/scroll-target.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./scroll-target/scroll-target.component.css')}
  ];
  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'scroll-target', value: '更换滚动容器'},
  ];
}
