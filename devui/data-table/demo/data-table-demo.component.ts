import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-datatable-demo',
  templateUrl: './data-table-demo.component.html',
})
export class DataTableDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/data-table-demo-basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/data-table-demo-basic.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  basicOldSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic-old/basic-old.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic-old/basic-old.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  interactionColumnSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./interaction-column/interaction-column.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./interaction-column/interaction-column.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  interactionSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./interaction/interaction.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./interaction/interaction.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  memoryTableSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./memory-table/memory-table.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./memory-table/memory-table.component.ts?raw') },
    { title: 'Directive', language: 'typescript', code: require('./memory-table/memory-table-width.directive.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  checkOptionSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./check-options/check-options.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./check-options/check-options.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  checkOptionColSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./check-options-column/check-options-column.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./check-options-column/check-options-column.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  asyncSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./async/data-table-demo-async.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./async/data-table-demo-async.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  maxHeightSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./max-height/data-table-demo-maxheight.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./max-height/data-table-demo-maxheight.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  lazySource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./lazy/data-table-demo-lazyloaddata.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./lazy/data-table-demo-lazyloaddata.component.ts?raw') },
  ];
  multiSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./multi-header/data-table-demo-multiheader.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./multi-header/data-table-demo-multiheader.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  headerGroupingSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./header-grouping/header-grouping.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./header-grouping/header-grouping.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  editableSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./editable/data-table-demo-editable.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./editable/data-table-demo-editable.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  editableOldSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./editable-old/editable-old.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./editable-old/editable-old.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  treeTableSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./tree-table/tree-data.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./tree-table/tree-data.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  treeTableOldSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./tree-table-old/tree-table-old.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./tree-table-old/tree-table-old.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  expandRowSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./expand-row/expand-row.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./expand-row/expand-row.component.ts?raw') },
  ];
  expandRowOldSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./expand-row-old/expand-row-old.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./expand-row-old/expand-row-old.component.ts?raw') },
  ];
  fixColumnSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./fix-column/fix-column.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./fix-column/fix-column.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  fixColumnOldSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./fix-column-old/fix-column-old.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./fix-column-old/fix-column-old.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  dragColumnSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./drag-column/drag-column.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./drag-column/drag-column.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  cellMergeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./cell-merge/cell-merge.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./cell-merge/cell-merge.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./cell-merge/cell-merge.component.scss?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  dragRowSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./drag-row/drag-row.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./drag-row/drag-row.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./drag-row/drag-row.component.scss?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  mutiDragRowSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./muti-drag-row/muti-drag-row.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./muti-drag-row/muti-drag-row.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./muti-drag-row/muti-drag-row.component.scss?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  virtualScrollSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./virtual-scroll/virtual-scroll.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./virtual-scroll/virtual-scroll.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  mutilStyles: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./mutil-styles/mutil-styles.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./mutil-styles/mutil-styles.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  dynamicColStyles: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./dynamic-cols/dynamic-cols-demo.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./dynamic-cols/dynamic-cols-demo.component.ts?raw') },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
  ];
  fixHeightVirtualScrollSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./fix-height-virtual-scroll/fix-height-virtual-scroll.component.html?raw') },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./fix-height-virtual-scroll/fix-height-virtual-scroll.component.ts?raw'),
    },
    { title: 'mock-data', language: 'typescript', code: require('./mock-data?raw') },
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
      { dAnchorLink: 'dynamic-cols', value: values['dynamic-cols'] },
      { dAnchorLink: 'async-loading', value: values['async-loading'] },
      { dAnchorLink: 'table-interaction', value: values['table-interaction'] },
      { dAnchorLink: 'table-memory', value: values['table-memory'] },
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
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
