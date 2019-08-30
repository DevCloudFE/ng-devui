import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
@Component({
  selector: 'd-drawer-demo',
  templateUrl: './drawer-demo.component.html',
})
export class DrawerDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')}
  ];

  undestroyableSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./undestroyable/undestroyable.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./undestroyable/undestroyable.component.ts')}
  ];

  constructor() {

  }
}
