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
import { LoopMenuComponent } from './loop/loop-menu/loop-menu.component';
import { LoopSubMenuComponent } from './loop/loop-menu/loop-sub-menu.component';
import { ButtonModule } from 'ng-devui/button';
import { OpenCloseComponent } from './open-close/open-close.component';
import { OpenOneComponent } from './open-one/open-one.component';
import { LoopComponent } from './loop/loop.component';
import { CustomNodeComponent } from './custom-node/custom-node.component';
import { AutoExpandComponent } from './auto-expand/auto-expand.component';

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
  OpenCloseComponent,
  OpenOneComponent,
  CustomNodeComponent,
  AutoExpandComponent,
  LoopComponent,
  LoopMenuComponent,
  LoopSubMenuComponent,
  ]
  })
export class MenuDemoModule { }
