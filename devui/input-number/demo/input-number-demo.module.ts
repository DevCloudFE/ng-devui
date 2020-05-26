import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InputNumberDemoComponent } from './input-number-demo.component';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'ng-devui/input-number';
import { FormsModule } from '@angular/forms';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';

import { InputNumberBasicComponent } from './basic/input-number-basic.component';
import { InputNumberDisabledComponent } from './disabled/input-number-disabled.component';
import { InputNumberEmptyComponent } from './empty/input-number-empty.component';
import { InputNumberPlaceholderAndMaxLengthComponent } from './placeholderAndMaxLength/input-number-placeholder-maxLength.component';
import { InputNumberRegComponent } from './reg/input-number-reg.component';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';

@NgModule({
  imports: [
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
        path: 'api', component: DevUIApiComponent, data: {
          api: require('!html-loader!markdown-loader!../doc/api.md'),
        }
      }
    ])
  ],
  exports: [InputNumberDemoComponent],
  declarations: [
    InputNumberDemoComponent,
    InputNumberBasicComponent,
    InputNumberDisabledComponent,
    InputNumberEmptyComponent,
    InputNumberPlaceholderAndMaxLengthComponent,
    InputNumberRegComponent
  ],
})
export class InputNumberDemoModule {
}

