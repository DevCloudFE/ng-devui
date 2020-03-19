import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from '../../shared/devui-codebox';

@Component({
    selector: 'd-alert-demo',
    templateUrl: './alert-demo.component.html'
})
export class AlertDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];

  closeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./close/close.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./close/close.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./close/close.component.css')}
  ];

  constructor() {

  }
}
