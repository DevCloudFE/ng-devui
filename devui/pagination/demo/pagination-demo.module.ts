import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '../../button/index';
import { PaginationModule } from '../pagination.module';
import { PaginationDemoComponent } from './pagination-demo.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { SpecialComponent } from './special/special.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    PaginationModule,
    DevUICodeboxModule,
    DevUIApiModule,
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
    SpecialComponent,
  ],
  entryComponents: [
    PaginationDemoComponent,
  ],
})
export class PaginationDemoModule {
}

