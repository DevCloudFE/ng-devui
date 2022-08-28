import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-demo-dragdrop',
  templateUrl: './dragdrop-demo.component.html',
})
export class DragDropDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.scss?raw') },
  ];

  treeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./tree/tree.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./tree/tree.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./tree/tree.component.scss?raw') },
  ];

  followSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./follow/follow.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./follow/follow.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./follow/follow.component.scss?raw') },
  ];

  switchSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./switch/switch.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./switch/switch.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./switch/switch.component.scss?raw') },
  ];

  positionSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./position/position.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./position/position.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./position/position.component.scss?raw') },
  ];

  dropScrollSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./drop-scroll/drop-scroll.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./drop-scroll/drop-scroll.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./drop-scroll/drop-scroll.component.scss?raw') },
  ];
  originPlaceholderSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./origin-placeholder/origin-placeholder.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./origin-placeholder/origin-placeholder.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./origin-placeholder/origin-placeholder.component.scss?raw') },
  ];
  batchDragSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./batch-drag/batch-drag.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./batch-drag/batch-drag.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./batch-drag/batch-drag.component.scss?raw') },
  ];

  crossDimensionSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./cross-dimension/cross-dimension.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./cross-dimension/cross-dimension.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./cross-dimension/cross-dimension.component.scss?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.dragdrop.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.dragdrop.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'multi-level-tree-drag', value: values['multi-level-tree-drag'] },
      { dAnchorLink: 'drag-entity-elements-to-follow', value: values['drag-entity-elements-to-follow'] },
      { dAnchorLink: 'cross-edge-switching', value: values['cross-edge-switching'] },
      { dAnchorLink: 'external-location', value: values['external-location'] },
      { dAnchorLink: 'drag-and-roll-container-enhancement', value: values['drag-and-roll-container-enhancement'] },
      { dAnchorLink: 'source-placeholder', value: values['source-placeholder'] },
      { dAnchorLink: 'batch-drag-and-drop', value: values['batch-drag-and-drop'] },
      { dAnchorLink: '2D-drag-and-drop-preview', value: values['2D-drag-and-drop-preview'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
