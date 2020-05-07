import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-demo-loading',
    templateUrl: './loading-demo.component.html',
    styleUrls: ['../../style/core/_nav.scss']
})
export class LoadingDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];

  customSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./custom/custom.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./custom/custom.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./custom/custom.component.css')}
  ];

  promiseSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./promise/promise.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./promise/promise.component.ts')}
  ];
  loadingDemoSubscriptionSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./subscription/subscription.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./subscription/subscription.component.ts')}
  ];

  navItems = [
    { dAnchorLink: 'basic-usage', value: "基本用法"},
    { dAnchorLink: 'custom-style', value: "自定义样式"},
    { dAnchorLink: 'multi-promise', value: "多promise"},
    { dAnchorLink: 'use-subscription-mode', value: "使用Subscription方式"}
  ]

  constructor() {

  }
}
