import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-modal-demo',
  templateUrl: './modal-demo.component.html',
})
export class ModalDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'ModalTestComponent HTML', language: 'xml', code: require('!!raw-loader!./basic/modal-test.component.html') },
    { title: 'ModalTestComponent TS', language: 'typescript', code: require('!!raw-loader!./basic/modal-test.component.ts') },
  ];
  basicUpdateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic-update/basic-update.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic-update/basic-update.component.ts') },
    { title: 'ModalTestComponent HTML', language: 'xml', code: require('!!raw-loader!./basic-update/modal-test.component.html') },
    { title: 'ModalTestComponent TS', language: 'typescript', code: require('!!raw-loader!./basic-update/modal-test.component.ts') },
  ];
  customizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./customize/customize.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./customize/customize.component.ts') },
    { title: 'Custom Component HTML', language: 'xml', code: require('!!raw-loader!./customize/modal-alert.component.html') },
    { title: 'Custom Component TS', language: 'typescript', code: require('!!raw-loader!./customize/modal-alert.component.ts') },
    { title: 'Custom Component CSS', language: 'css', code: require('!!raw-loader!./customize/modal-alert.component.scss') },
  ];
  tipsSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./tips/tips.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./tips/tips.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./tips/tips.component.css') },
  ];
  hideSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./hide/hide.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./hide/hide.component.ts') },
    { title: 'ModalFormComponent HTML', language: 'xml', code: require('!!raw-loader!./hide/modal-form.component.html') },
    { title: 'ModalFormComponent CSS', language: 'css', code: require('!!raw-loader!./hide/modal-form.component.scss') },
    { title: 'ModalFormComponent TS', language: 'typescript', code: require('!!raw-loader!./hide/modal-form.component.ts') },
  ];
  warningSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./warning/warning.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./warning/warning.component.ts') },
  ];
  autofocusSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./autofocus/autofocus.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./autofocus/autofocus.component.ts') },
  ];
  templateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./template/template.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./template/template.component.ts') },
    { title: 'Dialog Content HTML', language: 'xml',
    code: require('!!raw-loader!./template/dialog-content/dialog-content.component.html') },
    { title: 'Dialog Content TS', language: 'typescript',
    code: require('!!raw-loader!./template/dialog-content/dialog-content.component.ts') },
    { title: 'Modal Content HTML', language: 'xml',
    code: require('!!raw-loader!./template/modal-content/modal-content.component.html') },
    { title: 'Modal Content TS', language: 'typescript',
    code: require('!!raw-loader!./template/modal-content/modal-content.component.ts') },
    { title: 'Modal Content CSS', language: 'css',
    code: require('!!raw-loader!./template/modal-content/modal-content.component.scss') }
  ];
  fixedWrapperSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./fixed/fixed-wrapper.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./fixed/fixed-wrapper.component.ts') },
    { title: 'ModalTestComponent HTML', language: 'xml', code: require('!!raw-loader!./fixed/modal-test.component.html') },
    { title: 'ModalTestComponent TS', language: 'typescript', code: require('!!raw-loader!./fixed/modal-test.component.ts') }
  ];
  casesSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./cases/cases.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./cases/cases.component.ts') },
    { title: 'ModalCasesComponent HTML', language: 'xml', code: require('!!raw-loader!./cases/modal-cases.component.html') },
    { title: 'ModalCasesComponent TS', language: 'typescript', code: require('!!raw-loader!./cases/modal-cases.component.ts') }
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.modal.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.modal.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'standard-dialog', value: values['standard-dialog'] },
      { dAnchorLink: 'custom-dialog', value: values['custom-dialog'] },
      { dAnchorLink: 'intercept-dialog-closed', value: values['intercept-dialog-closed'] },
      { dAnchorLink: 'message-hint', value: values['message-hint'] },
      { dAnchorLink: 'warning-pop-up', value: values['warning-pop-up'] },
      { dAnchorLink: 'update-button-options', value: values['update-button-options'] },
      { dAnchorLink: 'configure-button-to-get-focus-automatically', value: values['configure-button-to-get-focus-automatically'] },
      { dAnchorLink: 'template-content', value: values['template-content'] },
      { dAnchorLink: 'template-fixed', value: values['template-fixed'] },
      { dAnchorLink: 'cases', value: values['cases'] }
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
