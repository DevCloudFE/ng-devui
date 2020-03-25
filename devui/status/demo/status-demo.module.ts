import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StickyModule } from '../../sticky';
import { AnchorModule } from '../../anchor';
import { StatusModule } from '../status.module';
import { StatusDemoComponent } from './status-demo.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';

@NgModule({
  imports: [
    StickyModule,
    AnchorModule,
    CommonModule,
    FormsModule,
    StatusModule,
    DevUICodeboxModule,
    DevUIApiModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: StatusDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [StatusDemoComponent],
  declarations: [
    StatusDemoComponent,
    BasicComponent
  ],
  entryComponents: [StatusDemoComponent]
})
export class StatusDemoModule { }

