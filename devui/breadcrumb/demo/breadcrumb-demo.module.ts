import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from '../breadcrumb.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { MenuComponent } from './menu/menu.component';
import { CustomComponent } from './custom/custom.component';
import { SearchMenuComponent } from './search-menu/search-menu.component';
import { BreadCrumbDemoComponent } from './breadcrumb-demo.component';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: BreadCrumbDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [
    BreadCrumbDemoComponent,
    BasicComponent,
    MenuComponent,
    CustomComponent,
    SearchMenuComponent
  ],
  declarations: [
    BreadCrumbDemoComponent,
    BasicComponent,
    MenuComponent,
    CustomComponent,
    SearchMenuComponent
  ]
})
export class BreadCrumbDemoModule { }
