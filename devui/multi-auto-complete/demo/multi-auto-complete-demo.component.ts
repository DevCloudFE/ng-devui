import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { Component } from '@angular/core';

@Component({
  selector: 'd-multi-auto-complete-demo',
  templateUrl: './multi-auto-complete-demo.component.html'
})
export class MultiAutoCompleteDemoComponent {
  MultiAutoCompleteDemoDefault: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./default/multi-auto-complete-demo-default.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./default/multi-auto-complete-demo-default.component.ts') },
  ];

  MultiAutoCompleteDemoArray: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./array/multi-auto-complete-demo-array.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./array/multi-auto-complete-demo-array.component.ts') },
  ];

  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'auto-complete-array', value: '自定义匹配方法'}
  ];
}
