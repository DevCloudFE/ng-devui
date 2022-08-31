import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SelectModule } from 'ng-devui/select';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TimePickerModule } from 'ng-devui/time-picker';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { CustomComponent } from './custom/custom.component';
import { FormatComponent } from './format/format.component';
import { TimePickerDemoComponent } from './time-picker-demo.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    TimePickerModule,
    SelectModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo', pathMatch: 'full' },
      { path: 'demo', component: TimePickerDemoComponent },
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      } }
    ])
  ],
  exports: [
    TimePickerDemoComponent
  ],
  declarations: [
    TimePickerDemoComponent,
    BasicComponent,
    FormatComponent,
    CustomComponent,
  ],
  providers: [],
})
export class TimePickerDemoModule {}
