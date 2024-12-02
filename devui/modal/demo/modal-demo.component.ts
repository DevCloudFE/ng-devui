import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-modal-demo',
  templateUrl: './modal-demo.component.html',
  styles: [':host ::ng-deep d-button:not(first-child) { margin-left: 8px }'],
})
export class ModalDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'Dialog HTML', language: 'xml', code: require('./modal-test.component.html?raw') },
    { title: 'Dialog TS', language: 'typescript', code: require('./modal-test.component.ts?raw') },
  ];
  maximizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./maximize/maximize.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./maximize/maximize.component.ts?raw') },
    { title: 'Dialog HTML', language: 'xml', code: require('./modal-test.component.html?raw') },
    { title: 'Dialog TS', language: 'typescript', code: require('./modal-test.component.ts?raw') },
  ];
  basicUpdateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic-update/basic-update.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic-update/basic-update.component.ts?raw') },
    { title: 'Modal HTML', language: 'xml', code: require('./basic-update/modal-test.component.html?raw') },
    { title: 'Modal TS', language: 'typescript', code: require('./basic-update/modal-test.component.ts?raw') },
  ];
  customizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./customize/customize.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./customize/customize.component.ts?raw') },
    { title: 'ModalAlert HTML', language: 'xml', code: require('./customize/modal-alert.component.html?raw') },
    { title: 'ModalAlert TS', language: 'typescript', code: require('./customize/modal-alert.component.ts?raw') },
    { title: 'ModalAlert CSS', language: 'css', code: require('./customize/modal-alert.component.scss?raw') },
    { title: 'ModalNoBtn HTML', language: 'xml', code: require('./customize/modal-no-btn.component.html?raw') },
    { title: 'ModalNoBtn TS', language: 'typescript', code: require('./customize/modal-no-btn.component.ts?raw') },
    { title: 'ModalNoBtn CSS', language: 'css', code: require('./customize/modal-no-btn.component.scss?raw') },
  ];
  tipsSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./tips/tips.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./tips/tips.component.ts?raw') },
  ];
  hideSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./hide/hide.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./hide/hide.component.ts?raw') },
    { title: 'Dialog HTML', language: 'xml', code: require('./hide/modal-form.component.html?raw') },
    { title: 'Dialog CSS', language: 'css', code: require('./hide/modal-form.component.scss?raw') },
    { title: 'Dialog TS', language: 'typescript', code: require('./hide/modal-form.component.ts?raw') },
  ];
  autofocusSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./autofocus/autofocus.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./autofocus/autofocus.component.ts?raw') },
  ];
  templateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./template/template.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./template/template.component.ts?raw') },
    {
      title: 'Dialog HTML',
      language: 'xml',
      code: require('./template/dialog-content/dialog-content.component.html?raw'),
    },
    {
      title: 'Dialog TS',
      language: 'typescript',
      code: require('./template/dialog-content/dialog-content.component.ts?raw'),
    },
    { title: 'Modal HTML', language: 'xml', code: require('./template/modal-content/modal-content.component.html?raw') },
    {
      title: 'Modal TS',
      language: 'typescript',
      code: require('./template/modal-content/modal-content.component.ts?raw'),
    },
    { title: 'Modal CSS', language: 'css', code: require('./template/modal-content/modal-content.component.scss?raw') },
  ];
  fixedWrapperSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./fixed/fixed-wrapper.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./fixed/fixed-wrapper.component.ts?raw') },
    { title: 'Dialog HTML', language: 'xml', code: require('./modal-test.component.html?raw') },
    { title: 'Dialog TS', language: 'typescript', code: require('./modal-test.component.ts?raw') },
  ];
  casesSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./cases/cases.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./cases/cases.component.ts?raw') },
    { title: 'Dialog HTML', language: 'xml', code: require('./cases/modal-cases.component.html?raw') },
    { title: 'Dialog TS', language: 'typescript', code: require('./cases/modal-cases.component.ts?raw') },
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
      { dAnchorLink: 'maximize-dialog', value: values['maximize-dialog'] },
      { dAnchorLink: 'custom-dialog', value: values['custom-dialog'] },
      { dAnchorLink: 'intercept-dialog-closed', value: values['intercept-dialog-closed'] },
      { dAnchorLink: 'message-hint', value: values['message-hint'] },
      { dAnchorLink: 'update-button-options', value: values['update-button-options'] },
      { dAnchorLink: 'configure-button-to-get-focus-automatically', value: values['configure-button-to-get-focus-automatically'] },
      { dAnchorLink: 'template-content', value: values['template-content'] },
      { dAnchorLink: 'template-fixed', value: values['template-fixed'] },
      { dAnchorLink: 'cases', value: values.cases },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
