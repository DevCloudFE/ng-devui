import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DatepickerModule } from 'ng-devui/datepicker';
import { DatepickerDemoComponent } from './datepicker-demo.component';
import { DatepickerDemoBasicComponent } from './basic/basic.component';
import { DCommonModule } from 'ng-devui/common';
import { DatepickerDemoFormatComponent } from './format/datepicker-demo-format.component';
import { SelectModule } from 'ng-devui/select';
import { ButtonModule } from 'ng-devui/button';


@NgModule({
  imports: [
    DCommonModule,
    CommonModule,
    FormsModule,
    DatepickerModule,
    DevUICodeboxModule,
    SelectModule,
    ButtonModule,
    DevUIApiModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: DatepickerDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [DatepickerDemoComponent],
  declarations: [
    DatepickerDemoComponent,
    DatepickerDemoBasicComponent,
    DatepickerDemoFormatComponent
  ],
  entryComponents: [DatepickerDemoComponent],
  providers: [],
})
export class DatepickerDemoModule { }
