import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-select-demo',
  templateUrl: './select-demo.component.html',
})
export class SelectDemoComponent implements OnInit, OnDestroy {
  SelectBasicComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/select-basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/select-basic.component.ts') },
  ];
  SelectObjectComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom-search/custom-search.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom-search/custom-search.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./custom-search/custom-search.component.css') },
  ];
  SelectAllComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./select-all/select-all.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./select-all/select-all.component.ts') },
  ];
  SelectTemplateComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./item-template/select-template.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./item-template/select-template.component.ts') },
  ];
  AllowClearValueComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./allow-clear-value/allow-clear-value.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./allow-clear-value/allow-clear-value.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./allow-clear-value/allow-clear-value.component.css') },
  ];
  CustomAreaComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom-area/custom-area.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom-area/custom-area.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./custom-area/custom-area.component.css') },
  ];
  CustomAreaDirectionComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom-area-direction/custom-area-direction.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom-area-direction/custom-area-direction.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./custom-area-direction/custom-area-direction.component.scss') },
  ];
  AppendToBodyComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./append-to-body/append-to-body.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./append-to-body/append-to-body.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./append-to-body/append-to-body.component.css') },
  ];
  DisabledComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./disabled/disabled.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./disabled/disabled.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./disabled/disabled.component.css') },
  ];
  LabelizationComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./labelization/labelization.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./labelization/labelization.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./labelization/labelization.component.css') },
  ];
  ObjectFilterComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./object-filter/object-filter.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./object-filter/object-filter.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./object-filter/object-filter.component.css') },
  ];
  LazyLoadVirtualScrollComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./lazy-load-virtual-scroll/lazy-load-virtual-scroll.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./lazy-load-virtual-scroll/lazy-load-virtual-scroll.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./lazy-load-virtual-scroll/lazy-load-virtual-scroll.component.scss') },
  ];
  LoadingComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./loading/loading.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./loading/loading.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./loading/loading.component.css') },
  ];
  UserLimitSelectedNumberComponent: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('!!raw-loader!./user-limit-selected-number/user-limit-selected-number.component.html'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./user-limit-selected-number/user-limit-selected-number.component.ts'),
    },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./user-limit-selected-number/user-limit-selected-number.component.css') },
  ];
  MultiKeepOrderComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./multi-keep-order/multi-keep-order.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./multi-keep-order/multi-keep-order.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./multi-keep-order/multi-keep-order.component.css') },
  ];
  UserSearchNLazyLoadComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./user-search-n-lazyload/user-search-n-lazyload.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./user-search-n-lazyload/user-search-n-lazyload.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./user-search-n-lazyload/user-search-n-lazyload.component.css') },
  ];
  UserMailSearchComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./user-mail-search/user-mail-search.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./user-mail-search/user-mail-search.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./user-mail-search/user-mail-search.component.css') },
  ];
  ModelValueComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./model-value/model-value.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./model-value/model-value.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./model-value/model-value.component.css') },
    { title: 'ParseFromPipe', language: 'typescript', code: require('!!raw-loader!./model-value/parse-from.pipe.ts') },
    { title: 'MapToPipe', language: 'typescript', code: require('!!raw-loader!./model-value/map-to.pipe.ts') },
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
      { dAnchorLink: 'labelization', value: values['labelization'] },
      { dAnchorLink: 'disabled', value: values['disabled'] },
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
