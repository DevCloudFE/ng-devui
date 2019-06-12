import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from '../../shared/devui-codebox';

@Component({
    selector: 'ave-demo-radio',
    templateUrl: './radio-demo.component.html'
})
export class RadioDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];

  disabledSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./disabled/disabled.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./disabled/disabled.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./disabled/disabled.component.css')}
  ];

  horizontalSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./horizontal/horizontal.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./horizontal/horizontal.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./horizontal/horizontal.component.css')}
  ];

  verticalSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./vertical/vertical.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./vertical/vertical.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./vertical/vertical.component.css')}
  ];

  customSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./custom/custom.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./custom/custom.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./custom/custom.component.css')}
  ];

  constructor() {

  }
}
