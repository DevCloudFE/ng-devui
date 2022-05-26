import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { SelectModule } from 'ng-devui/select';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { CheckboxBasicComponent } from './basic/checkbox-basic.component';
import { CheckBoxDemoComponent } from './checkbox-demo.component';
import { CheckboxConditionChangeComponent } from './condition-change/condition-change.component';
import { CheckboxConditionGroupComponent } from './condition-group/condition-group.component';
import { CheckboxGroupBasicComponent } from './group/checkbox-group-basic.component';


@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    CheckBoxModule,
    SelectModule,
    DevUIApiModule,
    DevUICodeboxModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: CheckBoxDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ],
  exports: [CheckBoxDemoComponent],
  declarations: [
    CheckBoxDemoComponent,
    CheckboxBasicComponent,
    CheckboxGroupBasicComponent,
    CheckboxConditionChangeComponent,
    CheckboxConditionGroupComponent
  ],

})
export class CheckBoxDemoModule {
}
