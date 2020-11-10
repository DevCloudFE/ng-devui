import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-demo-dropdown',
    templateUrl: './dropdown-demo.component.html'
})
export class DropdownDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
  ];
  hoverSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./hover/hover.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./hover/hover.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./hover/hover.component.scss')}
  ];
  focusSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./focus/focus.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./focus/focus.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./focus/focus.component.scss')}
  ];
  closeScopeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./close-scope/close-scope.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./close-scope/close-scope.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./close-scope/close-scope.component.scss')}
  ];
  appendToBodySource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./append-to-body/append-to-body.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./append-to-body/append-to-body.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./append-to-body/append-to-body.component.scss')}
  ];
  addIconSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./add-icon/add-icon.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./add-icon/add-icon.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./add-icon/add-icon.component.scss')}
  ];
  multiLevelSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./multi-level/multi-level.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./multi-level/multi-level.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./multi-level/multi-level.component.css')}
  ];

  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'turn-off-trigger-point-settings', value: '关闭触发点设置'},
    { dAnchorLink: 'suspension-drop-down', value: '悬浮下拉'},
    { dAnchorLink: 'auto-expand-and-auto-focus', value: '自动展开和自动聚焦'},
    { dAnchorLink: 'when-using-appendtobody', value: '设置展开位置处理'},
    { dAnchorLink: 'add-icon', value: '支持添加图标'},
    { dAnchorLink: 'multi-level-drop-down-menu', value: '多级下拉菜单'}
  ];

  constructor() {

  }
}
