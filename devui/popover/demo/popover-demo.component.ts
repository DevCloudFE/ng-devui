import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  templateUrl: './popover-demo.component.html'
})
export class PopoverDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'CSS', language: 'css', code: require('!!raw-loader!./basic/basic.component.css') }
  ];

  manualSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./manual/manual.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./manual/manual.component.ts') },
    { title: 'CSS', language: 'css', code: require('!!raw-loader!./manual/manual.component.css') }
  ];

  customizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./customize/customize-tmp.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./customize/customize-tmp.component.ts') },
  ];
  constructor() {
  }
}
