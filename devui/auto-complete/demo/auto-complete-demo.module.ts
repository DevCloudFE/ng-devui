import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from '../../shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from '../../shared/devui-codebox/devui-codebox.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteDemoComponent } from './auto-complete-demo.component';
import { AutoCompleteModule } from '../auto-complete.module';
import { ButtonModule } from '../../button';
import { AutoDemoBasicComponent } from './basic/auto-complete-demo-basic.component';
import { AutoDemoArrayComponent } from './array/auto-complete-demo-array.component';
import { AutoDemoCustomComponent } from './custom/auto-complete-demo-custom.component';
import { AutoDemoDisableComponent } from './disabled/auto-complete-demo-disable.component';
import { AutoDemoDropdownComponent } from './dropdown/auto-complete-demo-dropdown.component';
import { AutoDemoObjectComponent } from './object/auto-complete-demo-object.component';

import { DevUIModule } from 'ng-devui/devui.module';

@NgModule({
  imports: [
    DevUIModule,
    CommonModule,
    AutoCompleteModule,
    FormsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    ButtonModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: AutoCompleteDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [AutoCompleteDemoComponent],
  declarations: [
    AutoCompleteDemoComponent,
    AutoDemoBasicComponent,
    AutoDemoArrayComponent,
    AutoDemoCustomComponent,
    AutoDemoDisableComponent,
    AutoDemoDropdownComponent,
    AutoDemoObjectComponent
  ],
  providers: [],
})
export class AutoCompleteDemoModule {
}
