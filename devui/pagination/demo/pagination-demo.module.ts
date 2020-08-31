import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'ng-devui/button';
import { PaginationModule } from 'ng-devui/pagination';
import { PaginationDemoComponent } from './pagination-demo.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { AdditionalComponent } from './additional/additional.component';
import { LiteComponent } from './lite/lite.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';


@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    PaginationModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: PaginationDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
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

