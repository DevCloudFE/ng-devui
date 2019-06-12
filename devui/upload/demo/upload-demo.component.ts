import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'ave-upload-demo',
  templateUrl: './upload-demo.component.html',
})
export class UploadDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];
  multiSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./multi/multi.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./multi/multi.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./multi/multi.component.css')}
  ];
  customizeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./customize/customize.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./customize/customize.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./customize/customize.component.css')}
  ];
  constructor() {
  }
}
