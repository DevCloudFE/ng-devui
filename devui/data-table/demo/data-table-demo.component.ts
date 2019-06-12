import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
@Component({
  selector: 'ave-datatable-demo',
  templateUrl: './data-table-demo.component.html',

})
export class DataTableDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/data-table-demo-basic.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/data-table-demo-basic.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  resizeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./resize/data-table-demo-resizeable.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./resize/data-table-demo-resizeable.component.ts')},
  ];
  oneColumnSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./one-column/data-table-demo-onlyonecolumnsort.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./one-column/data-table-demo-onlyonecolumnsort.component.ts')},
  ];
  dynamicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./dynamic/data-table-demo-dynamic.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./dynamic/data-table-demo-dynamic.component.ts')},
  ];
  asyncSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./async/data-table-demo-async.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./async/data-table-demo-async.component.ts')},
  ];
  maxHeightSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./max-height/data-table-demo-maxheight.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./max-height/data-table-demo-maxheight.component.ts')},
  ];
  fixHeightSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./fix-height/data-table-demo-fixheader.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./fix-height/data-table-demo-fixheader.component.ts')},
  ];
  lazySource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./lazy/data-table-demo-lazyloaddata.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./lazy/data-table-demo-lazyloaddata.component.ts')},
  ];
  multiSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./multi-header/data-table-demo-multiheader.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./multi-header/data-table-demo-multiheader.component.ts')},
  ];
}
