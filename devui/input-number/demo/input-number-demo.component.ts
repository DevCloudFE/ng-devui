import {
  Component, OnInit
} from '@angular/core';
import {DevuiSourceData} from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-demo-input-number',
    templateUrl: './input-number-demo.component.html',
})
export class InputNumberDemoComponent {
  InputNumberDemoBasic: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/input-number-demo-basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/input-number-demo-basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/input-number-demo-basic.component.css')}
  ];

  InputNumberDemoDisabled: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./disabled/input-number-demo-disabled.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./disabled/input-number-demo-disabled.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./disabled/input-number-demo-disabled.component.css')}
  ];
}
