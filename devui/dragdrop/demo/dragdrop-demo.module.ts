import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DragDropModule } from '../drag-drop.module';
import { DragDropDemoComponent } from './dragdrop-demo.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { TreeComponent } from './tree/tree.component';
import { FollowComponent } from './follow/follow.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
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
  ],
  entryComponents: [
    DragDropDemoComponent,
  ],
})
export class DragDropDemoModule {
}

