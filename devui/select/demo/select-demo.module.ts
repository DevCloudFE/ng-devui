import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { SelectModule } from '../select.module';
import { SelectDemoComponent } from './select-demo.component';
import { SelectDemoBasicComponent } from './basic/select-demo-basic.component';
import { SelectDemoObjectComponent } from './custom-search/select-demo-object.component';
import { SelectDemoAllComponent } from './select-all/select-demo-all.component';
import { SelectDemoTemplateComponent } from './item-template/select-demo-template.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    SelectModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: SelectDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [
    SelectDemoComponent
  ],
  declarations: [
    SelectDemoComponent,
    SelectDemoBasicComponent,
    SelectDemoObjectComponent,
    SelectDemoAllComponent,
    SelectDemoTemplateComponent
  ],
  entryComponents: [
    SelectDemoComponent
  ],
  providers: [],
})
export class SelectDemoModule { }
