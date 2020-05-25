import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
@Component({
  selector: 'd-drawer-demo',
  templateUrl: './drawer-demo.component.html',
})
export class DrawerDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'drawerContent-html', language: 'xml', code:  require('!!raw-loader!./drawerContent/drawer-content.component.html')},
    {title: 'drawerContent-ts', language: 'typescript', code:  require('!!raw-loader!./drawerContent/drawer-content.component.ts')},
    {title: 'drawerContent-css', language: 'css', code:  require('!!raw-loader!./drawerContent/drawer-content.component.css')}
  ];

  undestroyableSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./undestroyable/undestroyable.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./undestroyable/undestroyable.component.ts')},
    {title: 'drawerContent-html', language: 'xml', code:  require('!!raw-loader!./drawerContent/drawer-content.component.html')},
    {title: 'drawerContent-ts', language: 'typescript', code:  require('!!raw-loader!./drawerContent/drawer-content.component.ts')},
    {title: 'drawerContent-css', language: 'css', code:  require('!!raw-loader!./drawerContent/drawer-content.component.css')}
  ];

  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'do-not-destroy-after-closing', value: '关闭后不销毁'}
  ];

  constructor() {

  }
}
