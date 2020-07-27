import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutDemoComponent } from './layout-demo.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { LayoutBasicComponent } from './basic/layout-basic.component';
import { LayoutTopComponent } from './top/top.component';
import { LayoutTopAsideComponent } from './top-aside/top-aside.component';
import { LayoutModule } from '../layout.module';
import { BreadcrumbModule } from 'ng-devui/breadcrumb';
import { AccordionModule } from 'ng-devui/accordion';

@NgModule({
  imports: [
    CommonModule,
    DevUIApiModule,
    DevUICodeboxModule,
    LayoutModule,
    BreadcrumbModule,
    AccordionModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: LayoutDemoComponent },
      {
        path: 'api',
        component: DevUIApiComponent,
        data: {
          api: require('!html-loader!markdown-loader!../doc/api.md'),
        },
      },
    ]),
  ],
  declarations: [LayoutDemoComponent, LayoutBasicComponent, LayoutTopComponent, LayoutTopAsideComponent],
})
export class LayoutDemoModule {}
