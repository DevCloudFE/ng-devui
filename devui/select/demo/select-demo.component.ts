import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-select-demo',
  templateUrl: './select-demo.component.html',
  styleUrls: ['./select-demo.component.scss'],
})
export class SelectDemoComponent implements OnInit, OnDestroy {
  SelectBasicComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/select-basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/select-basic.component.ts?raw') },
  ];
  SelectObjectComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom-search/custom-search.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom-search/custom-search.component.ts?raw') },
  ];
  SelectAllComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./select-all/select-all.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./select-all/select-all.component.ts?raw') },
  ];
  SelectTemplateComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./item-template/select-template.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./item-template/select-template.component.ts?raw') },
  ];
  AllowClearValueComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./allow-clear-value/allow-clear-value.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./allow-clear-value/allow-clear-value.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./allow-clear-value/allow-clear-value.component.css?raw') },
  ];
  CustomAreaComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom-area/custom-area.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom-area/custom-area.component.ts?raw') },
  ];
  CustomAreaDirectionComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom-area-direction/custom-area-direction.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom-area-direction/custom-area-direction.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./custom-area-direction/custom-area-direction.component.scss?raw') },
  ];
  AppendToBodyComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./append-to-body/append-to-body.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./append-to-body/append-to-body.component.ts?raw') },
  ];
  DisabledComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./disabled/disabled.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./disabled/disabled.component.ts?raw') },
  ];
  LabelizationComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./labelization/labelization.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./labelization/labelization.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./labelization/labelization.component.css?raw') },
  ];
  ObjectFilterComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./object-filter/object-filter.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./object-filter/object-filter.component.ts?raw') },
  ];
  LazyLoadVirtualScrollComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./lazy-load-virtual-scroll/lazy-load-virtual-scroll.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./lazy-load-virtual-scroll/lazy-load-virtual-scroll.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./lazy-load-virtual-scroll/lazy-load-virtual-scroll.component.scss?raw') },
  ];
  LoadingComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./loading/loading.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./loading/loading.component.ts?raw') },
  ];
  UserLimitSelectedNumberComponent: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('./user-limit-selected-number/user-limit-selected-number.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./user-limit-selected-number/user-limit-selected-number.component.ts?raw'),
    },
  ];
  MultiKeepOrderComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./multi-keep-order/multi-keep-order.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./multi-keep-order/multi-keep-order.component.ts?raw') },
  ];
  UserSearchNLazyLoadComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./user-search-n-lazyload/user-search-n-lazyload.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./user-search-n-lazyload/user-search-n-lazyload.component.ts?raw') },
  ];
  UserMailSearchComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./user-mail-search/user-mail-search.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./user-mail-search/user-mail-search.component.ts?raw') },
  ];
  ModelValueComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./model-value/model-value.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./model-value/model-value.component.ts?raw') },
    { title: 'ParseFromPipe', language: 'typescript', code: require('./model-value/parse-from.pipe.ts?raw') },
    { title: 'MapToPipe', language: 'typescript', code: require('./model-value/map-to.pipe.ts?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.select.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.select.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'object-filter', value: values['object-filter'] },
      { dAnchorLink: 'custom-search', value: values['custom-search'] },
      { dAnchorLink: 'select-all', value: values['select-all'] },
      { dAnchorLink: 'select-template', value: values['select-template'] },
      { dAnchorLink: 'labelization', value: values.labelization },
      { dAnchorLink: 'disabled', value: values.disabled },
      { dAnchorLink: 'allow-clear-value', value: values['allow-clear-value'] },
      { dAnchorLink: 'append-to-body', value: values['append-to-body'] },
      { dAnchorLink: 'lazy-load-virtual-scroll', value: values['lazy-load-virtual-scroll'] },
      { dAnchorLink: 'async-loading', value: values['async-loading'] },
      { dAnchorLink: 'custom-area', value: values['custom-area'] },
      { dAnchorLink: 'custom-area-direction', value: values['custom-area-direction'] },
      { dAnchorLink: 'multi-keep-order', value: values['multi-keep-order'] },
      { dAnchorLink: 'user-limit-selected-number', value: values['user-limit-selected-number'] },
      { dAnchorLink: 'user-search-n-lazyload', value: values['user-search-n-lazyload'] },
      { dAnchorLink: 'user-mail-search', value: values['user-mail-search'] },
      { dAnchorLink: 'model-value', value: values['model-value'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
