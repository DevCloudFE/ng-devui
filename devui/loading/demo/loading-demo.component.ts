import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from '../../shared/devui-codebox';

@Component({
    selector: 'ave-demo-loading',
    templateUrl: './loading-demo.component.html'
})
export class LoadingDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];

  customSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./custom/custom.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./custom/custom.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./custom/custom.component.css')}
  ];

  promiseSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./promise/promise.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./promise/promise.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./promise/promise.component.css')}
  ];

  constructor() {

  }
}
