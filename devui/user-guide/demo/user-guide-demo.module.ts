import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'ng-devui/button';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { UserGuideModule } from 'ng-devui/user-guide';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { ServiceWayComponent } from './service-way/service-way.component';
import { UserGuideDemoComponent } from './user-guide-demo.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    DevUIApiModule,
    UserGuideModule,
    DevUICodeboxModule,
    DDemoNavModule,
    ButtonModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo', pathMatch: 'full' },
      { path: 'demo', component: UserGuideDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ],
  declarations: [
    UserGuideDemoComponent,
    BasicComponent,
    ServiceWayComponent
  ]
})
export class UserGuideDemoModule { }
