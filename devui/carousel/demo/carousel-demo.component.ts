import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-demo-carousel',
  templateUrl: './carousel-demo.component.html',
})
export class CarouselDemoComponent implements OnInit {

  CarouselBasicComponent = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./basic/carousel-demo-basic.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/carousel-demo-basic.component.ts')},
  ];
  CarouselTriggerComponent = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./trigger/carousel-demo-trigger.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./trigger/carousel-demo-trigger.component.ts')},
  ];
  CarouselAutoplayComponent = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./autoplay/carousel-demo-autoplay.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./autoplay/carousel-demo-autoplay.component.ts')},
  ];
  CarouselCustomComponent = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./custom/carousel-demo-custom.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom/carousel-demo-custom.component.ts')},
  ];
  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'trigger-usage', value: '指示器&切换箭头'},
    { dAnchorLink: 'autoplay-usage', value: '自动轮播'},
    { dAnchorLink: 'custom-usage', value: '自定义操作'},
  ];
  ngOnInit() {
  }
}
