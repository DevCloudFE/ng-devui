import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'd-demo-input-number',
  templateUrl: './layout-demo.component.html',
})
export class LayoutDemoComponent {
  LayoutBasic: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/layout-basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/layout-basic.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./basic/layout-basic.component.scss') },
  ];

  LayoutTop: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./top/top.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./top/top.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./top/top.component.scss') },
  ];

  LayoutTopAside: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./top-aside/top-aside.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./top-aside/top-aside.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./top-aside/top-aside.component.scss') },
  ];
}
