import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'ng-devui/breadcrumb';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { BreadCrumbDemoComponent } from './breadcrumb-demo.component';
import { CustomComponent } from './custom/custom.component';
import { MenuComponent } from './menu/menu.component';
import { SourceConfigComponent } from './source-config/source-config.component';

@NgModule({
  imports: [
    TranslateModule,
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
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ],
  exports: [
    BreadCrumbDemoComponent,
    BasicComponent,
    MenuComponent,
    CustomComponent,
    SourceConfigComponent
  ],
  declarations: [
    BreadCrumbDemoComponent,
    BasicComponent,
    MenuComponent,
    CustomComponent,
    SourceConfigComponent
  ]
})
export class BreadCrumbDemoModule { }
