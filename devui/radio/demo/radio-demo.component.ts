import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-demo-radio',
    templateUrl: './radio-demo.component.html'
})
export class RadioDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')}
  ];

  disabledSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./disabled/disabled.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./disabled/disabled.component.ts')}
  ];

  horizontalSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./horizontal/horizontal.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./horizontal/horizontal.component.ts')}
  ];

  verticalSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./vertical/vertical.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./vertical/vertical.component.ts')}
  ];

  customSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./custom/custom.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./custom/custom.component.ts')}
  ];

  demoDocViewerMain;

  navitems = [
    {dAnchorLink:'basic-usage', value:"互相独立的单选项"},
    {dAnchorLink:'disabled', value:"禁用"},
    {dAnchorLink:'horizontal', value:"横向排列"},
    {dAnchorLink:'vertical', value:"竖向排列"},
    {dAnchorLink:'custom', value:"自定义单选项"}
  ]

  constructor() {
    this.demoDocViewerMain = document.querySelector('.doc-viewer-container .main');
  }
}
