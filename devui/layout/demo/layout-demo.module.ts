import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ng-devui/accordion';
import { BreadcrumbModule } from 'ng-devui/breadcrumb';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { LayoutModule } from '../layout.module';
import { LayoutBasicComponent } from './basic/layout-basic.component';
import { LayoutDemoComponent } from './layout-demo.component';
import { LayoutTopAsideComponent } from './top-aside/top-aside.component';
import { LayoutTopComponent } from './top/top.component';

@NgModule({
  imports: [
    CommonModule,
    DevUIApiModule,
    DevUICodeboxModule,
    LayoutModule,
    BreadcrumbModule,
    AccordionModule,
    TranslateModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: LayoutDemoComponent },
      {
        path: 'api',
        component: DevUIApiComponent,
        data: {
          'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
          'en-us': require('!html-loader!markdown-loader!../doc/api-en.md'),
        },
      },
    ]),
  ],
  declarations: [LayoutDemoComponent, LayoutBasicComponent, LayoutTopComponent, LayoutTopAsideComponent],
})
export class LayoutDemoModule {}
