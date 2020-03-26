import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  templateUrl: './checkbox-demo.component.html',
})

export class CheckBoxDemoComponent {
  checkboxDemoBasic: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/checkbox-basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/checkbox-basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/checkbox-basic.component.css')}
  ];

  checkboxDemoGroup: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./group/checkbox-group-basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./group/checkbox-group-basic.component.ts')},
  ];
  demoDocViewerMain;
  
  navitems = [
    {dAnchorLink:'checkbox-basic', value:"基本用法"},
    {dAnchorLink:'tabs-group', value:"使用CheckBoxGroup"}
  ]

  constructor() {
    this.demoDocViewerMain = document.querySelector('.doc-viewer-container .main');
  }
}
