import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-demo-sticky',
    templateUrl: './sticky-demo.component.html',
    styleUrls: ['../../style/core/_nav.scss']
})
export class StickyDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];

  navItems = [
    { dAnchorLink: 'basic-usage', value: "基本用法"}
  ]
  constructor() {

  }
}
