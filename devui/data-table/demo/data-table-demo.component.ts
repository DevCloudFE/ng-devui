import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
@Component({
  selector: 'd-datatable-demo',
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
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  oneColumnSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./one-column/data-table-demo-onlyonecolumnsort.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./one-column/data-table-demo-onlyonecolumnsort.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  asyncSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./async/data-table-demo-async.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./async/data-table-demo-async.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  maxHeightSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./max-height/data-table-demo-maxheight.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./max-height/data-table-demo-maxheight.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  lazySource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./lazy/data-table-demo-lazyloaddata.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./lazy/data-table-demo-lazyloaddata.component.ts')}
  ];
  multiSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./multi-header/data-table-demo-multiheader.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./multi-header/data-table-demo-multiheader.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  editableSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./editable/data-table-demo-editable.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./editable/data-table-demo-editable.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  treeTableSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./tree-table/tree-data.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./tree-table/tree-data.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  expandTableSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./expand-row/expand-row.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./expand-row/expand-row.component.ts')},
  ];
  fixColumnSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./fix-column/fix-column.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./fix-column/fix-column.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  dragColumnSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./drag-column/drag-column.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./drag-column/drag-column.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
}
