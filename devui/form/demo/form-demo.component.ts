import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';

@Component({
  selector: 'd-form-demo',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.scss'],
})
export class FormDemoComponent {
  BasicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./basic/basic.component.css') },
  ];
  LabelHorizontalSource: Array<DevuiSourceData> = [
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./label-horizontal/label-horizontal.component.ts') },
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./label-horizontal/label-horizontal.component.html') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./label-horizontal/label-horizontal.component.css') },
  ];
  ModalSource: Array<DevuiSourceData> = [
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./modal/modal.component.ts') },
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./modal/modal.component.html') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./modal/modal.component.css') },
    { title: 'ModalOne HTML', language: 'xml', code: require('!!raw-loader!./modal-one/modal-one.component.html') },
    { title: 'ModalOne TS', language: 'typescript', code: require('!!raw-loader!./modal-one/modal-one.component.ts') },
  ];
  MultiColSource: Array<DevuiSourceData> = [
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./multi-col/multi-col.component.ts') },
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./multi-col/multi-col.component.html') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./multi-col/multi-col.component.css') },
  ];
  FilterSource: Array<DevuiSourceData> = [
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./filter/filter.component.ts') },
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./filter/filter.component.html') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./filter/filter.component.scss') },
  ];
  ValidateTemplateSource: Array<DevuiSourceData> = [
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./validate-template/validate-template.component.ts') },
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./validate-template/validate-template.component.html') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./validate-template/validate-template.component.scss') },
  ];
  ValidateReactiveSource: Array<DevuiSourceData> = [
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./validate-reactive/validate-reactive.component.ts') },
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./validate-reactive/validate-reactive.component.html') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./validate-reactive/validate-reactive.component.scss') },
  ];
  ValidateCoordinatedSource: Array<DevuiSourceData> = [
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./validate-coordinated/validate-coordinated.component.ts') },
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./validate-coordinated/validate-coordinated.component.html') },
    { title: 'CSS', language: 'css', code: require('!!raw-loader!./validate-coordinated/validate-coordinated.component.css') },
  ];
  ValidateDynamicRuleSource: Array<DevuiSourceData> = [
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./validate-dynamic-rule/validate-dynamic-rule.component.ts') },
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./validate-dynamic-rule/validate-dynamic-rule.component.html') },
    { title: 'CSS', language: 'css', code: require('!!raw-loader!./validate-dynamic-rule/validate-dynamic-rule.component.css') },
  ];
  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法' },
    { dAnchorLink: 'demo-label-horizontal', value: 'label横向排列' },
    { dAnchorLink: 'demo-modal', value: '弹框表单' },
    { dAnchorLink: 'demo-multi-col', value: '多列表单' },
    { dAnchorLink: 'demo-filter', value: '表单过滤' },
    { dAnchorLink: 'demo-validate-template', value: '模板驱动表单验证（推荐）' },
    { dAnchorLink: 'demo-validate-reactive', value: '响应式表单验证' },
    // { dAnchorLink: 'demo-validate-coordinated', value: '表单联动' },
    // { dAnchorLink: 'demo-validate-dynamic-rule', value: '动态校验规则' },
  ];
  constructor() {}
}
