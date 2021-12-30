import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormModule } from 'ng-devui/form';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TextInputModule } from 'ng-devui/text-input';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { PasswordVisibleComponent } from './password-visible/password-visible.component';
import { TextInputSizeComponent } from './size/text-input-size.component';
import { TextInputDemoComponent } from './text-input-demo.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    TextInputModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: TextInputDemoComponent },
      {
        path: 'api',
        component: DevUIApiComponent,
        data: {
          'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
          'en-us': require('!html-loader!markdown-loader!../doc/api-en.md'),
        },
      },
    ]),
    FormModule,
  ],
  exports: [TextInputDemoComponent],
  declarations: [TextInputDemoComponent, BasicComponent, PasswordVisibleComponent, TextInputSizeComponent],

})
export class TextInputDemoModule {}
