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
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./label-horizontal/label-horizontal.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./label-horizontal/label-horizontal.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./label-horizontal/label-horizontal.component.css') },
  ];
  ModalSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./modal/modal.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./modal/modal.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./modal/modal.component.css') },
    { title: 'ModalOne HTML', language: 'xml', code: require('!!raw-loader!./modal-one/modal-one.component.html') },
    { title: 'ModalOne TS', language: 'typescript', code: require('!!raw-loader!./modal-one/modal-one.component.ts') },
  ];
  MultiColSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./multi-col/multi-col.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./multi-col/multi-col.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./multi-col/multi-col.component.css') },
  ];
  FilterSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./filter/filter.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./filter/filter.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./filter/filter.component.scss') },
  ];

  InnerValidatorSource: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('!!raw-loader!./validate-template/inner-validator/inner-validator.component.html')
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./validate-template/inner-validator/inner-validator.component.ts')
    },
  ];
  CustomValidatorSource: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('!!raw-loader!./validate-template/custom-validator/custom-validator.component.html')
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./validate-template/custom-validator/custom-validator.component.ts')
    },
  ];
  ErrorStrategySource: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('!!raw-loader!./validate-template/error-strategy/error-strategy.component.html')
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./validate-template/error-strategy/error-strategy.component.ts')
    },
  ];
  CustomMessageShowSource: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('!!raw-loader!./validate-template/custom-message-show/custom-message-show.component.html')
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./validate-template/custom-message-show/custom-message-show.component.ts')
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('!!raw-loader!./validate-template/custom-message-show/custom-message-show.component.scss')
    },
  ];
  ValidateTemplateForm: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('!!raw-loader!./validate-template/validate-template-form/validate-template-form.component.html')
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./validate-template/validate-template-form/validate-template-form.component.ts')
    },
  ];
  UserRegisterShowSource: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('!!raw-loader!./validate-template/user-register/user-register.component.html')
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./validate-template/user-register/user-register.component.ts')
    },
  ];
  ValidateTemplateCrossComponent: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('!!raw-loader!./validate-template/validate-cross-component/validate-cross-component.component.html')
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./validate-template/validate-cross-component/validate-cross-component.component.ts')
    },
    {
      title: 'child-group.html',
      language: 'xml',
      code: require('!!raw-loader!./validate-template/validate-cross-component/child-form/child-form.component.html')
    },
    {
      title: 'child-group.ts',
      language: 'typescript',
      code: require('!!raw-loader!./validate-template/validate-cross-component/child-form/child-form.component.ts')
    },
  ];

  ReactiveFormCrossComponent: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('!!raw-loader!./validate-cross-component/validate-cross-component.component.html')
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./validate-cross-component/validate-cross-component.component.ts')
    },
    {
      title: 'child.html',
      language: 'xml',
      code: require('!!raw-loader!./validate-cross-component/child-control/child-user.component.html')
    },
    {
      title: 'child.ts',
      language: 'typescript',
      code: require('!!raw-loader!./validate-cross-component/child-control/child-user.component.ts')
    },
  ];

  ValidateCustomStatus: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom-status/custom-status.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom-status/custom-status.component.ts') },
  ];

  ValidateReactiveSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./validate-reactive/validate-reactive.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./validate-reactive/validate-reactive.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./validate-reactive/validate-reactive.component.scss') },
  ];

  ValidateSyncSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./validate-sync/validate-sync.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./validate-sync/validate-sync.component.ts') },
  ];

  ValidateCoordinatedSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./validate-coordinated/validate-coordinated.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./validate-coordinated/validate-coordinated.component.ts') }
  ];
  ValidateDynamicRuleSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./validate-dynamic-rule/validate-dynamic-rule.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./validate-dynamic-rule/validate-dynamic-rule.component.ts') }
  ];
  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法' },
    { dAnchorLink: 'demo-label-horizontal', value: 'label横向排列' },
    { dAnchorLink: 'demo-modal', value: '弹框表单' },
    { dAnchorLink: 'demo-multi-col', value: '多列表单' },
    { dAnchorLink: 'demo-filter', value: '表单过滤' },
    { dAnchorLink: 'demo-validate-template', value: '模板驱动表单验证（推荐）' },
    { dAnchorLink: 'demo-validate-reactive', value: '响应式表单验证' },
    { dAnchorLink: 'demo-custom-status', value: '指定表单状态' },
    { dAnchorLink: 'demo-validate-sync', value: '表单协同验证' },
    { dAnchorLink: 'demo-validate-cross-component', value: '跨组件表单验证' },
    // { dAnchorLink: 'demo-validate-coordinated', value: '表单联动' },
    // { dAnchorLink: 'demo-validate-dynamic-rule', value: '动态校验规则' },
  ];
  constructor() {}
}
