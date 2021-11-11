import { Component, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';

@Component({
  selector: 'd-dashboard-demo',
  templateUrl: './dashboard-demo.component.html'
})
export class DashboardDemoComponent implements OnInit {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw')},
    {title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw')},
    {title: 'SCSS', language: 'css', code: require('./basic/basic.component.scss?raw')}
  ];
  moreConfigSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code: require('./more-config/more-config.component.html?raw')},
    {title: 'TS', language: 'typescript', code: require('./more-config/more-config.component.ts?raw')},
    {title: 'SCSS', language: 'css', code: require('./more-config/more-config.component.scss?raw')}
  ];
  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'more-config', value: '更多设置'},
  ];
  constructor() { }

  ngOnInit() {
  }

}
