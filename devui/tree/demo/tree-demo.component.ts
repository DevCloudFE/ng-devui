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
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
  ];
  treeFactorySource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./tree-factory/tree-factory.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./tree-factory/tree-factory.component.ts?raw') },
  ];
  MergeNodeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./merge-node/merge-node.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./merge-node/merge-node.component.ts?raw') },
  ];
  customLoadingSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom-loading/custom-loading.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom-loading/custom-loading.component.ts?raw') },
    { title: 'SVG-TS', language: 'typescript', code: require('./custom-loading/custom-loading-svg.ts?raw') },
  ];

  checkableSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./checkable/checkable.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./checkable/checkable.component.ts?raw') },
  ];
  customTitleKeySource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom-title-key/custom-title-key.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom-title-key/custom-title-key.component.ts?raw') },
  ];
  searchFilterSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./search-filter/search-filter.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./search-filter/search-filter.component.ts?raw') },
  ];

  operateBtnSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./operate-btn/operate-btn.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./operate-btn/operate-btn.component.ts?raw') },
  ];

  customizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./customize/customize.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./customize/customize.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./customize/customize.component.scss?raw') },
  ];

  draggableSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./draggable/draggable.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./draggable/draggable.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./draggable/draggable.component.scss?raw') },
  ];
  checkControlSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./check-control/check-control.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./check-control/check-control.component.ts?raw') },
  ];
  virtualScrollSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./virtual-scroll/virtual-scroll.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./virtual-scroll/virtual-scroll.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./virtual-scroll/virtual-scroll.component.css?raw') },
  ];
  withoutAnimationSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./without-animation/without-animation.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./without-animation/without-animation.component.ts?raw') },
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
