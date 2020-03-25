import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-demo-pagination',
    templateUrl: './pagination-demo.component.html',
    styleUrls: ['../../style/core/_nav.scss']
})
export class PaginationDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')}
  ];

  additionalSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./additional/additional.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./additional/additional.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./additional/additional.component.css')}
  ];
  liteSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./lite/lite.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./lite/lite.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./lite/lite.component.css')}
  ];
  widgetsSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./widgets/widgets.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./widgets/widgets.component.ts')}
  ];
  constructor() {

  }
}
