import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'ave-demo-button',
    templateUrl: './button-demo.component.html'
})
export class ButtonDemoComponent {
  commonSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./common/common.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./common/common.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./common/common.component.css')}
  ];

  iconSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./icon/icon.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./icon/icon.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./icon/icon.component.css')}
  ];

  loadingSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./loading/loading.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./loading/loading.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./loading/loading.component.css')}
  ];

  primarySource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./primary/primary.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./primary/primary.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./primary/primary.component.css')}
  ];

  textSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./text/text.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./text/text.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./text/text.component.css')}
  ];

  constructor() {

  }
}
