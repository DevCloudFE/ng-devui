
import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-demo-time-axis',
    templateUrl: './time-axis-demo.html'
})
export class TimeAxisDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./all-states/time-axis-all-states.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./all-states/time-axis-all-states.component.ts')},
  ];
  htmlSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./html-content/time-axis-html-content.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./html-content/time-axis-html-content.component.ts')},
  ];
  templateSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./template-content/time-axis-template-content.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./template-content/time-axis-template-content.component.ts')},
  ];
  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'content-with-html', value: '内容使用html'},
    { dAnchorLink: 'content-with-template', value: '内容使用模板自定义'}
  ];
  constructor() {
  }
}
