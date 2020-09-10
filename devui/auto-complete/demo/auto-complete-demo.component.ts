import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { Component } from '@angular/core';

@Component({
  selector: 'd-auto-complete-demo',
  templateUrl: './auto-complete-demo.component.html'
})
export class AutoCompleteDemoComponent {
  AutoCompleteDemoBasic: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/auto-complete-demo-basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/auto-complete-demo-basic.component.ts') },
  ];

  AutoCompleteDemoArray: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./array/auto-complete-demo-array.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./array/auto-complete-demo-array.component.ts') },
  ];

  AutoCompleteDemoCustom: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom/auto-complete-demo-custom.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom/auto-complete-demo-custom.component.ts') },
  ];

  AutoCompleteDemoDisable: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./disabled/auto-complete-demo-disable.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./disabled/auto-complete-demo-disable.component.ts') },
  ];
  AutoCompleteDemoDropdown: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./dropdown/auto-complete-demo-dropdown.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./dropdown/auto-complete-demo-dropdown.component.ts') },
  ];

  AutoCompleteDemoObject: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./object/auto-complete-demo-object.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./object/auto-complete-demo-object.component.ts') },
  ];

  AutoCompleteDemoLatest: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./latest/auto-complete-demo-latest.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./latest/auto-complete-demo-latest.component.ts') },
  ];

  AutoCompleteDemoLazyLoad: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./lazy-load/auto-complete-demo-lazy-load.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./lazy-load/auto-complete-demo-lazy-load.component.ts') },
  ];

  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'auto-object', value: '自定义数据匹配方法'},
    { dAnchorLink: 'auto-custom', value: '自定义模板展示'},
    { dAnchorLink: 'auto-disable', value: '设置禁用'},
    { dAnchorLink: 'auto-latest', value: '最近输入'},
    { dAnchorLink: 'auto-lazy-load', value: '启用懒加载'}
  ];
}
