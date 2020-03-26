import {
  Component, OnInit
} from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';

@Component({
  selector: 'd-demo-basic',
  templateUrl: './tags.input-demo.component.html'
})

export class TagsInputDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')}
  ];
  asyncSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./async/async.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./async/async.component.ts')}
  ];

  demoDocViewerMain;

  navitems = [
    {dAnchorLink:'tags-input-basic', value:"基本用法"},
    {dAnchorLink:'tags-input-async', value:"异步数据源"}
  ]
  constructor() {
    this.demoDocViewerMain = document.querySelector('.doc-viewer-container .main');
  }
}
