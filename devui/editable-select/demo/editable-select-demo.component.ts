import { DevuiSourceData } from '../../shared/devui-codebox/devui-source-data';
import { Component } from '@angular/core';
@Component({
  selector: 'ave-editable-select-demo',
  templateUrl: './editable-select-demo.component.html',
})
export class EditableSelectDemoComponent {
  editableSelectDemoBasic: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/editable-select-demo-with-source.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/editable-select-demo-with-source.component.ts')},
  ];
  editableSelectDemoSearchFn: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml',
      code:  require('!!raw-loader!./search-function/editable-select-demo-with-search-function.component.html')},
    {title: 'TS', language: 'typescript',
      code: require('!!raw-loader!./search-function/editable-select-demo-with-search-function.component.ts')},
  ];
  editableSelectDemoAsyncData: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml',
      code:  require('!!raw-loader!./async-data/editable-select-demo-async-data-with-source.component.html')},
    {title: 'TS', language: 'typescript',
      code: require('!!raw-loader!./async-data/editable-select-demo-async-data-with-source.component.ts')},
  ];
  editableSelectDemoAsyncDataSearchFn: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml',
      code: require('!!raw-loader!./async-data-function/editable-select-demo-async-data-with-function.component.html')},
    {title: 'TS', language: 'typescript',
      code: require('!!raw-loader!./async-data-function/editable-select-demo-async-data-with-function.component.ts')},
  ];
  constructor() {
  }
}
