import { RouterModule } from '@angular/router';
import {
  NgModule,
} from '@angular/core';

import {
  DrawerDemoComponent
} from './drawer-demo.component';
import { DrawerModule } from '../drawer.moudule';
import { CommonModule } from '@angular/common';

import { ModalModule } from '../../modal';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { BasicComponent } from './basic/basic.component';
import { DrawerContentComponent } from './drawerContent/drawer-content.component';
import { UndestroyableComponent } from './undestroyable/undestroyable.component';
import { ButtonModule } from 'ng-devui/button';
import { StickyModule } from '../../sticky';
import { AnchorModule } from '../../anchor';


@NgModule({
  imports: [
    StickyModule,
    AnchorModule,
    DrawerModule,
    CommonModule,
    ButtonModule,
    DevUICodeboxModule,
    DevUIApiModule,
    ModalModule,
    RouterModule.forChild([
    { path: '',  redirectTo: 'demo' },
    { path: 'demo', component: DrawerDemoComponent},
    { path: 'api', component: DevUIApiComponent, data: {
      api: require('!html-loader!markdown-loader!../doc/api.md')
    }}
    ])
  ],
  exports: [],
  declarations: [
    DrawerDemoComponent,
    BasicComponent,
    UndestroyableComponent,
    DrawerContentComponent
  ],
  entryComponents: [
    DrawerDemoComponent,
    DrawerContentComponent
  ],
})
export class DrawerDemoModule {
}
