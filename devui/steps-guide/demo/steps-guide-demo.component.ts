import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  templateUrl: './steps-guide-demo.component.html',
})
export class StepsGuideDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
  ];

  lifeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom/custom.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom/custom.component.ts') },
  ];

  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法' },
    { dAnchorLink: 'custom', value: '自定义位置' }
  ];
}
