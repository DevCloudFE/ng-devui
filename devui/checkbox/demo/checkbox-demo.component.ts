import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  templateUrl: './checkbox-demo.component.html',
})

export class CheckBoxDemoComponent {
  checkboxDemoBasic: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/checkbox-basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/checkbox-basic.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./basic/checkbox-basic.component.css')}
  ];

  checkboxDemoGroup: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./group/checkbox-group-basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./group/checkbox-group-basic.component.ts')},
  ];

  conditionChangeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./condition-change/condition-change.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./condition-change/condition-change.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./condition-change/condition-change.component.scss')},
  ];

  conditionGroupSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./condition-group/condition-group.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./condition-group/condition-group.component.ts')},
  ];

  navItems = [
    { dAnchorLink: 'checkbox-basic', value: '基本用法'},
    { dAnchorLink: 'tabs-group', value: '使用CheckBoxGroup'},
    { dAnchorLink: 'condition-change', value: 'checkbox根据条件终止切换状态'},
    { dAnchorLink: 'condition-condition', value: 'checkbox-group根据条件终止切换状态'},
  ];
  constructor() {
  }
}
