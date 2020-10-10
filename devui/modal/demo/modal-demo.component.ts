import { Component } from '@angular/core';

import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'd-modal-demo',
  templateUrl: './modal-demo.component.html'
})
export class ModalDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'ModalTestComponent HTML', language: 'xml', code: require('!!raw-loader!./basic/modal-test.component.html') },
    { title: 'ModalTestComponent TS', language: 'typescript', code: require('!!raw-loader!./basic/modal-test.component.ts') }
  ];
  customizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./customize/customize.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./customize/customize.component.ts') },
    { title: 'Custom Component HTML', language: 'xml', code: require('!!raw-loader!./customize/modal-alert.component.html') },
    { title: 'Custom Component TS', language: 'typescript', code: require('!!raw-loader!./customize/modal-alert.component.ts') },
    { title: 'Custom Component CSS', language: 'css', code: require('!!raw-loader!./customize/modal-alert.component.css') }
  ];
  tipsSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./tips/tips.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./tips/tips.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./tips/tips.component.css') }
  ];
  hideSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./hide/hide.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./hide/hide.component.ts') },
    { title: 'ModalFormComponent HTML', language: 'xml', code: require('!!raw-loader!./hide/modal-form.component.html') },
    { title: 'ModalFormComponent CSS', language: 'css', code: require('!!raw-loader!./hide/modal-form.component.css') },
    { title: 'ModalFormComponent TS', language: 'typescript', code: require('!!raw-loader!./hide/modal-form.component.ts') },
  ];
  warningSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./warning/warning.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./warning/warning.component.ts') }
  ];
  autofocusSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./autofocus/autofocus.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./autofocus/autofocus.component.ts') }
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
  navItems = [
    { dAnchorLink: 'standard-dialog', value: '标准对话框'},
    { dAnchorLink: 'custom-dialog', value: '自定义对话框'},
    { dAnchorLink: 'intercept-dialog-closed', value: '拦截对话框关闭'},
    { dAnchorLink: 'message-hint', value: '信息提示'},
    { dAnchorLink: 'warning-pop-up', value: '警告弹出框'},
    { dAnchorLink: 'configure-button-to-get-focus-automatically', value: '配置按钮自动获得焦点'},
    { dAnchorLink: 'template-content', value: '配置弹出框内容模板'}
  ];
}





