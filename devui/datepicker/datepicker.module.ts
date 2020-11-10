import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { DatePickerConfigService } from './date-picker.config.service';

import { DatepickerComponent } from './datepicker.component';
import { DatepickerDirective } from './datepicker.directive';
import { ButtonModule } from 'ng-devui/button';
import { DatePickerAppendToBodyComponent } from './datepicker-cdk-overlay.component';
import { DateRangePickerComponent } from './date-range-picker.component';
import { SingleDateRangePickerComponent } from './single-date-range-picker.component';
import { TwoDatePickerComponent } from './two-datepicker/two-datepicker.component';
import { TwoDatepickerSingleComponent } from './two-datepicker/two-datepicker-single.component';
import { TwoDatePickerStartDirective } from './two-datepicker/two-datepicker-start.directive';
import { TwoDatePickerEndDirective } from './two-datepicker/two-datepicker-end.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    ButtonModule
  ],
  exports: [
    DatepickerComponent,
    DatepickerDirective,
    DatePickerAppendToBodyComponent,
    DateRangePickerComponent,
    SingleDateRangePickerComponent,
    TwoDatePickerComponent,
    TwoDatepickerSingleComponent,
    TwoDatePickerStartDirective,
    TwoDatePickerEndDirective
  ],
  declarations: [
    DatepickerComponent,
    DatepickerDirective,
    DatePickerAppendToBodyComponent,
    DateRangePickerComponent,
    SingleDateRangePickerComponent,
    TwoDatePickerComponent,
    TwoDatepickerSingleComponent,
    TwoDatePickerStartDirective,
    TwoDatePickerEndDirective
  ],

  providers: [DatePickerConfigService]
})
export class DatepickerModule {
}
