import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormModule } from 'ng-devui';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { SearchModule } from '../search.module';
import { BasicComponent } from './basic/basic.component';
import { IconLeftComponent } from './icon-left/icon-left.component';
import { NgmodelComponent } from './ngmodel/ngmodel.component';
import { SearchDemoComponent } from './search-demo.component';

@NgModule({
  imports: [
    TranslateModule,
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
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ],
  exports: [SearchDemoComponent],
  declarations: [
    SearchDemoComponent,
    BasicComponent,
    IconLeftComponent,
    NgmodelComponent,
  ],
  
})
export class SearchDemoModule {
}
