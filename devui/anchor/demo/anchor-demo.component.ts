import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from '../../shared/devui-codebox';

@Component({
    selector: 'ave-demo-anchor',
    templateUrl: './anchor-demo.component.html'
})
export class AnchorDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];

  asynSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./asyn/asyn.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./asyn/asyn.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./asyn/asyn.component.css')}
  ];

  constructor() {

  }
}
