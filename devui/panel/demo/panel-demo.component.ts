import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'd-demo-panel',
  templateUrl: './panel-demo.component.html',
  styleUrls: ['../../style/core/_nav.scss']
})
export class PanelDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'CSS', language: 'css', code: require('!!raw-loader!./basic/basic.component.css') }
  ];

  typeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./type/type.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./type/type.component.ts') },
  ];

  navitems = [
    {dAnchorLink:'basic-usage', value:"基本用法"},
    {dAnchorLink:'multiple-types', value:"多种类型"}
  ]
}
