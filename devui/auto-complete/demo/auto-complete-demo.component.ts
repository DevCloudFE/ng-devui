import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { Component } from '@angular/core';
@Component({
  selector: 'd-auto-complete-demo',
  templateUrl: './auto-complete-demo.component.html'
})
export class AutoCompleteDemoComponent {
  AutoCompleteDemoBasic: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/auto-complete-demo-basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/auto-complete-demo-basic.component.ts')},
  ];

  AutoCompleteDemoArray: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./array/auto-complete-demo-array.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./array/auto-complete-demo-array.component.ts')},
  ];

  AutoCompleteDemoCustom: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./custom/auto-complete-demo-custom.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./custom/auto-complete-demo-custom.component.ts')},
  ];

  AutoCompleteDemoDisable: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./disabled/auto-complete-demo-disable.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./disabled/auto-complete-demo-disable.component.ts')},
  ];
  AutoCompleteDemoDropdown: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./dropdown/auto-complete-demo-dropdown.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./dropdown/auto-complete-demo-dropdown.component.ts')},
  ];

  AutoCompleteDemoObject: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./object/auto-complete-demo-object.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./object/auto-complete-demo-object.component.ts')},
  ];
  constructor() { }
}
