import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-demo-tabs',
  templateUrl: './tabs-demo.component.html',
})
export class TabsDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
  ];

  withoutContentSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./without-content/without-content.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./without-content/without-content.component.ts?raw') },
  ];

  beforeChangeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./before-change/before-change.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./before-change/before-change.component.ts?raw') },
  ];
  customSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom/custom.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom/custom.component.ts?raw') },
  ];
  typePillsSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./type-pills/type-pills.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./type-pills/type-pills.component.ts?raw') },
  ];
  typeOptionsSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./type-options/type-options.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./type-options/type-options.component.ts?raw') },
  ];
  typeSliderSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./type-slider/type-slider.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./type-slider/type-slider.component.ts?raw') },
  ];
  typeWrappedSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./type-wrapped/type-wrapped.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./type-wrapped/type-wrapped.component.ts?raw') },
  ];
  sizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./size/size.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./size/size.component.ts?raw') },
  ];
  AddDeleteSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./add-delete/add-delete.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./add-delete/add-delete.component.ts?raw') },
  ];
  BigDataSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./big-data/big-data.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./big-data/big-data.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./big-data/big-data.component.scss?raw') },
  ];
  ConfigurableSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./configurable-tabs/configurable-tabs.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./configurable-tabs/configurable-tabs.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./configurable-tabs/configurable-tabs.component.scss?raw') },
    {
      title: 'tabs-transfer HTML',
      language: 'xml',
      code: require('./configurable-tabs/tabs-transfer/tabs-transfer.component.html?raw'),
    },
    {
      title: 'tabs-transfer TS',
      language: 'typescript',
      code: require('./configurable-tabs/tabs-transfer/tabs-transfer.component.ts?raw'),
    },
  ];
  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.tabs.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.tabs.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'type-pills', value: values['type-pills'] },
      { dAnchorLink: 'type-options', value: values['type-options'] },
      { dAnchorLink: 'type-slider', value: values['type-slider'] },
      { dAnchorLink: 'type-wrapped', value: values['type-wrapped'] },
      { dAnchorLink: 'size', value: values.size },
      { dAnchorLink: 'no-set-content', value: values['no-set-content'] },
      { dAnchorLink: 'custom-template', value: values['custom-template'] },
      { dAnchorLink: 'intercept-tab-switch', value: values['intercept-tab-switch'] },
      { dAnchorLink: 'add-delete', value: values['add-delete'] },
      { dAnchorLink: 'big-data', value: values['big-data'] },
      { dAnchorLink: 'custom-tabs-display-and-arrangement', value: values['custom-tabs-display-and-arrangement'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
