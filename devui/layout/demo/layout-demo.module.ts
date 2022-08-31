import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ng-devui/accordion';
import { BreadcrumbModule } from 'ng-devui/breadcrumb';
import { LayoutModule } from 'ng-devui/layout';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { LayoutBasicComponent } from './basic/layout-basic.component';
import { AloneFlexComponent } from './grid/alone-flex/alone-flex.component';
import { AloneSpaceGutterComponent } from './grid/alone-space-gutter/alone-space-gutter.component';
import { ClassDemoComponent } from './grid/class-demo/class-demo.component';
import { ConfiguratorDemoComponent } from './grid/configurator-demo/configurator-demo.component';
import { FlexAlignJustifyComponent } from './grid/flex-align-justify/flex-align-justify.component';
import { FlexOrderComponent } from './grid/flex-order/flex-order.component';
import { FlexWrapComponent } from './grid/flex-wrap/flex-wrap.component';
import { GridBasicComponent } from './grid/grid-basic/grid-basic.component';
import { GridColsComponent } from './grid/grid-cols/grid-cols.component';
import { GridGutterComponent } from './grid/grid-gutter/grid-gutter.component';
import { GridOffsetComponent } from './grid/grid-offset/grid-offset.component';
import { GridPullPushComponent } from './grid/grid-pull-push/grid-pull-push.component';
import { GridSpaceComponent } from './grid/grid-space/grid-space.component';
import { ResposiveDemoComponent } from './grid/resposive-demo/resposive-demo.component';
import { StyleDemoComponent } from './grid/style-demo/style-demo.component';
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
      { path: '', redirectTo: 'demo', pathMatch: 'full' },
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
  declarations: [
    LayoutDemoComponent,
    LayoutBasicComponent,
    LayoutTopComponent,
    LayoutTopAsideComponent,
    GridBasicComponent,
    GridColsComponent,
    GridOffsetComponent,
    GridPullPushComponent,
    FlexAlignJustifyComponent,
    FlexOrderComponent,
    FlexWrapComponent,
    AloneSpaceGutterComponent,
    StyleDemoComponent,
    ClassDemoComponent,
    ResposiveDemoComponent,
    ConfiguratorDemoComponent,
    GridGutterComponent,
    GridSpaceComponent,
    AloneFlexComponent
  ],
})
export class LayoutDemoModule { }
