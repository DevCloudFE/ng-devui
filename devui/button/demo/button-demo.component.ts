import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-demo-button',
    templateUrl: './button-demo.component.html',
    styleUrls: ['../../style/core/_nav.scss']
})
export class ButtonDemoComponent {
  commonSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./common/common.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./common/common.component.ts')}
  ];

  iconSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./icon/icon.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./icon/icon.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./icon/icon.component.css')}
  ];

  loadingSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./loading/loading.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./loading/loading.component.ts')}
  ];

  primarySource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./primary/primary.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./primary/primary.component.ts')}
  ];

  textSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./text/text.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./text/text.component.ts')}
  ];

  demoDocViewerMain;
  constructor() {
    this.demoDocViewerMain = document.querySelector('.doc-viewer-container .main');
  }
}
