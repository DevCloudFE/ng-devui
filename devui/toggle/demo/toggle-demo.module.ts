import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ng-devui/modal';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { ToggleModule } from 'ng-devui/toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { CallbackComponent } from './callback/callback.component';
import { CustomComponent } from './custom/custom.component';
import { ToggleDemoComponent } from './toggle-demo.component';
import { TwoBindingComponent } from './two-binding/two-binding.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    ToggleModule,
    ModalModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: ToggleDemoComponent },
      {
        path: 'api',
        component: DevUIApiComponent,
        data: {
          'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
          'en-us': require('!html-loader!markdown-loader!../doc/api-en.md'),
        },
      },
    ]),
  ],
  exports: [ToggleDemoComponent],
  declarations: [
    ToggleDemoComponent,
    BasicComponent,
    TwoBindingComponent,
    CallbackComponent,
    CustomComponent
  ],

  providers: [],
})
export class ToggleDemoModule {}
