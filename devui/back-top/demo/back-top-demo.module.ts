import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { TooltipModule } from 'ng-devui/tooltip';
import { ToggleModule } from 'ng-devui/toggle';

import { BackTopModule } from '../back-top.module';
import { BackTopDemoComponent } from './back-top-demo.component';
import { BasicComponent } from './basic/basic.component';
import { CustomizeComponent } from './customize/customize.component';
import { ScrollContainerComponent } from './scroll-container/scroll-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DevUIApiModule,
    DevUICodeboxModule,
    DDemoNavModule,
    TooltipModule,
    ToggleModule,
    BackTopModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: BackTopDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [BackTopDemoComponent],
  declarations: [
    BackTopDemoComponent,
    BasicComponent,
    CustomizeComponent,
    ScrollContainerComponent
  ]
})

export class BackTopDemoModule {
}
