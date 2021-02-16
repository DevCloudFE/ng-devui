import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputNumberModule } from 'ng-devui/input-number';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { InputNumberBasicComponent } from './basic/input-number-basic.component';
import { DecimalLimitComponent } from './decimal-limit/decimal-limit.component';
import { InputNumberDisabledComponent } from './disabled/input-number-disabled.component';
import { InputNumberEmptyComponent } from './empty/input-number-empty.component';
import { InputNumberDemoComponent } from './input-number-demo.component';
import { InputNumberPlaceholderAndMaxLengthComponent } from './placeholderAndMaxLength/input-number-placeholder-maxLength.component';
import { InputNumberRegComponent } from './reg/input-number-reg.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    DevUIApiModule,
    DevUICodeboxModule,
    InputNumberModule,
    FormsModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: InputNumberDemoComponent },
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
  exports: [InputNumberDemoComponent],
  declarations: [
    InputNumberDemoComponent,
    InputNumberBasicComponent,
    InputNumberDisabledComponent,
    InputNumberEmptyComponent,
    InputNumberPlaceholderAndMaxLengthComponent,
    InputNumberRegComponent,
    DecimalLimitComponent
  ],
})
export class InputNumberDemoModule {}
