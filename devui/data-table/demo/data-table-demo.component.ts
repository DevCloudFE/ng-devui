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
  basicOldSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic-old/basic-old.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic-old/basic-old.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  interactionColumnSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./interaction-column/interaction-column.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./interaction-column/interaction-column.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  interactionSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./interaction/interaction.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./interaction/interaction.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  checkOptionSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./check-options/check-options.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./check-options/check-options.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  checkOptionColSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./check-options-column/check-options-column.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./check-options-column/check-options-column.component.ts')},
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
  headerGroupingSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./header-grouping/header-grouping.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./header-grouping/header-grouping.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  editableSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./editable/data-table-demo-editable.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./editable/data-table-demo-editable.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  editableOldSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./editable-old/editable-old.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./editable-old/editable-old.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  treeTableSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./tree-table/tree-data.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./tree-table/tree-data.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  treeTableOldSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./tree-table-old/tree-table-old.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./tree-table-old/tree-table-old.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  expandRowSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./expand-row/expand-row.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./expand-row/expand-row.component.ts')},
  ];
  expandRowOldSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./expand-row-old/expand-row-old.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./expand-row-old/expand-row-old.component.ts')},
  ];
  fixColumnSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./fix-column/fix-column.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./fix-column/fix-column.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  fixColumnOldSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./fix-column-old/fix-column-old.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./fix-column-old/fix-column-old.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  dragColumnSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./drag-column/drag-column.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./drag-column/drag-column.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  cellMergeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./cell-merge/cell-merge.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./cell-merge/cell-merge.component.ts')},
    {title: 'CSS', language: 'css', code: require('!!raw-loader!./cell-merge/cell-merge.component.scss')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  dragRowSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./drag-row/drag-row.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./drag-row/drag-row.component.ts')},
    {title: 'CSS', language: 'css', code: require('!!raw-loader!./drag-row/drag-row.component.scss')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  mutiDragRowSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./muti-drag-row/muti-drag-row.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./muti-drag-row/muti-drag-row.component.ts')},
    {title: 'CSS', language: 'css', code: require('!!raw-loader!./muti-drag-row/muti-drag-row.component.scss')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];
  virtualScrollSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./virtual-scroll/virtual-scroll.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./virtual-scroll/virtual-scroll.component.ts')},
    {title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data')}
  ];

  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'async-loading', value: '异步加载数据'},
    { dAnchorLink: 'table-interaction', value: '表格交互'},
    { dAnchorLink: 'table-check-options', value: '自定义表格选中操作'},
    { dAnchorLink: 'lazy-loading-of-list-data', value: '懒加载'},
    { dAnchorLink: 'virtual-scroll', value: '虚拟滚动'},
    { dAnchorLink: 'table-fixing', value: '表头固定'},
    { dAnchorLink: 'header-grouping', value: '表头分组'},
    { dAnchorLink: 'edit-cell', value: '编辑单元格'},
    { dAnchorLink: 'expand-row', value: '扩展行'},
    { dAnchorLink: 'tree-form', value: '树形表格'},
    { dAnchorLink: 'fixed-column', value: '固定列'},
    { dAnchorLink: 'column-dragging', value: '列拖拽'},
    { dAnchorLink: 'cell-merge', value: '单元格合并'},
    { dAnchorLink: 'drag-row', value: '行拖拽'},
    { dAnchorLink: 'muti-drag-row', value: '批量行拖拽'}
  ];
}
