import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';

@Component({
  selector: 'd-transfer-demo',
  templateUrl: './transfer-demo.component.html'
})
export class TransferDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./basic/transfer-demo-base.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/transfer-demo-base.component.ts') }
  ];
  customSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./custom/transfer-demo-custom.component.html') },
    { title: 'CSS', language: 'css', code: require('!!raw-loader!./custom/transfer-demo-custom.component.scss') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom/transfer-demo-custom.component.ts') }
  ];
  searchSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./search/transfer-demo-search.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./search/transfer-demo-search.component.ts') }
  ];
  sortSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./sort/transfer-demo-sort.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./sort/transfer-demo-sort.component.ts') }
  ];
  navItems = [
    { dAnchorLink: 'transfer-demo-base', value: '基本用法' },
    { dAnchorLink: 'transfer-demo-search', value: '搜索穿梭框' },
    { dAnchorLink: 'transfer-demo-sort', value: '排序穿梭框' },
    { dAnchorLink: 'transfer-demo-custom', value: '自定义穿梭框' }
  ];
}
