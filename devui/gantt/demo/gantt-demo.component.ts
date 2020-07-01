import { Component, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'd-gantt-demo',
  templateUrl: './gantt-demo.component.html'
})
export class GanttDemoComponent implements OnInit {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'css', language: 'css', code:  require('!!raw-loader!./basic/basic.component.scss')},
    {title: 'reset-position-HTML', language: 'html',
    code: require('!!raw-loader!./basic/reset-position/reset-position.component.html')},
    {title: 'reset-position-TS', language: 'typescript',
    code: require('!!raw-loader!./basic/reset-position/reset-position.component.ts')},
    {title: 'reset-position-CSS', language: 'css',
    code: require('!!raw-loader!./basic/reset-position/reset-position.component.scss')},
    {title: 'data', language: 'typescript', code:  require('!!raw-loader!./mock-data.ts')}
  ];
  navItems = [
    { dAnchorLink: 'gantt-with-datatable', value: '与datatable组件结合的甘特图'}
  ];
  constructor() { }

  ngOnInit() {
  }
}
