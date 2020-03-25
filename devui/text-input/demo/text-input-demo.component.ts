import {
  Component
} from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  templateUrl: './text-input-demo.component.html',
})
export class TextInputDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];
  demoDocViewerMain;
  constructor() {
    this.demoDocViewerMain = document.querySelector('.doc-viewer-container .main');
  }
}
