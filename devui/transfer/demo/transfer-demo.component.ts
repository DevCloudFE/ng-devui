import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';

@Component({
  selector: 'd-transfer-demo',
  templateUrl: './transfer-demo.component.html'
})
export class TransferDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/transfer-demo-base.component.ts') }
  ];
  customSource: Array<DevuiSourceData> = [
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom/transfer-demo-custom.component.ts') }
  ];
  searchSource: Array<DevuiSourceData> = [
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./search/transfer-demo-search.component.ts') }
  ];
  sortSource: Array<DevuiSourceData> = [
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./sort/transfer-demo-sort.component.ts') }
  ];
}
