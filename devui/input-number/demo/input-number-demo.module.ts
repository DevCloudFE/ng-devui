import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InputNumberDemoComponent } from './input-number-demo.component';
import { InputNumberDemoBasicComponent } from './basic/input-number-demo-basic.component';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'ng-devui/input-number';
import {FormsModule} from '@angular/forms';
import {InputNumberDemoDisabledComponent} from './disabled/input-number-demo-disabled.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';

@NgModule({
  imports: [
    CommonModule,
    DevUIApiModule,
    DevUICodeboxModule,
    InputNumberModule,
    FormsModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: InputNumberDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md'),
      }}
    ])
  ],
  exports: [InputNumberDemoComponent],
  declarations: [
    InputNumberDemoComponent,
    InputNumberDemoBasicComponent,
    InputNumberDemoDisabledComponent
  ],
})
export class InputNumberDemoModule {
}

