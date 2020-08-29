import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { Component } from '@angular/core';
@Component({
  selector: 'd-accordion-demo',
  templateUrl: './accordion-demo.component.html',
})
export class  AccordionDemoComponent {
  AccordionDemoBasic: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];

  AccordionDemolink: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./link/link.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./link/link.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./link/link.component.css')}
  ];

  AccordionDemoTemplate: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./template/template.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./template/template.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./template/template.component.scss')}
  ];

  AccordionDemoInnerListTemplate: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml',
    code:  require('!!raw-loader!./inner-list-template/inner-list-template.component.html')},
    {title: 'TS', language: 'typescript',
    code:  require('!!raw-loader!./inner-list-template/inner-list-template.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./inner-list-template/inner-list-template.component.css')}
  ];
  AccordionDemoMultiLevel: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml',
    code:  require('!!raw-loader!./multi-level/multi-level.component.html')},
    {title: 'TS', language: 'typescript',
    code:  require('!!raw-loader!./multi-level/multi-level.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./multi-level/multi-level.component.css')}
  ];
  AccordionDemoChangeKey: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml',
    code:  require('!!raw-loader!./change-key/change-key.component.html')},
    {title: 'TS', language: 'typescript',
    code:  require('!!raw-loader!./change-key/change-key.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./change-key/change-key.component.css')}
  ];
  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'use-built-in-routing-and-link-types', value: '内置路由和链接类型'},
    { dAnchorLink: 'using-templates', value: '使用模板'},
    { dAnchorLink: 'compound-level-and-auto-expand', value: '复合层级和自动展开'},
    { dAnchorLink: 'change-values', value: '改变键值'}
  ];
}
