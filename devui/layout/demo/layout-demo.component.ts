import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-demo-input-number',
  templateUrl: './layout-demo.component.html',
  styleUrls: ['./layout-demo.component.scss'],
})
export class LayoutDemoComponent implements OnInit, OnDestroy {
  GridBasic: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./grid/grid-basic/grid-basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./grid/grid-basic/grid-basic.component.ts?raw') },
  ];
  GridGutter: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./grid/grid-gutter/grid-gutter.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./grid/grid-gutter/grid-gutter.component.ts?raw') },
  ];
  GridSpace: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./grid/grid-space/grid-space.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./grid/grid-space/grid-space.component.ts?raw') },
  ];
  GridOffset: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./grid/grid-offset/grid-offset.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./grid/grid-offset/grid-offset.component.ts?raw') },
  ];
  FlexAlignjustify: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./grid/flex-align-justify/flex-align-justify.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./grid/flex-align-justify/flex-align-justify.component.ts?raw') },
  ];
  FlexOrder: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./grid/flex-order/flex-order.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./grid/flex-order/flex-order.component.ts?raw') },
  ];
  AloneFlex: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./grid/alone-flex/alone-flex.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./grid/alone-flex/alone-flex.component.ts?raw') },
  ];
  AloneSpaceGutter: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./grid/alone-space-gutter/alone-space-gutter.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./grid/alone-space-gutter/alone-space-gutter.component.ts?raw') },
  ];
  ClassDemo: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./grid/class-demo/class-demo.component.html?raw') },
    { title: 'SCSS', language: 'css', code: require('./grid/class-demo/class-demo.component.scss?raw') },
    { title: 'TS', language: 'typescript', code: require('./grid/class-demo/class-demo.component.ts?raw') },
  ];
  StyleDemo: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./grid/style-demo/style-demo.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./grid/style-demo/style-demo.component.ts?raw') },
  ];

  LayoutBasic: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/layout-basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/layout-basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/layout-basic.component.scss?raw') },
  ];

  LayoutTop: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./top/top.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./top/top.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./top/top.component.scss?raw') },
  ];

  LayoutTopAside: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./top-aside/top-aside.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./top-aside/top-aside.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./top-aside/top-aside.component.scss?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.layout.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.layout.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'gutter', value: values.gutter },
      { dAnchorLink: 'space', value: values.space },
      { dAnchorLink: 'offset', value: values.offset },
      { dAnchorLink: 'align-justify', value: values['align-justify'] },
      { dAnchorLink: 'order', value: values.order },
      { dAnchorLink: 'flex', value: values.flex },
      { dAnchorLink: 'space-gutter', value: values['space-gutter'] },
      { dAnchorLink: 'class', value: values.class },
      { dAnchorLink: 'style', value: values.style },
      { dAnchorLink: 'layout-container', value: values['layout-container'] },
      { dAnchorLink: 'layout-container-scenario1', value: values['layout-container-scenario1'] },
      { dAnchorLink: 'layout-container-scenario2', value: values['layout-container-scenario2'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
