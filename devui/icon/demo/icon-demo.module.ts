import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'ng-devui/data-table';
import { DropDownModule } from 'ng-devui/dropdown';
import { I18nModule } from 'ng-devui/i18n';
import { IconModule } from 'ng-devui/icon';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { IconDemoComponent } from './icon-demo.component';
import { IconGroupDemoComponent } from './icon-group/icon-group.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    DDemoNavModule,
    DevUICodeboxModule,
    IconModule,
    FormsModule,
    I18nModule,
    DataTableModule,
    DropDownModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: IconDemoComponent },
      {
        path: 'api', component: DevUIApiComponent, data: {
          'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
          'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
        }
      },
    ]),
  ],
  declarations: [BasicComponent, IconDemoComponent, IconGroupDemoComponent],
})
export class IconDemoModule { }
