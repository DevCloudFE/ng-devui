import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ng-devui/avatar';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { AvatarDemoComponent } from './avatar-demo.component';
import { BasicComponent } from './basic/basic.component';
import { ConfigComponent } from './config/config.component';
import { SpecialComponent } from './special/special.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    AvatarModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo', pathMatch: 'full' },
      { path: 'demo', component: AvatarDemoComponent },
      {
        path: 'api', component: DevUIApiComponent, data: {
          'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
          'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
        }
      }
    ])
  ],
  exports: [
    AvatarDemoComponent
  ],
  declarations: [
    BasicComponent,
    SpecialComponent,
    ConfigComponent,
    AvatarDemoComponent
  ]
})
export class AvatarDemoModule { }
