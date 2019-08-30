import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from '../../shared/devui-codebox';

@Component({
    selector: 'd-demo-tabs',
    templateUrl: './tabs-demo.component.html'
})
export class TabsDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];

  withoutContentDemoSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./without-content/without-content.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./without-content/without-content.component.ts')}
  ];

  customizeDemoSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./customize-tmp/customize-tmp.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./customize-tmp/customize-tmp.component.ts')}
  ];

  constructor() {

  }
}
