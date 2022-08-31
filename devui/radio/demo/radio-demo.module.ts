import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RadioModule } from 'ng-devui/radio';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { ConditionChangeComponent } from './condition-change/condition-change.component';
import { ConditionRadioGroupComponent } from './condition-radio-group/condition-radio-group.component';
import { CustomComponent } from './custom/custom.component';
import { DisabledComponent } from './disabled/disabled.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { RadioDemoComponent } from './radio-demo.component';
import { VerticalComponent } from './vertical/vertical.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    RadioModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo', pathMatch: 'full' },
      { path: 'demo', component: RadioDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ],
  exports: [RadioDemoComponent],
  declarations: [
    RadioDemoComponent,
    BasicComponent,
    ConditionChangeComponent,
    ConditionRadioGroupComponent,
    DisabledComponent,
    HorizontalComponent,
    VerticalComponent,
    CustomComponent,
  ],

})
export class RadioDemoModule {
}
