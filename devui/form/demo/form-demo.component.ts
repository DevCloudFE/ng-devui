import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-form-demo',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.scss'],
})
export class FormDemoComponent implements OnInit, OnDestroy {
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

  InnerValidatorSource: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('!!raw-loader!./validate-template/inner-validator/inner-validator.component.html'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./validate-template/inner-validator/inner-validator.component.ts'),
    },
  ];
  CustomValidatorSource: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('!!raw-loader!./validate-template/custom-validator/custom-validator.component.html'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./validate-template/custom-validator/custom-validator.component.ts'),
    },
  ];
  ErrorStrategySource: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('!!raw-loader!./validate-template/error-strategy/error-strategy.component.html'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./validate-template/error-strategy/error-strategy.component.ts'),
    },
  ];
  CustomMessageShowSource: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('!!raw-loader!./validate-template/custom-message-show/custom-message-show.component.html'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./validate-template/custom-message-show/custom-message-show.component.ts'),
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('!!raw-loader!./validate-template/custom-message-show/custom-message-show.component.scss'),
    },
  ];
  DebounceTimeSource: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('!!raw-loader!./validate-template/debounce-time/debounce-time.component.html'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./validate-template/debounce-time/debounce-time.component.ts'),
    },
  ];
  ValidateTemplateForm: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('!!raw-loader!./validate-template/validate-template-form/validate-template-form.component.html'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./validate-template/validate-template-form/validate-template-form.component.ts'),
    },
  ];
  UserRegisterShowSource: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('!!raw-loader!./validate-template/user-register/user-register.component.html'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./validate-template/user-register/user-register.component.ts'),
    },
  ];
  ValidateTemplateCrossComponent: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('!!raw-loader!./validate-template/validate-cross-component/validate-cross-component.component.html'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./validate-template/validate-cross-component/validate-cross-component.component.ts'),
    },
    {
      title: 'child-group.html',
      language: 'xml',
      code: require('!!raw-loader!./validate-template/validate-cross-component/child-form/child-form.component.html'),
    },
    {
      title: 'child-group.ts',
      language: 'typescript',
      code: require('!!raw-loader!./validate-template/validate-cross-component/child-form/child-form.component.ts'),
    },
  ];

  ReactiveFormCrossComponent: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('!!raw-loader!./validate-cross-component/validate-cross-component.component.html'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./validate-cross-component/validate-cross-component.component.ts'),
    },
    {
      title: 'child.html',
      language: 'xml',
      code: require('!!raw-loader!./validate-cross-component/child-control/child-user.component.html'),
    },
    {
      title: 'child.ts',
      language: 'typescript',
      code: require('!!raw-loader!./validate-cross-component/child-control/child-user.component.ts'),
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

  ValidateDynamicRuleSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./validate-dynamic-rule/validate-dynamic-rule.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./validate-dynamic-rule/validate-dynamic-rule.component.ts') },
  ];

  ValidateUpdate: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./validate-update/validate-update.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./validate-update/validate-update.component.ts') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.form.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.form.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'demo-label-horizontal', value: values['demo-label-horizontal'] },
      { dAnchorLink: 'demo-modal', value: values['demo-modal'] },
      { dAnchorLink: 'demo-multi-col', value: values['demo-multi-col'] },
      { dAnchorLink: 'demo-validate-template', value: values['demo-validate-template'] },
      { dAnchorLink: 'demo-validate-reactive', value: values['demo-validate-reactive'] },
      { dAnchorLink: 'demo-custom-status', value: values['demo-custom-status'] },
      { dAnchorLink: 'demo-validate-sync', value: values['demo-validate-sync'] },
      { dAnchorLink: 'demo-validate-cross-component', value: values['demo-validate-cross-component'] },
      { dAnchorLink: 'demo-validate-update', value: values['demo-validate-update'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
