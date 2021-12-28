import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-form-demo',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.scss'],
})
export class FormDemoComponent implements OnInit, OnDestroy {
  BasicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.css?raw') },
  ];
  LabelHorizontalSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./label-horizontal/label-horizontal.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./label-horizontal/label-horizontal.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./label-horizontal/label-horizontal.component.css?raw') },
  ];
  ModalSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./modal/modal.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./modal/modal.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./modal/modal.component.css?raw') },
    { title: 'ModalOne HTML', language: 'xml', code: require('./modal-one/modal-one.component.html?raw') },
    { title: 'ModalOne TS', language: 'typescript', code: require('./modal-one/modal-one.component.ts?raw') },
  ];
  MultiColSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./multi-col/multi-col.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./multi-col/multi-col.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./multi-col/multi-col.component.css?raw') },
  ];

  InnerValidatorSource: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('./validate-template/inner-validator/inner-validator.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./validate-template/inner-validator/inner-validator.component.ts?raw'),
    },
  ];
  CustomValidatorSource: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('./validate-template/custom-validator/custom-validator.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./validate-template/custom-validator/custom-validator.component.ts?raw'),
    },
  ];
  ErrorStrategySource: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('./validate-template/error-strategy/error-strategy.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./validate-template/error-strategy/error-strategy.component.ts?raw'),
    },
  ];
  CustomMessageShowSource: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('./validate-template/custom-message-show/custom-message-show.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./validate-template/custom-message-show/custom-message-show.component.ts?raw'),
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('./validate-template/custom-message-show/custom-message-show.component.scss?raw'),
    },
  ];
  DebounceTimeSource: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('./validate-template/debounce-time/debounce-time.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./validate-template/debounce-time/debounce-time.component.ts?raw'),
    },
  ];
  ValidateTemplateForm: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('./validate-template/validate-template-form/validate-template-form.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./validate-template/validate-template-form/validate-template-form.component.ts?raw'),
    },
  ];
  UserRegisterShowSource: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('./validate-template/user-register/user-register.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./validate-template/user-register/user-register.component.ts?raw'),
    },
  ];
  ValidateTemplateCrossComponent: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('./validate-template/validate-cross-component/validate-cross-component.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./validate-template/validate-cross-component/validate-cross-component.component.ts?raw'),
    },
    {
      title: 'child-group.html',
      language: 'xml',
      code: require('./validate-template/validate-cross-component/child-form/child-form.component.html?raw'),
    },
    {
      title: 'child-group.ts',
      language: 'typescript',
      code: require('./validate-template/validate-cross-component/child-form/child-form.component.ts?raw'),
    },
  ];

  ReactiveFormCrossComponent: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('./validate-cross-component/validate-cross-component.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./validate-cross-component/validate-cross-component.component.ts?raw'),
    },
    {
      title: 'child.html',
      language: 'xml',
      code: require('./validate-cross-component/child-control/child-user.component.html?raw'),
    },
    {
      title: 'child.ts',
      language: 'typescript',
      code: require('./validate-cross-component/child-control/child-user.component.ts?raw'),
    },
  ];

  ValidateCustomStatus: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom-status/custom-status.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom-status/custom-status.component.ts?raw') },
  ];

  ValidateReactiveSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./validate-reactive/validate-reactive.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./validate-reactive/validate-reactive.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./validate-reactive/validate-reactive.component.scss?raw') },
  ];

  ValidateSyncSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./validate-sync/validate-sync.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./validate-sync/validate-sync.component.ts?raw') },
  ];

  ValidateDynamicRuleSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./validate-dynamic-rule/validate-dynamic-rule.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./validate-dynamic-rule/validate-dynamic-rule.component.ts?raw') },
  ];

  ValidateUpdate: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./validate-update/validate-update.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./validate-update/validate-update.component.ts?raw') },
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
