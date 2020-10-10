import { Component, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'd-tree-demo',
  templateUrl: './tree-demo.component.html'
})
export class TreeDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
  ];
  customLoadingSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./custom-loading/custom-loading.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./custom-loading/custom-loading.component.ts')},
    {title: 'SVG-TS', language: 'typescript', code:  require('!!raw-loader!./custom-loading/custom-loading-svg.ts')}
  ];

  checkableSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./checkable/checkable.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./checkable/checkable.component.ts')},
  ];
  customTitleKeySource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./custom-title-key/custom-title-key.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./custom-title-key/custom-title-key.component.ts')},
  ];
  searchFilterSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./search-filter/search-filter.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./search-filter/search-filter.component.ts')},
  ];

  operateBtnSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./operate-btn/operate-btn.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./operate-btn/operate-btn.component.ts')}
  ];

  customizeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./customize/customize.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./customize/customize.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./customize/customize.component.scss')}
  ];

  draggableSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./draggable/draggable.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./draggable/draggable.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./draggable/draggable.component.scss')}
  ];
  checkControlSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./check-control/check-control.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./check-control/check-control.component.ts')}
  ];
  virtualScrollSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./virtual-scroll/virtual-scroll.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./virtual-scroll/virtual-scroll.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./virtual-scroll/virtual-scroll.component.css')}
  ];
  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'custom-loading', value: '自定义loading模板'},
    { dAnchorLink: 'custom-display-field', value: '自定显示字段'},
    { dAnchorLink: 'checkable-tree', value: '可勾选树'},
    { dAnchorLink: 'operation-button', value: '操作按钮'},
    { dAnchorLink: 'search-filtering', value: '搜索过滤'},
    { dAnchorLink: 'custom-icon', value: '自定义图标'},
    { dAnchorLink: 'drag-and-drop-tree', value: '可拖拽树'},
    { dAnchorLink: 'check-control-tree', value: '控制父子check关系'},
    { dAnchorLink: 'virtual-scroll', value: '大数据量可操作树'}
  ];
  constructor() { }

}
