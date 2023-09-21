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

@NgModule({
  imports: [
  DDemoNavModule,
  CommonModule,
  TranslateModule,
  ToggleModule,
  DevUICodeboxModule,
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
  ]
  })
export class MenuDemoModule { }
