import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DevUIModule } from 'ng-devui';
import { DataTableModule } from 'ng-devui/data-table';
import { FullscreenModule } from 'ng-devui/fullscreen';
import { GanttModule } from 'ng-devui/gantt';
import { I18nModule } from 'ng-devui/i18n';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { GanttDemoComponent } from './gantt-demo.component';
import { ResetPositionComponent } from './table/reset-position/reset-position.component';
import { TableComponent } from './table/table.component';
@NgModule({
  declarations: [GanttDemoComponent, BasicComponent, ResetPositionComponent, TableComponent],
  imports: [
    CommonModule,
    DevUIApiModule,
    DataTableModule,
    GanttModule,
    DevUIModule,
    DevUICodeboxModule,
    I18nModule,
    DDemoNavModule,
    TranslateModule,
    FullscreenModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: GanttDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ]
})
export class GanttDemoModule { }
