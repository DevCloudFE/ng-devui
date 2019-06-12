import { Component, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'ave-tree-demo',
  templateUrl: './tree-demo.component.html'
})
export class TreeDemoComponent implements OnInit {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];

  checkableSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./checkable/checkable.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./checkable/checkable.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./checkable/checkable.component.css')}
  ];

  operateBtnSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./operate-btn/operate-btn.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./operate-btn/operate-btn.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./operate-btn/operate-btn.component.css')}
  ];

  customizeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./customize/customize.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./customize/customize.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./customize/customize.component.css')}
  ];

  draggableSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./draggable/draggable.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./draggable/draggable.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./draggable/draggable.component.css')}
  ];
  data: any;
  constructor() { }

  ngOnInit() { }
}
