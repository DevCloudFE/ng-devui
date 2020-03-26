import {
  Component, OnInit
} from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'd-demo-input-number',
  templateUrl: './input-number-demo.component.html',
})
export class InputNumberDemoComponent {
  InputNumberBasic: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/input-number-basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/input-number-basic.component.ts') },
    { title: 'CSS', language: 'css', code: require('!!raw-loader!./basic/input-number-basic.component.css') }
  ];

  InputNumberDisabled: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./disabled/input-number-disabled.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./disabled/input-number-disabled.component.ts') },
    { title: 'CSS', language: 'css', code: require('!!raw-loader!./disabled/input-number-disabled.component.css') }
  ];

  InputNumberEmpty: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./empty/input-number-empty.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./empty/input-number-empty.component.ts') },
    { title: 'CSS', language: 'css', code: require('!!raw-loader!./empty/input-number-empty.component.css') }
  ];

  InputNumberPlaceholderAndMaxLengthComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml',
      code: require('!!raw-loader!./placeholderAndMaxLength/input-number-placeholder-maxLength.component.html') },
    { title: 'TS', language: 'typescript',
      code: require('!!raw-loader!./placeholderAndMaxLength/input-number-placeholder-maxLength.component.ts') },
    { title: 'CSS', language: 'css',
      code: require('!!raw-loader!./placeholderAndMaxLength/input-number-placeholder-maxLength.component.css') }
  ];

  InputNumberReg: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./reg/input-number-reg.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./reg/input-number-reg.component.ts') },
    { title: 'CSS', language: 'css', code: require('!!raw-loader!./reg/input-number-reg.component.css') }
  ];

  demoDocViewerMain;
  
  navitems = [
    {dAnchorLink:'number-basic', value:"基本用法"},
    {dAnchorLink:'number-disabled', value:"禁止输入态"},
    {dAnchorLink:'number-empty', value:"允许空值"},
    {dAnchorLink:'number-placeholder-maxlength', value:"placeholder和maxLength"},
    {dAnchorLink:'number-reg', value:"正则限制"}
  ]
  constructor() {
    this.demoDocViewerMain = document.querySelector('.doc-viewer-container .main');
  }
}
