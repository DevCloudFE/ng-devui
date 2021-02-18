import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { BadgeModule } from '../badge.module';
import { BadgeDemoComponent } from './badge-demo.component';
import { BasicComponent } from './basic/basic.component';
import { CountComponent } from './count/count.component';
import { CustomComponent } from './custom/custom.component';
import { DotComponent } from './dot/dot.component';
import { PositionComponent } from './position/position.component';
import { StatusComponent } from './status/status.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    DevUIApiModule,
    BadgeModule,
    DevUICodeboxModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: BadgeDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ],
  declarations: [
    BadgeDemoComponent,
    BasicComponent,
    DotComponent,
    CountComponent,
    StatusComponent,
    PositionComponent,
    CustomComponent
  ]
})
export class BadgeDemoModule { }
