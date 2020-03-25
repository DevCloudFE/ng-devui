import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DatepickerModule } from 'ng-devui/datepicker';
import { DatepickerDemoComponent } from './datepicker-demo.component';
import { DCommonModule } from 'ng-devui/common';
import { SelectModule } from 'ng-devui/select';
import { ButtonModule } from 'ng-devui/button';
import { StickyModule } from '../../sticky';
import { AnchorModule } from '../../anchor';

import { DatepickerDemoBasicComponent } from './basic/basic.component';
import { DatepickerRangeComponent } from './range/datepicker-range.component';
import { DatepickerFormatComponent } from './format/datepicker-format.component';
import { DateRangePickerDisabledComponent } from './range-picker-disabled/date-range-picker-disabled.component';
import { DateRangePickerBasicComponent } from './range-picker-basic/date-range-picker-basic.component';
import { DateRangePickerRestrictedRangeComponent } from './range-picker-restricted-range/date-range-picker-restricted-range.component';
import { DateRangePickerTimeComponent } from './range-picker-time/date-range-picker-time.component';
import { RangeClearButtonComponent } from './range-clear-button/range-clear-button.component';
import { RangePickerTodayComponent } from './range-today/range-today.component';
import { CustomViewTemplateComponent } from './custom-view-template/custom-view-template.component';
import { DatepickerClearButtonComponent } from './clear-button/clear-button.component';
import { DatepickerButtonComponent } from './button/button.component';
import { TwoDatepickerBasicComponent } from './two-datepicker-basic/two-datepicker-basic.component';


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
    StickyModule,
    AnchorModule,
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
    TwoDatepickerBasicComponent,
  ],
  entryComponents: [DatepickerDemoComponent],
  providers: [],
})
export class DatepickerDemoModule { }
