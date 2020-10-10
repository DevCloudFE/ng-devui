import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BadgeModule } from '../badge.module';
import { BadgeDemoComponent } from './badge-demo.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';

import { BasicComponent } from './basic/basic.component';
import { DotComponent } from './dot/dot.component';
import { CountComponent } from './count/count.component';
import { StatusComponent } from './status/status.component';

@NgModule({
  imports: [
    CommonModule,
    DevUIApiModule,
    BadgeModule,
    DevUICodeboxModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: BadgeDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  declarations: [
    BadgeDemoComponent,
    BasicComponent,
    DotComponent,
    CountComponent,
    StatusComponent
  ]
})
export class BadgeDemoModule { }
