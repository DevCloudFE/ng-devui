import {
  Component, OnInit
} from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'd-quadrant-diagram-demo',
  templateUrl: './quadrant-diagram-demo.component.html'
})

export class QuadrantDiagramDemoComponent implements OnInit {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./basic/basic.component.scss') }
  ];
  configSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./config/config.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./config/config.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./config/config.component.scss') }
  ];
  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'custom-quadrant', value: '配置自定义象限图'}
  ];

  constructor() {
  }
  ngOnInit(): void {

  }
}
