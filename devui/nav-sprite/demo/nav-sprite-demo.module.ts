import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavSpriteModule } from 'ng-devui/nav-sprite';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { NavSpriteDemoComponent } from './nav-sprite-demo.component';
import { ScrollContainerComponent } from './scroll-container/scroll-container.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    DevUIApiModule,
    DevUICodeboxModule,
    DDemoNavModule,
    NavSpriteModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: NavSpriteDemoComponent },
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
  declarations: [NavSpriteDemoComponent, BasicComponent, ScrollContainerComponent]
})
export class NavSpriteDemoModule { }
