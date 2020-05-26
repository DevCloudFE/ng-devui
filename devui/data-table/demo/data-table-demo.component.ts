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
  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'table-interaction', value: '表格交互'},
    { dAnchorLink: 'async-loading', value: '异步加载数据'},
    { dAnchorLink: 'table-fixing', value: '表头固定'},
    { dAnchorLink: 'lazy-loading-of-list-data', value: '列表数据懒加载'},
    { dAnchorLink: 'header-grouping', value: '表头分组'},
    { dAnchorLink: 'edit-cell', value: '编辑单元格'},
    { dAnchorLink: 'extend-extra-lines', value: '扩展额外行'},
    { dAnchorLink: 'tree-form', value: '树形表格'},
    { dAnchorLink: 'fixed-column', value: '固定列'},
    { dAnchorLink: 'column-dragging', value: '列拖拽'}
  ];
}
