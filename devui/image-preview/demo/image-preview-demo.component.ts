import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'd-image-preview-demo',
  templateUrl: './image-preview-demo.component.html'
})
export class DImagePreviewDemoComponent {

  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
  ];
  customOpen: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./custom-open/custom-open.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./custom-open/custom-open.component.ts')},
  ];
  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'custom-usage', value: '自定义开启预览窗口'}
  ];
}
