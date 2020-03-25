import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StickyModule } from '../../sticky';
import { AnchorModule } from '../../anchor';
import { DragDropModule } from '../drag-drop.module';
import { DragDropDemoComponent } from './dragdrop-demo.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { ButtonModule } from 'ng-devui/button';
import { ToggleModule } from 'ng-devui/toggle';
import { BasicComponent } from './basic/basic.component';
import { TreeComponent } from './tree/tree.component';
import { FollowComponent } from './follow/follow.component';
import { BatchDragComponent } from './batch-drag/batch-drag.component';
import { DropScrollComponent } from './drop-scroll/drop-scroll.component';
import { SwitchComponent } from './switch/switch.component';
import { PositionComponent } from './position/position.component';
import { OriginPlaceholderComponent } from './origin-placeholder/origin-placeholder.component';
import { CrossDimensionComponent } from './cross-dimension/cross-dimension.component';

@NgModule({
  imports: [
    StickyModule,
    AnchorModule,
    CommonModule,
    FormsModule,
    DragDropModule,
    ButtonModule,
    ToggleModule,
    DevUICodeboxModule,
    DevUIApiModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: DragDropDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [DragDropDemoComponent],
  declarations: [
    DragDropDemoComponent,
    BasicComponent,
    TreeComponent,
    FollowComponent,
    PositionComponent,
    SwitchComponent,
    BatchDragComponent,
    OriginPlaceholderComponent,
    DropScrollComponent,
    CrossDimensionComponent
  ],
  entryComponents: [
    DragDropDemoComponent,
  ],
})
export class DragDropDemoModule {
}

