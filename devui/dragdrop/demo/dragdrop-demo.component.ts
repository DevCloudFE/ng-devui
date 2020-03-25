import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-demo-dragdrop',
    templateUrl: './dragdrop-demo.component.html',
    styleUrls: ['../../style/core/_nav.scss']
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

  switchSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./switch/switch.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./switch/switch.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./switch/switch.component.css')}
  ];

  positionSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./position/position.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./position/position.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./position/position.component.css')}
  ];

  dropScrollSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./drop-scroll/drop-scroll.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./drop-scroll/drop-scroll.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./drop-scroll/drop-scroll.component.css')}
  ];
  originPlaceholderSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./origin-placeholder/origin-placeholder.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./origin-placeholder/origin-placeholder.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./origin-placeholder/origin-placeholder.component.css')}
  ];
  batchDragSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./batch-drag/batch-drag.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./batch-drag/batch-drag.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./batch-drag/batch-drag.component.css')}
  ];

  crossDimensionSource:  Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./cross-dimension/cross-dimension.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./cross-dimension/cross-dimension.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./cross-dimension/cross-dimension.component.scss')}
  ];

  constructor() {

  }
}
