import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo.component';
import { DataTableModule } from 'ng-devui/data-table';
import { RelativeTimeModule } from '../relative-time.module';
import { I18nModule } from 'ng-devui/i18n';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { BasicComponent } from './basic/basic.component';

@NgModule({
  declarations: [DemoComponent, BasicComponent],
  imports: [
    CommonModule,
    DataTableModule,
    RelativeTimeModule,
    I18nModule,
    DevUICodeboxModule,
    DevUIApiModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: DemoComponent },

      {
        path: 'api', component: DevUIApiComponent, data: {
          api: require('!html-loader!markdown-loader!../doc/api.md')
        }
      }
    ])
  ]
})
export class DemoModule { }
