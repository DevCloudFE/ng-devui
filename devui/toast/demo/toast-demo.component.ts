import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'd-demo-toast',
  templateUrl: './toast-demo.component.html',
  styleUrls: ['../../style/core/_nav.scss']
})
export class ToastDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
  ];
  navItems = [
    { dAnchorLink: 'basic-usage', value: "基本用法"}
  ]

}
