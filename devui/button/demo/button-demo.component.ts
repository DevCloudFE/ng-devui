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

  combinationSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./combination/combination.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./combination/combination.component.ts')}
  ];

  autofocusSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./autofocus/autofocus.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./autofocus/autofocus.component.ts')}
  ];

  sizeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./size/size.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./size/size.component.ts')}
  ];

  navItems = [
    { dAnchorLink: 'button-primary', value: '主要按钮'},
    { dAnchorLink: 'button-common', value: '次要按钮'},
    { dAnchorLink: 'button-primary-and-common', value: '主要按钮与次要按钮组合'},
    { dAnchorLink: 'button-text', value: '文字按钮'},
    { dAnchorLink: 'button-loading', value: '加载中状态'},
    { dAnchorLink: 'button-auto-focus', value: '自动获得焦点'},
    { dAnchorLink: 'button-icon', value: '图标按钮'},
    { dAnchorLink: 'button-size', value: '按钮大小'}
  ];

  constructor() {

  }
}
