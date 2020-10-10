import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  templateUrl: './tooltip-demo.component.html',
})
export class TooltipDemoComponent {
  message = 'I have animation!';
  position: 'left';

  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];
  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'}
  ];
}
