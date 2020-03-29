import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  templateUrl: './popover-demo.component.html',
  styleUrls: ['../../style/core/_nav.scss']
})
export class PopoverDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'CSS', language: 'css', code: require('!!raw-loader!./basic/basic.component.css') }
  ];

  manualSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./manual/manual.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./manual/manual.component.ts') }
  ];

  customizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./customize/customize.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./customize/customize.component.ts') },
  ];

  scrollElementSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./scroll-element/scroll-element.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./scroll-element/scroll-element.component.ts') },
  ];

  hoverToContentSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./hover-to-content/hover-to-content.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./hover-to-content/hover-to-content.component.ts') },
  ];

  navItems = [
    { dAnchorLink: 'basic-usage', value: "基本用法"},
    { dAnchorLink: 'manual-control-display', value: "手动控制显示"},
    { dAnchorLink: 'custom-prompt-content', value: "自定义提示内容"},
    { dAnchorLink: 'parent-container-settings', value: "父容器设置"},
    { dAnchorLink: 'mouse-can-move-in-content', value: "鼠标可移入内容"}
  ]

  constructor() {
  }
}
