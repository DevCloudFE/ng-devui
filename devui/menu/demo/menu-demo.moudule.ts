import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { ToggleModule } from 'ng-devui/toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { MenuDemoComponent } from './menu-demo.component';
import { BasicComponent } from './basic/basic.component';
import { MenuModule } from 'ng-devui/menu';
import { IconModule } from 'ng-devui/icon';
import { TooltipModule } from 'ng-devui/tooltip';
import { LoopMenuComponent } from './loop-menu/loop-menu.component';
import { LoopSubMenuComponent } from './loop-menu/loop-sub-menu.component';
import { ButtonModule } from 'ng-devui/button';

@NgModule({
  imports: [
  DDemoNavModule,
  CommonModule,
  TranslateModule,
  IconModule,
  ToggleModule,
  DevUICodeboxModule,
  ButtonModule,
  TooltipModule,
  DevUIApiModule,
  MenuModule,
  RouterModule.forChild([
    { path: '', redirectTo: 'demo', pathMatch: 'full' },
/*  {
                                 path: 'design',
                                 component: AccordionDesignComponent,
                               }, */
    { path: 'demo', component: MenuDemoComponent },
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
  exports: [],
  declarations: [
  MenuDemoComponent,
  BasicComponent,
  LoopMenuComponent,
  LoopSubMenuComponent,
  ]
  })
export class MenuDemoModule { }
