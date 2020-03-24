import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-select-demo',
    templateUrl: './select-demo.component.html',
})
export class SelectDemoComponent {
  SelectBasicComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/select-basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/select-basic.component.ts')},
  ];
  SelectObjectComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./custom-search/custom-search.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./custom-search/custom-search.component.ts')},
    {title: 'CSS', language: 'css',  code:  require('!!raw-loader!./custom-search/custom-search.component.css')},
  ];
  SelectAllComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./select-all/select-all.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./select-all/select-all.component.ts')},
  ];
  SelectTemplateComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./item-template/select-template.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./item-template/select-template.component.ts')},
  ];
  AllowClearValueComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./allow-clear-value/allow-clear-value.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./allow-clear-value/allow-clear-value.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./allow-clear-value/allow-clear-value.component.css')},
  ];
  CustomAreaComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./custom-area/custom-area.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./custom-area/custom-area.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./custom-area/custom-area.component.css')},
  ];
  CustomAreaDirectionComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./custom-area-direction/custom-area-direction.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./custom-area-direction/custom-area-direction.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./custom-area-direction/custom-area-direction.component.css')},
  ];
  AppendToBodyComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./append-to-body/append-to-body.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./append-to-body/append-to-body.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./append-to-body/append-to-body.component.css')},
  ];
  DisabledComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./disabled/disabled.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./disabled/disabled.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./disabled/disabled.component.css')},
  ];
  LabelizationComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./labelization/labelization.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./labelization/labelization.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./labelization/labelization.component.css')},
  ];
  ObjectFilterComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./object-filter/object-filter.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./object-filter/object-filter.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./object-filter/object-filter.component.css')},
  ];
  LazyLoadVirtualScrollComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:
      require('!!raw-loader!./lazy-load-virtual-scroll/lazy-load-virtual-scroll.component.html')},
    {title: 'TS', language: 'typescript', code:
      require('!!raw-loader!./lazy-load-virtual-scroll/lazy-load-virtual-scroll.component.ts')},
    {title: 'CSS', language: 'css', code:
      require('!!raw-loader!./lazy-load-virtual-scroll/lazy-load-virtual-scroll.component.css')},
  ];
  LoadingComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./loading/loading.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./loading/loading.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./loading/loading.component.css')},
  ];
  UserLimitSelectedNumberComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:
      require('!!raw-loader!./user-limit-selected-number/user-limit-selected-number.component.html')},
    {title: 'TS', language: 'typescript', code:
      require('!!raw-loader!./user-limit-selected-number/user-limit-selected-number.component.ts')},
    {title: 'CSS', language: 'css', code:
      require('!!raw-loader!./user-limit-selected-number/user-limit-selected-number.component.css')},
  ];
  MultiKeepOrderComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./multi-keep-order/multi-keep-order.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./multi-keep-order/multi-keep-order.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./multi-keep-order/multi-keep-order.component.css')},
  ];
  UserSearchNLazyLoadComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./user-search-n-lazyload/user-search-n-lazyload.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./user-search-n-lazyload/user-search-n-lazyload.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./user-search-n-lazyload/user-search-n-lazyload.component.css')},
  ];
  UserMailSearchComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./user-mail-search/user-mail-search.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./user-mail-search/user-mail-search.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./user-mail-search/user-mail-search.component.css')},
  ];
    constructor() { }

}
