import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'ng-devui/button';
import { PanelModule } from 'ng-devui/panel';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { ConditionChangeComponent } from './condition-change/condition-change.component';
import { PanelDemoComponent } from './panel-demo.component';
import { PanelDesignComponent } from './panel-design.component';
import { TypeComponent } from './type/type.component';

@NgModule({
  imports: [
    TranslateModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    PanelModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo', pathMatch: 'full' },
      {
        path: 'design',
        component: PanelDesignComponent,
      },
      { path: 'demo', component: PanelDemoComponent },
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
  exports: [PanelDemoComponent],
  declarations: [PanelDemoComponent, PanelDesignComponent, BasicComponent, ConditionChangeComponent, TypeComponent, PanelDemoComponent],

})
export class PanelDemoModule {}
