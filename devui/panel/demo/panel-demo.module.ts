import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StickyModule } from '../../sticky';
import { AnchorModule } from '../../anchor';
import { PanelModule } from '../panel.module';
import { PanelDemoComponent } from './panel-demo.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { TypeComponent } from './type/type.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
@NgModule({
  imports: [
    DDemoNavModule,
    StickyModule,
    AnchorModule,
    CommonModule,
    FormsModule,
    PanelModule,
    DevUICodeboxModule,
    DevUIApiModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: PanelDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [PanelDemoComponent],
  declarations: [
    PanelDemoComponent,
    BasicComponent,
    TypeComponent,
    PanelDemoComponent,
  ],
  entryComponents: [PanelDemoComponent]
})
export class PanelDemoModule { }

