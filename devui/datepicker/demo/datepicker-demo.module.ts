import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'ng-devui/button';
import { DatepickerModule } from 'ng-devui/datepicker';
import { SelectModule } from 'ng-devui/select';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { DatepickerDemoAppendToBodyComponent } from './append-to-body/append-to-body.component';
import { DatepickerDemoBasicComponent } from './basic/basic.component';
import { DatepickerButtonComponent } from './button/button.component';
import { DatepickerClearButtonComponent } from './clear-button/clear-button.component';
import { CustomViewTemplateComponent } from './custom-view-template/custom-view-template.component';
import { DatepickerDemoComponent } from './datepicker-demo.component';
import { DatepickerFormatComponent } from './format/datepicker-format.component';
import { DatepickerDemoMinMaxComponent } from './min-max/min-max.component';
import { RangeClearButtonComponent } from './range-clear-button/range-clear-button.component';
import { DateRangePickerBasicComponent } from './range-picker-basic/date-range-picker-basic.component';
import { DateRangePickerDisabledComponent } from './range-picker-disabled/date-range-picker-disabled.component';
import { DateRangePickerFormatComponent } from './range-picker-format/date-range-picker-format.component';
import { DateRangePickerRestrictedRangeComponent } from './range-picker-restricted-range/date-range-picker-restricted-range.component';
import { DateRangePickerTimeComponent } from './range-picker-time/date-range-picker-time.component';
import { RangePickerTodayComponent } from './range-today/range-today.component';
import { DatepickerRangeComponent } from './range/datepicker-range.component';
import { SetModeComponent } from './set-mode/set-mode.component';
import { TwoDatepickerBasicComponent } from './two-datepicker-basic/two-datepicker-basic.component';
import { TwoDatepickerFormatComponent } from './two-datepicker-format/two-datepicker-format.component';
@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    DatepickerModule,
    DevUICodeboxModule,
    SelectModule,
    ButtonModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: DatepickerDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ],
  exports: [DatepickerDemoComponent],
  declarations: [
    DatepickerDemoComponent,
    DatepickerDemoBasicComponent,
    SetModeComponent,
    DatepickerRangeComponent,
    DatepickerFormatComponent,
    DateRangePickerDisabledComponent,
    DateRangePickerBasicComponent,
    DateRangePickerRestrictedRangeComponent,
    DateRangePickerTimeComponent,
    RangeClearButtonComponent,
    RangePickerTodayComponent,
    CustomViewTemplateComponent,
    DatepickerClearButtonComponent,
    DatepickerButtonComponent,
    DatepickerDemoMinMaxComponent,
    DatepickerDemoAppendToBodyComponent,
    DateRangePickerFormatComponent,
    TwoDatepickerBasicComponent,
    TwoDatepickerFormatComponent,
  ],

  providers: [],
})
export class DatepickerDemoModule { }
