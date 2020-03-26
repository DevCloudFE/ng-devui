import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'd-demo-tabs',
  templateUrl: './tabs-demo.component.html',
  styleUrls: ['../../style/core/_nav.scss']
})
export class TabsDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'CSS', language: 'css', code: require('!!raw-loader!./basic/basic.component.css') }
  ];

  withoutContentSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./without-content/without-content.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./without-content/without-content.component.ts') }
  ];

  beforeChangeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./before-change/before-change.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./before-change/before-change.component.ts') }
  ];
  customSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom/custom.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom/custom.component.ts') }
  ];
  configSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./config/config.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./config/config.component.ts') }
  ];
  ConfigurableSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./configurable-tabs/configurable-tabs.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./configurable-tabs/configurable-tabs.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./configurable-tabs/configurable-tabs.component.scss') },
    {
      title: 'tabs-transfer HTML', language: 'xml', code:
        require('!!raw-loader!./configurable-tabs/tabs-transfer/tabs-transfer.component.html')
    },
    {
      title: 'tabs-transfer TS', language: 'typescript', code:
        require('!!raw-loader!./configurable-tabs/tabs-transfer/tabs-transfer.component.ts')
    },
  ];

  navitems = [
    {dAnchorLink:'basic-usage', value:"基本用法"},
    {dAnchorLink:'no-set-content', value:"不设置内容"},
    {dAnchorLink:'custom-template', value:"自定义模板"},
    {dAnchorLink:'configuration-type-and-arrangement', value:"配置类型与排列"},
    {dAnchorLink:'intercept-tab-switch', value:"拦截tab切换"},
    {dAnchorLink:'custom-tabs-display-and-arrangement', value:"自定义Tabs显示与排列"}
  ]
  constructor() {

  }
}
