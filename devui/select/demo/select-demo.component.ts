import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-select-demo',
    templateUrl: './select-demo.component.html',
})
export class SelectDemoComponent {
  SelectDemoBasicComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/select-demo-basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/select-demo-basic.component.ts')},
  ];
  SelectDemoObjectComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./custom-search/select-demo-object.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./custom-search/select-demo-object.component.ts')},
  ];
  SelectDemoAllComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./select-all/select-demo-all.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./select-all/select-demo-all.component.ts')},
  ];
  SelectDemoTemplateComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./item-template/select-demo-template.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./item-template/select-demo-template.component.ts')},
  ];

    constructor() { }

}
