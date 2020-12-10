import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchModule } from '../search.module';
import { SearchDemoComponent } from './search-demo.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { FormModule } from 'ng-devui';
import { BasicComponent } from './basic/basic.component';
import { NgmodelComponent } from './ngmodel/ngmodel.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SearchModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    FormModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: SearchDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [SearchDemoComponent],
  declarations: [
    SearchDemoComponent,
    BasicComponent,
    NgmodelComponent,
  ],
  
})
export class SearchDemoModule {
}

