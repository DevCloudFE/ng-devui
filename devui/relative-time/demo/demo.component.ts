import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') }
  ];
}
