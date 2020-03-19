import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckBoxDemoComponent } from './checkbox-demo.component';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { SelectModule } from 'ng-devui/select';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { CheckboxDemoBasicComponent } from './basic/checkbox-basic.component';
import { CheckboxDemoGroupComponent} from './group/checkbox-demo-group.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CheckBoxModule,
    SelectModule,
    DevUIApiModule,
    DevUICodeboxModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: CheckBoxDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md'),
      }}
    ])
  ],
  exports: [CheckBoxDemoComponent],
  declarations: [
    CheckBoxDemoComponent,
    CheckboxDemoBasicComponent,
    CheckboxDemoGroupComponent,
  ],
  entryComponents: [
    CheckBoxDemoComponent,
  ],
})
export class CheckBoxDemoModule {
}

