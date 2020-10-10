import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-demo-dragdrop',
    templateUrl: './dragdrop-demo.component.html'
})
export class DragDropDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.scss')}
  ];

  treeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./tree/tree.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./tree/tree.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./tree/tree.component.scss')}
  ];

  followSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./follow/follow.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./follow/follow.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./follow/follow.component.scss')}
  ];

  switchSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./switch/switch.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./switch/switch.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./switch/switch.component.scss')}
  ];

  positionSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./position/position.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./position/position.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./position/position.component.scss')}
  ];

  dropScrollSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./drop-scroll/drop-scroll.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./drop-scroll/drop-scroll.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./drop-scroll/drop-scroll.component.scss')}
  ];
  originPlaceholderSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./origin-placeholder/origin-placeholder.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./origin-placeholder/origin-placeholder.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./origin-placeholder/origin-placeholder.component.scss')}
  ];
  batchDragSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./batch-drag/batch-drag.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./batch-drag/batch-drag.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./batch-drag/batch-drag.component.scss')}
  ];

  crossDimensionSource:  Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./cross-dimension/cross-dimension.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./cross-dimension/cross-dimension.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./cross-dimension/cross-dimension.component.scss')}
  ];

  navItems = [
    { dAnchorLink: 'basic-usage', value: '基本用法'},
    { dAnchorLink: 'multi-level-tree-drag', value: '多层树状拖拽'},
    { dAnchorLink: 'drag-entity-elements-to-follow', value: '拖拽实体元素跟随'},
    { dAnchorLink: 'cross-edge-switching', value: '越边交换'},
    { dAnchorLink: 'external-location', value: '外部放置位置'},
    { dAnchorLink: 'drag-and-roll-container-enhancement', value: '拖拽滚动容器增强'},
    { dAnchorLink: 'source-placeholder', value: '源占位符'},
    { dAnchorLink: 'batch-drag-and-drop', value: '批量拖拽'},
    { dAnchorLink: '2D-drag-and-drop-preview', value: '二维拖拽和拖拽预览'}
  ];

  constructor() {

  }
}
