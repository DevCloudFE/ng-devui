import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-anchor-demo',
    templateUrl: './anchor-demo.component.html',
    styleUrls: ['../../style/core/_nav.scss']
})
export class AnchorDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];

  asyncSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./async/async.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./async/async.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./async/async.component.css')}
  ];

  constructor() {

  }
}
