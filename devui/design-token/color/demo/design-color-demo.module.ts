import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'ng-devui/data-table';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TabsModule } from 'ng-devui/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { ColorComponent } from './color/color.component';
import { DesignColorDemoComponent } from './design-color-demo.component';
@NgModule({
  declarations: [DesignColorDemoComponent, ColorComponent],
  imports: [
    TranslateModule,
    CommonModule,
    DevUIApiModule,
    DevUICodeboxModule,
    DataTableModule,
    DDemoNavModule,
    TabsModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: DesignColorDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ]
})
export class DesignColorDemoModule { }
