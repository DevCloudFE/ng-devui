import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'ng-devui/button';
import { PaginationModule } from 'ng-devui/pagination';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { AdditionalComponent } from './additional/additional.component';
import { BasicComponent } from './basic/basic.component';
import { LiteComponent } from './lite/lite.component';
import { PaginationDemoComponent } from './pagination-demo.component';
import { WidgetsComponent } from './widgets/widgets.component';


@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    ButtonModule,
    PaginationModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo', pathMatch: 'full' },
      { path: 'demo', component: PaginationDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ],
  exports: [PaginationDemoComponent],
  declarations: [
    PaginationDemoComponent,
    BasicComponent,
    AdditionalComponent,
    LiteComponent,
    WidgetsComponent
  ],

})
export class PaginationDemoModule {
}
