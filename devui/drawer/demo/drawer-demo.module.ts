import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'ng-devui/button';
import { DrawerModule } from 'ng-devui/drawer';
import { ModalModule } from 'ng-devui/modal';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TextInputModule } from 'ng-devui/text-input';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { DrawerDemoComponent } from './drawer-demo.component';
import { DrawerContentComponent } from './drawerContent/drawer-content.component';
import { TemplateComponent } from './template/template.component';
import { UndestroyableComponent } from './undestroyable/undestroyable.component';

@NgModule({
  imports: [
    TranslateModule,
    DrawerModule,
    CommonModule,
    ButtonModule,
    DevUICodeboxModule,
    DevUIApiModule,
    ModalModule,
    DDemoNavModule,
    TextInputModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: DrawerDemoComponent },
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
  declarations: [DrawerDemoComponent, BasicComponent, UndestroyableComponent, DrawerContentComponent, TemplateComponent],
  
})
export class DrawerDemoModule {}
