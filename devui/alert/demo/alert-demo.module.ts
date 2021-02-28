import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { AlertModule } from '../alert.module';
import { AlertDemoComponent } from './alert-demo.component';
import { BasicComponent } from './basic/basic.component';
import { CloseComponent } from './close/close.component';
import { WithoutIconComponent } from './withoutIcon/withoutIcon.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    AlertModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: AlertDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ],
  exports: [AlertDemoComponent],
  declarations: [
    AlertDemoComponent,
    BasicComponent,
    CloseComponent,
    WithoutIconComponent
  ],

})
export class AlertDemoModule {
}
