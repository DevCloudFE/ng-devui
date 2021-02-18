import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-tree-demo',
  templateUrl: './tree-demo.component.html',
})
export class TreeDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
  ];
  treeFactorySource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./tree-factory/tree-factory.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./tree-factory/tree-factory.component.ts') },
  ];
  MergeNodeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./merge-node/merge-node.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./merge-node/merge-node.component.ts') },
  ];
  customLoadingSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom-loading/custom-loading.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom-loading/custom-loading.component.ts') },
    { title: 'SVG-TS', language: 'typescript', code: require('!!raw-loader!./custom-loading/custom-loading-svg.ts') },
  ];

  checkableSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./checkable/checkable.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./checkable/checkable.component.ts') },
  ];
  customTitleKeySource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom-title-key/custom-title-key.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom-title-key/custom-title-key.component.ts') },
  ];
  searchFilterSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./search-filter/search-filter.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./search-filter/search-filter.component.ts') },
  ];

  operateBtnSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./operate-btn/operate-btn.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./operate-btn/operate-btn.component.ts') },
  ];

  customizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./customize/customize.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./customize/customize.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./customize/customize.component.scss') },
  ];

  draggableSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./draggable/draggable.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./draggable/draggable.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./draggable/draggable.component.scss') },
  ];
  checkControlSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./check-control/check-control.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./check-control/check-control.component.ts') },
  ];
  virtualScrollSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./virtual-scroll/virtual-scroll.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./virtual-scroll/virtual-scroll.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./virtual-scroll/virtual-scroll.component.css') },
  ];
  withoutAnimationSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./without-animation/without-animation.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./without-animation/without-animation.component.ts') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.tree.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.tree.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'merge-node', value: values['merge-node'] },
      { dAnchorLink: 'custom-loading', value: values['custom-loading'] },
      { dAnchorLink: 'custom-display-field', value: values['custom-display-field'] },
      { dAnchorLink: 'checkable-tree', value: values['checkable-tree'] },
      { dAnchorLink: 'operation-button', value: values['operation-button'] },
      { dAnchorLink: 'search-filtering', value: values['search-filtering'] },
      { dAnchorLink: 'custom-icon', value: values['custom-icon'] },
      { dAnchorLink: 'drag-and-drop-tree', value: values['drag-and-drop-tree'] },
      { dAnchorLink: 'check-control-tree', value: values['check-control-tree'] },
      { dAnchorLink: 'tree-factory', value: values['tree-factory'] },
      { dAnchorLink: 'virtual-scroll', value: values['virtual-scroll'] },
      { dAnchorLink: 'without-animation', value: values['without-animation'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
