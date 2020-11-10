import { Component, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'd-card-demo',
  templateUrl: './card-demo.component.html'
})
export class CardDemoComponent implements OnInit {
  CardDemoBasic: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.scss')}
  ];
  CardDemoCustom: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./custom/custom.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./custom/custom.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./custom/custom.component.scss')}
  ];
  CardDemoWithMedia: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./with-media/with-media.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./with-media/with-media.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./with-media/with-media.component.scss')}
  ];

  navItems = [
    { dAnchorLink: 'card-basic', value: '基本用法'},
    { dAnchorLink: 'card-with-media', value: '使用图片'},
    { dAnchorLink: 'card-custom', value: '自定义区域'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
