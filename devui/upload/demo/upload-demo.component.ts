import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'd-upload-demo',
  templateUrl: './upload-demo.component.html',
})
export class UploadDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') }
  ];
  multiSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./multi/multi.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./multi/multi.component.ts') }
  ];
  customizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./customize/customize.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./customize/customize.component.ts') },
    { title: 'CSS', language: 'css', code: require('!!raw-loader!./customize/customize.component.css') }
  ];
  autoSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./auto/auto.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./auto/auto.component.ts') }
  ];
  dynamicUploadOptionsSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./dynamic-upload-options/dynamic-upload-options.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./dynamic-upload-options/dynamic-upload-options.component.ts') }
  ];
  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法' },
    { dAnchorLink: 'multi-files', value: '多文件上传' },
    { dAnchorLink: 'auto-upload', value: '自动上传' },
    { dAnchorLink: 'custom', value: '自定义' },
    { dAnchorLink: 'dynamic-upload-options', value: '动态上传参数' }
  ];
  constructor() {
  }
}
