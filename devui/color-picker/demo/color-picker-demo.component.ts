import { Component, OnInit } from '@angular/core';
import { DevuiSourceData } from '../../shared/devui-codebox';

@Component({
  selector: 'd-color-picker-demo',
  templateUrl: './color-picker-demo.component.html'
})
export class ColorPickerDemoComponent implements OnInit {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')}
  ];
  tapSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./tap/tap.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./tap/tap.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./tap/tap.component.scss')}
  ];

  constructor() { }

  ngOnInit() {
  }

}
