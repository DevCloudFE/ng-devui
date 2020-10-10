import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-demo-loading',
    templateUrl: './loading-demo.component.html'
})
export class LoadingDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.scss')}
  ];

  customSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./custom/custom.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./custom/custom.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./custom/custom.component.scss')}
  ];

  promiseSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./promise/promise.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./promise/promise.component.ts')}
  ];
  loadingDemoSubscriptionSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./subscription/subscription.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./subscription/subscription.component.ts')}
  ];
  showLoadingSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./show-loading/show-loading.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./show-loading/show-loading.component.ts')},
    {title: 'SCSS', language: 'typescript', code:  require('!!raw-loader!./show-loading/show-loading.component.scss')}
  ];
  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'custom-style', value: '自定义样式'},
    { dAnchorLink: 'multi-promise', value: '多promise'},
    { dAnchorLink: 'use-subscription-mode', value: '使用Subscription方式'},
    { dAnchorLink: 'show-loading', value: '使用showLoading控制'}
  ];
  constructor() {

  }
}
