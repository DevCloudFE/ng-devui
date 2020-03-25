import { Component, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'd-tree-demo',
  templateUrl: './tree-demo.component.html',
  styleUrls: ['../../style/core/_nav.scss']
})
export class TreeDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
  ];

  checkableSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./checkable/checkable.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./checkable/checkable.component.ts')},
  ];
  customTitleKeySource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./custom-title-key/custom-title-key.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./custom-title-key/custom-title-key.component.ts')},
  ];
  searchFilterSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./search-filter/search-filter.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./search-filter/search-filter.component.ts')},
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
  constructor() { }

}
