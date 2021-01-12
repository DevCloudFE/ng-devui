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
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./basic/basic.component.scss') },
  ];

  treeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./tree/tree.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./tree/tree.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./tree/tree.component.scss') },
  ];

  followSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./follow/follow.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./follow/follow.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./follow/follow.component.scss') },
  ];

  switchSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./switch/switch.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./switch/switch.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./switch/switch.component.scss') },
  ];

  positionSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./position/position.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./position/position.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./position/position.component.scss') },
  ];

  dropScrollSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./drop-scroll/drop-scroll.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./drop-scroll/drop-scroll.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./drop-scroll/drop-scroll.component.scss') },
  ];
  originPlaceholderSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./origin-placeholder/origin-placeholder.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./origin-placeholder/origin-placeholder.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./origin-placeholder/origin-placeholder.component.scss') },
  ];
  batchDragSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./batch-drag/batch-drag.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./batch-drag/batch-drag.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./batch-drag/batch-drag.component.scss') },
  ];

  crossDimensionSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./cross-dimension/cross-dimension.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./cross-dimension/cross-dimension.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./cross-dimension/cross-dimension.component.scss') },
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
