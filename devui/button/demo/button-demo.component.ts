import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-demo-button',
    templateUrl: './button-demo.component.html'
})
export class ButtonDemoComponent {
  commonSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./common/common.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./common/common.component.ts')}
  ];

  iconSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./icon/icon.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./icon/icon.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./icon/icon.component.css')}
  ];

  loadingSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./loading/loading.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./loading/loading.component.ts')}
  ];

  primarySource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./primary/primary.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./primary/primary.component.ts')}
  ];

  textSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./text/text.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./text/text.component.ts')}
  ];

  demoDocViewerMain;
  
  navItems = [
    { dAnchorLink: 'button-primary', value: "主要按钮"},
    { dAnchorLink: 'button-common', value: "次要按钮"},
    { dAnchorLink: 'button-text', value: "文字按钮"},
    { dAnchorLink: 'button-loading', value: "加载中状态"},
    { dAnchorLink: 'tabs-default', value: "图标按钮"}
  ]

  constructor() {
    this.demoDocViewerMain = document.querySelector('.doc-viewer-container .main');
  }
}
