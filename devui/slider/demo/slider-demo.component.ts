import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'd-slider-demo',
  templateUrl: './slider-demo.component.html',
})
export class SliderDemoComponent {

  SliderBasicComponent = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./basic/slider-basic.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/slider-basic.component.ts')},
    {title: 'CSS', language: 'css', code: require('!!raw-loader!./basic/slider-basic.component.css')},
  ];
  SliderDisabledComponent = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./disabled/slider-disabled.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./disabled/slider-disabled.component.ts')},
  ];
  SliderCustomFormatterComponent = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./custom-formatter/slider-custom-formatter.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom-formatter/slider-custom-formatter.component.ts')},
  ];
  list = ['基本用法', '禁止输入态', '定制Popover的显示内容'];

  demoDocViewerMain;

  navitems = [
    {dAnchorLink:'basic-usage', value:"基本用法"},
    {dAnchorLink:'slider-disabled', value:"禁止输入态"},
    {dAnchorLink:'slider-formatter', value:"异定制Popover的显示内容"}
  ]

  constructor() {
    this.demoDocViewerMain = document.querySelector('.doc-viewer-container .main');
  }
}
