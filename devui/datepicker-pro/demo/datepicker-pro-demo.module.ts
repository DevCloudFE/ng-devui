import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AutoCompleteModule } from 'ng-devui/auto-complete';
import { ButtonModule } from 'ng-devui/button';
import { DatepickerProModule } from 'ng-devui/datepicker-pro';
import { DropDownModule } from 'ng-devui/dropdown';
import { InputNumberModule } from 'ng-devui/input-number';
import { RadioModule } from 'ng-devui/radio';
import { SelectModule } from 'ng-devui/select';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TabsModule } from 'ng-devui/tabs';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { BasicDatepickerProComponent } from './basic/basic-datepicker-pro.component';
import { DatepickerProDemoComponent } from './datepicker-pro-demo.component';
import { DatepickerProHostComponent } from './host-template/datepicker-host-template.component';
import { MonthYearDatepickerProComponent } from './month-year-picker/month-year-picker.component';
import { RangeTemplatePickerComponent } from './range-template/range-template.component';
import { RangeTypepickerProComponent } from './range-type/range-type-picker.component';
import { SelectDatepickerDemoComponent } from './select-type/select-type.component';
import { ShowTimeDatepickerProComponent } from './show-time/show-time-picker.component';
import { DatepickerProStaticPanelComponent } from './static-panel/datepicker-pro-static-panel.component';
import { DatepickerProTabTypeComponent } from './tab-type/datepicker-pro-tab-type.component';
import { DatepickerProTemplateComponent } from './template/datepicker-template.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    DevUIApiModule,
    DevUICodeboxModule,
    ButtonModule,
    DropDownModule,
    TabsModule,
    RadioModule,
    InputNumberModule,
    SelectModule,
    DDemoNavModule,
    DatepickerProModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: DatepickerProDemoComponent },
      {
        path: 'api',
        component: DevUIApiComponent,
        data: {
          'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
          'en-us': require('!html-loader!markdown-loader!../doc/api-en.md'),
        },
      },
    ]),
  ],
  exports: [DatepickerProDemoComponent],
  declarations: [
    DatepickerProDemoComponent,
    BasicDatepickerProComponent,
    ShowTimeDatepickerProComponent,
    DatepickerProTemplateComponent,
    MonthYearDatepickerProComponent,
    RangeTypepickerProComponent,
    DatepickerProHostComponent,
    RangeTemplatePickerComponent,
    DatepickerProStaticPanelComponent,
    SelectDatepickerDemoComponent,
    DatepickerProTabTypeComponent
  ],
  providers: [],

})
export class DatepickerProDemoModule {}
