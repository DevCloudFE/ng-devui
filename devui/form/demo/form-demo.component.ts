import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';

@Component({
  selector: 'd-form-demo',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.scss'],
})
export class FormDemoComponent {
  BasicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'CSS', language: 'css', code: require('!!raw-loader!./basic/basic.component.css') },
  ];
  LabelHorizontalSource: Array<DevuiSourceData> = [
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./label-horizontal/label-horizontal.component.ts') },
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./label-horizontal/label-horizontal.component.html') },
    { title: 'CSS', language: 'css', code: require('!!raw-loader!./label-horizontal/label-horizontal.component.css') },
  ];
  ModalSource: Array<DevuiSourceData> = [
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./modal/modal.component.ts') },
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./modal/modal.component.html') },
    { title: 'CSS', language: 'css', code: require('!!raw-loader!./modal/modal.component.css') },
    { title: 'ModalOne HTML', language: 'xml', code: require('!!raw-loader!./modal-one/modal-one.component.html') },
    { title: 'ModalOne TS', language: 'typescript', code: require('!!raw-loader!./modal-one/modal-one.component.ts') },
  ];
  MultiColSource: Array<DevuiSourceData> = [
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./multi-col/multi-col.component.ts') },
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./multi-col/multi-col.component.html') },
    { title: 'CSS', language: 'css', code: require('!!raw-loader!./multi-col/multi-col.component.css') },
  ];
  FilterSource: Array<DevuiSourceData> = [
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./filter/filter.component.ts') },
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./filter/filter.component.html') },
    { title: 'CSS', language: 'css', code: require('!!raw-loader!./filter/filter.component.css') },
  ];
  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法' },
    { dAnchorLink: 'demo-label-horizontal', value: 'label横向排列' },
    { dAnchorLink: 'demo-modal', value: '弹框表单' },
    { dAnchorLink: 'demo-multi-col', value: '多列表单' },
    { dAnchorLink: 'demo-filter', value: '表单过滤' },
  ];
  constructor() {}
}
