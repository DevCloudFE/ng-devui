import { Component, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'd-demo-rate',
  templateUrl: './rate-demo.component.html',
  styleUrls: ['./rate-demo.component.css', '../../style/core/_nav.scss']
})
export class RateDemoComponent implements OnInit {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') }
  ];

  onlyreadSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./onlyread/onlyread.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./onlyread/onlyread.component.ts') }
  ];

  customizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./customize/customize.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./customize/customize.component.ts') }
  ];
  TypeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./type/type.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./type/type.component.ts') }
  ];
  constructor() {
  }

  ngOnInit() {

  }
}
