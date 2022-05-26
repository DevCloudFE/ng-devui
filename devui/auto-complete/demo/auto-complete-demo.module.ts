import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DevUIModule } from 'ng-devui';
import { AutoCompleteModule } from 'ng-devui/auto-complete';
import { ButtonModule } from 'ng-devui/button';
import { FormModule } from 'ng-devui/form';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { AutoDemoArrayComponent } from './array/auto-complete-demo-array.component';
import { AutoCompleteDemoComponent } from './auto-complete-demo.component';
import { AutoDemoBasicComponent } from './basic/auto-complete-demo-basic.component';
import { AutoDemoCustomComponent } from './custom/auto-complete-demo-custom.component';
import { AutoDemoDisableComponent } from './disabled/auto-complete-demo-disable.component';
import { AutoDemoDropdownComponent } from './dropdown/auto-complete-demo-dropdown.component';
import { AutoDemoLatestComponent } from './latest/auto-complete-demo-latest.component';
import { AutoDemoLazyLoadComponent } from './lazy-load/auto-complete-demo-lazy-load.component';
import { AutoDemoObjectComponent } from './object/auto-complete-demo-object.component';

@NgModule({
  imports: [
    TranslateModule,
    DevUIModule,
    CommonModule,
    AutoCompleteModule,
    FormsModule,
    FormModule,
    DevUICodeboxModule,
    DevUIApiModule,
    ButtonModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: AutoCompleteDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
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
    AutoDemoObjectComponent,
    AutoDemoLatestComponent,
    AutoDemoLazyLoadComponent
  ],
  providers: []
})
export class AutoCompleteDemoModule { }
