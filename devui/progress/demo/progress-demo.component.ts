import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-demo-progress',
    templateUrl: './progress-demo.component.html'
})
export class ProgressDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];
  circleSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./circle/circle.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./circle/circle.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./circle/circle.component.css')}
  ];

  constructor() {

  }
}
