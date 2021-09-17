import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-datatable-demo',
  templateUrl: './data-table-demo.component.html',
})
export class DataTableDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/data-table-demo-basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/data-table-demo-basic.component.ts') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  basicOldSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic-old/basic-old.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic-old/basic-old.component.ts') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  interactionColumnSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./interaction-column/interaction-column.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./interaction-column/interaction-column.component.ts') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  interactionSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./interaction/interaction.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./interaction/interaction.component.ts') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  checkOptionSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./check-options/check-options.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./check-options/check-options.component.ts') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  checkOptionColSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./check-options-column/check-options-column.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./check-options-column/check-options-column.component.ts') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  asyncSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./async/data-table-demo-async.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./async/data-table-demo-async.component.ts') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  maxHeightSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./max-height/data-table-demo-maxheight.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./max-height/data-table-demo-maxheight.component.ts') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  lazySource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./lazy/data-table-demo-lazyloaddata.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./lazy/data-table-demo-lazyloaddata.component.ts') },
  ];
  multiSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./multi-header/data-table-demo-multiheader.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./multi-header/data-table-demo-multiheader.component.ts') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  headerGroupingSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./header-grouping/header-grouping.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./header-grouping/header-grouping.component.ts') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  editableSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./editable/data-table-demo-editable.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./editable/data-table-demo-editable.component.ts') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  editableOldSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./editable-old/editable-old.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./editable-old/editable-old.component.ts') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  treeTableSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./tree-table/tree-data.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./tree-table/tree-data.component.ts') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  treeTableOldSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./tree-table-old/tree-table-old.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./tree-table-old/tree-table-old.component.ts') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  expandRowSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./expand-row/expand-row.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./expand-row/expand-row.component.ts') },
  ];
  expandRowOldSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./expand-row-old/expand-row-old.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./expand-row-old/expand-row-old.component.ts') },
  ];
  fixColumnSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./fix-column/fix-column.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./fix-column/fix-column.component.ts') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  fixColumnOldSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./fix-column-old/fix-column-old.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./fix-column-old/fix-column-old.component.ts') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  dragColumnSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./drag-column/drag-column.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./drag-column/drag-column.component.ts') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  cellMergeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./cell-merge/cell-merge.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./cell-merge/cell-merge.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./cell-merge/cell-merge.component.scss') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  dragRowSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./drag-row/drag-row.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./drag-row/drag-row.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./drag-row/drag-row.component.scss') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  mutiDragRowSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./muti-drag-row/muti-drag-row.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./muti-drag-row/muti-drag-row.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./muti-drag-row/muti-drag-row.component.scss') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  bigDataTreeTableSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./big-data-tree-table/big-data-tree-table.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./big-data-tree-table/big-data-tree-table.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./big-data-tree-table/big-data-tree-table.component.scss') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./big-data-tree-table/mock-data') },
  ];
  virtualScrollSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./virtual-scroll/virtual-scroll.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./virtual-scroll/virtual-scroll.component.ts') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  mutilStyles: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./mutil-styles/mutil-styles.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./mutil-styles/mutil-styles.component.ts') },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];
  fixHeightVirtualScrollSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./fix-height-virtual-scroll/fix-height-virtual-scroll.component.html') },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./fix-height-virtual-scroll/fix-height-virtual-scroll.component.ts'),
    },
    { title: 'mock-data', language: 'typescript', code: require('!!raw-loader!./mock-data') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.datatable.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.datatable.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'mutil-styles', value: values['mutil-styles'] },
      { dAnchorLink: 'async-loading', value: values['async-loading'] },
      { dAnchorLink: 'table-interaction', value: values['table-interaction'] },
      { dAnchorLink: 'table-check-options', value: values['table-check-options'] },
      { dAnchorLink: 'lazy-loading-of-list-data', value: values['lazy-loading-of-list-data'] },
      { dAnchorLink: 'virtual-scroll', value: values['virtual-scroll'] },
      { dAnchorLink: 'table-fixing', value: values['table-fixing'] },
      { dAnchorLink: 'fixed-virtual-scroll', value: values['fixed-virtual-scroll'] },
      { dAnchorLink: 'header-grouping', value: values['header-grouping'] },
      { dAnchorLink: 'edit-cell', value: values['edit-cell'] },
      { dAnchorLink: 'expand-row', value: values['expand-row'] },
      { dAnchorLink: 'tree-form', value: values['tree-form'] },
      { dAnchorLink: 'fixed-column', value: values['fixed-column'] },
      { dAnchorLink: 'column-dragging', value: values['column-dragging'] },
      { dAnchorLink: 'cell-merge', value: values['cell-merge'] },
      { dAnchorLink: 'drag-row', value: values['drag-row'] },
      { dAnchorLink: 'muti-drag-row', value: values['muti-drag-row'] },
      // { dAnchorLink: 'big-data-tree-table', value: values['big-data-tree-table'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
