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
import { DesignFontDemoComponent } from './design-font-demo.component';
import { FontDesignComponent } from './font-design.component';
import { FontComponent } from './font/font.component';
@NgModule({
  declarations: [DesignFontDemoComponent, FontComponent],
  imports: [
    TranslateModule,
    CommonModule,
    DevUIApiModule,
    DevUICodeboxModule,
    DataTableModule,
    DDemoNavModule,
    TabsModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo', pathMatch: 'full' },
      {
        path: 'design',
        component: FontDesignComponent,
      },
      { path: 'demo', component: DesignFontDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ]
})
export class DesignFontDemoModule { }
