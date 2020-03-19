import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'd-slider-demo',
  templateUrl: './slider-demo.component.html',
})
export class SliderDemoComponent implements OnInit {

  SliderBasicComponent = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./basic/slider-demo-basic.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/slider-demo-basic.component.ts')},
    {title: 'CSS', language: 'css', code: require('!!raw-loader!./basic/slider-demo-basic.component.css')},
  ];
  SliderDisabledComponent = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./disabled/slider-demo-disabled.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./disabled/slider-demo-disabled.component.ts')},
  ];
  SliderCustomFormatterComponent = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./custom-formatter/slider-demo-custom-formatter.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom-formatter/slider-demo-custom-formatter.component.ts')},
  ];
  demoDocViewer;
  list = ['基本用法', '禁止输入态', '定制Popover的显示内容'];

  ngOnInit() {
    this.demoDocViewer = document.querySelector('.doc-viewer-container');
  }
}
