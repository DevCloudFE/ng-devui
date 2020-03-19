import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from '../../shared/devui-codebox';

@Component({
    selector: 'd-demo-dragdrop',
    templateUrl: './dragdrop-demo.component.html'
})
export class DragDropDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];

  treeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./tree/tree.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./tree/tree.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./tree/tree.component.css')}
  ];

  followSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./follow/follow.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./follow/follow.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./follow/follow.component.css')}
  ];

  constructor() {

  }
}
