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
    {title: 'SCSS', language: 'css',  code:  require('!!raw-loader!./custom-search/custom-search.component.css')},
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
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./allow-clear-value/allow-clear-value.component.css')},
  ];
  CustomAreaComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./custom-area/custom-area.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./custom-area/custom-area.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./custom-area/custom-area.component.css')},
  ];
  CustomAreaDirectionComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./custom-area-direction/custom-area-direction.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./custom-area-direction/custom-area-direction.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./custom-area-direction/custom-area-direction.component.scss')},
  ];
  AppendToBodyComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./append-to-body/append-to-body.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./append-to-body/append-to-body.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./append-to-body/append-to-body.component.css')},
  ];
  DisabledComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./disabled/disabled.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./disabled/disabled.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./disabled/disabled.component.css')},
  ];
  LabelizationComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./labelization/labelization.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./labelization/labelization.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./labelization/labelization.component.css')},
  ];
  ObjectFilterComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./object-filter/object-filter.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./object-filter/object-filter.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./object-filter/object-filter.component.css')},
  ];
  LazyLoadVirtualScrollComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:
      require('!!raw-loader!./lazy-load-virtual-scroll/lazy-load-virtual-scroll.component.html')},
    {title: 'TS', language: 'typescript', code:
      require('!!raw-loader!./lazy-load-virtual-scroll/lazy-load-virtual-scroll.component.ts')},
    {title: 'SCSS', language: 'css', code:
      require('!!raw-loader!./lazy-load-virtual-scroll/lazy-load-virtual-scroll.component.css')},
  ];
  LoadingComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./loading/loading.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./loading/loading.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./loading/loading.component.css')},
  ];
  UserLimitSelectedNumberComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:
      require('!!raw-loader!./user-limit-selected-number/user-limit-selected-number.component.html')},
    {title: 'TS', language: 'typescript', code:
      require('!!raw-loader!./user-limit-selected-number/user-limit-selected-number.component.ts')},
    {title: 'SCSS', language: 'css', code:
      require('!!raw-loader!./user-limit-selected-number/user-limit-selected-number.component.css')},
  ];
  MultiKeepOrderComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./multi-keep-order/multi-keep-order.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./multi-keep-order/multi-keep-order.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./multi-keep-order/multi-keep-order.component.css')},
  ];
  UserSearchNLazyLoadComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./user-search-n-lazyload/user-search-n-lazyload.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./user-search-n-lazyload/user-search-n-lazyload.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./user-search-n-lazyload/user-search-n-lazyload.component.css')},
  ];
  UserMailSearchComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./user-mail-search/user-mail-search.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./user-mail-search/user-mail-search.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./user-mail-search/user-mail-search.component.css')},
  ];
  ModelValueComponent: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./model-value/model-value.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./model-value/model-value.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./model-value/model-value.component.css')},
    {title: 'ParseFromPipe', language: 'typescript', code:  require('!!raw-loader!./model-value/parse-from.pipe.ts')},
    {title: 'MapToPipe', language: 'typescript', code:  require('!!raw-loader!./model-value/map-to.pipe.ts')},
  ];
  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'object-filter', value: '使用对象'},
    { dAnchorLink: 'custom-search', value: '自定义搜索功能'},
    { dAnchorLink: 'select-all', value: '全选下拉选项'},
    { dAnchorLink: 'select-template', value: '自定义模板'},
    { dAnchorLink: 'labelization', value: '标签化'},
    { dAnchorLink: 'disabled', value: '禁用'},
    { dAnchorLink: 'allow-clear-value', value: '允许清空值'},
    { dAnchorLink: 'append-to-body', value: '附着到Body上'},
    { dAnchorLink: 'lazy-load-virtual-scroll', value: '虚拟滚动 或 懒加载'},
    { dAnchorLink: 'async-loading', value: '异步加载显示加载中'},
    { dAnchorLink: 'custom-area', value: '自定义区域'},
    { dAnchorLink: 'custom-area-direction', value: '自定义区域方向和选中'},
    { dAnchorLink: 'multi-keep-order', value: '设置已选项顺序源数组顺序或选中顺序'},
    { dAnchorLink: 'user-limit-selected-number', value: '用户场景：限制选中个数'},
    { dAnchorLink: 'user-search-n-lazyload', value: '用户场景：自定义搜索的懒加载'},
    { dAnchorLink: 'user-mail-search', value: '用户场景：自定义搜索和模板结合 —— 邮箱搜索'},
    { dAnchorLink: 'model-value', value: 'ngModel值处理'}
  ];
    constructor() { }

}
