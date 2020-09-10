import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AvatarDemoComponent } from './avatar-demo.component';
import { AvatarModule } from '../avatar.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { SpecialComponent } from './special/special.component';
import { ConfigComponent } from './config/config.component';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    AvatarModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: AvatarDemoComponent },
      {
        path: 'api', component: DevUIApiComponent, data: {
          api: require('!html-loader!markdown-loader!../doc/api.md')
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
