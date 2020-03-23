import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-demo-dropdown',
    templateUrl: './dropdown-demo.component.html'
})
export class DropdownDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
  ];
  hoverSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./hover/hover.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./hover/hover.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./hover/hover.component.css')}
  ];
  focusSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./focus/focus.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./focus/focus.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./focus/focus.component.css')}
  ];
  closeScopeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./close-scope/close-scope.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./close-scope/close-scope.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./close-scope/close-scope.component.css')}
  ];
  appendToBodySource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./append-to-body/append-to-body.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./append-to-body/append-to-body.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./append-to-body/append-to-body.component.css')}
  ];
  addIconSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./add-icon/add-icon.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./add-icon/add-icon.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./add-icon/add-icon.component.css')}
  ];
  multiLevelSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./multi-level/multi-level.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./multi-level/multi-level.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./multi-level/multi-level.component.css')}
  ];

  constructor() {

  }
}
