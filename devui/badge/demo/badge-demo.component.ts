import { Component, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'app-badge-demo',
  templateUrl: './badge-demo.component.html'
})
export class BadgeDemoComponent implements OnInit {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.scss')}
  ];
  dotSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./dot/dot.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./dot/dot.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./dot/dot.component.scss')}
  ];
  countSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./count/count.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./count/count.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./count/count.component.scss')}
  ];
  statusSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./status/status.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./status/status.component.ts')}
  ];

  navItems = [
    { dAnchorLink: 'badge-basic', value: '基本徽章'},
    { dAnchorLink: 'badge-dot', value: '点状徽章'},
    { dAnchorLink: 'badge-count', value: '计数徽章'},
    { dAnchorLink: 'badge-status', value: '状态徽章'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
