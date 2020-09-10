import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttDemoComponent } from './gantt-demo.component';
import { BasicComponent } from './basic/basic.component';
import { RouterModule } from '@angular/router';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DataTableModule } from 'ng-devui/data-table';
import { GanttModule } from 'ng-devui/gantt';
import { DevUIModule } from 'ng-devui/devui.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { I18nModule } from 'ng-devui/i18n';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
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
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: GanttDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ]
})
export class GanttDemoModule { }
