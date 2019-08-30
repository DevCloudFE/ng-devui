import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from '../../shared/devui-codebox';

@Component({
    selector: 'd-demo-sticky',
    templateUrl: './sticky-demo.component.html'
})
export class StickyDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];

  constructor() {

  }
}
