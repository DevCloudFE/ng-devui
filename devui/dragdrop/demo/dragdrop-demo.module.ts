import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonModule } from 'ng-devui/button';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { ToggleModule } from 'ng-devui/toggle';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { DragDropModule } from '../drag-drop.module';
import { BasicComponent } from './basic/basic.component';
import { BatchDragComponent } from './batch-drag/batch-drag.component';
import { CrossDimensionComponent } from './cross-dimension/cross-dimension.component';
import { DragDropDemoComponent } from './dragdrop-demo.component';
import { DropScrollComponent } from './drop-scroll/drop-scroll.component';
import { FollowComponent } from './follow/follow.component';
import { OriginPlaceholderComponent } from './origin-placeholder/origin-placeholder.component';
import { PositionComponent } from './position/position.component';
import { SwitchComponent } from './switch/switch.component';
import { TreeComponent } from './tree/tree.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    DragDropModule,
    ButtonModule,
    ToggleModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: DragDropDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
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
  
})
export class DragDropDemoModule {
}
