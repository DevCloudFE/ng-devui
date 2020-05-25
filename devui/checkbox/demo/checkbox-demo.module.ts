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

import { CheckboxBasicComponent } from './basic/checkbox-basic.component';
import { CheckboxGroupBasicComponent} from './group/checkbox-group-basic.component';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';

@NgModule({
  imports: [
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
        api: require('!html-loader!markdown-loader!../doc/api.md'),
      }}
    ])
  ],
  exports: [CheckBoxDemoComponent],
  declarations: [
    CheckBoxDemoComponent,
    CheckboxBasicComponent,
    CheckboxGroupBasicComponent,
  ],
  entryComponents: [
    CheckBoxDemoComponent,
  ],
})
export class CheckBoxDemoModule {
}

