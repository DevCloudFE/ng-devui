import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AnchorModule, ButtonModule, DrawerModule, DropDownModule, FormModule,
  SearchModule, TabsModule, ToggleModule
} from 'ng-devui';
import { DashboardModule } from 'ng-devui/dashboard';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { DashboardDemoComponent } from './dashboard-demo.component';
import { MoreConfigComponent } from './more-config/more-config.component';


@NgModule({
  declarations: [
    DashboardDemoComponent,
    BasicComponent,
    MoreConfigComponent
  ],
  exports: [DashboardDemoComponent],
  imports: [
    CommonModule,
    FormsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    ButtonModule,
    AnchorModule,
    ToggleModule,
    TranslateModule,
    DropDownModule,
    DDemoNavModule,
    DashboardModule,
    FormModule,
    SearchModule,
    DrawerModule,
    TabsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo', pathMatch: 'full' },
      { path: 'demo', component: DashboardDemoComponent },
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ]
})
export class DashboardDemoModule { }
