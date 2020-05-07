import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'd-avatar-demo',
  templateUrl: './avatar-demo.component.html',
  styleUrls: ['../../style/core/_nav.scss']
})

export class AvatarDemoComponent  {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];
  specialSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./special/special.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./special/special.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./special/special.component.css')}
  ];
  configSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./config/config.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./config/config.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./config/config.component.css')}
  ];

  navItems = [
    { dAnchorLink: 'basic-rules', value: "头像显示的基本规则"},
    { dAnchorLink: 'basic-configuration', value: "头像的基础配置"},
    { dAnchorLink: 'special-display', value: "头像的特殊显示"}
  ]
  
  constructor() {
  }

}
