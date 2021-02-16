import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerConfigService } from './date-picker.config.service';

import { ButtonModule } from 'ng-devui/button';
import { DateRangePickerComponent } from './date-range-picker.component';
import { DateRangePickerDirective } from './date-range-picker.directive';
import { DatePickerAppendToBodyComponent } from './datepicker-cdk-overlay.component';
import { DatepickerComponent } from './datepicker.component';
import { DatepickerDirective } from './datepicker.directive';
import { SingleDateRangePickerComponent } from './single-date-range-picker.component';
import { TwoDatePickerEndDirective } from './two-datepicker/two-datepicker-end.directive';
import { TwoDatepickerSingleComponent } from './two-datepicker/two-datepicker-single.component';
import { TwoDatePickerStartDirective } from './two-datepicker/two-datepicker-start.directive';
import { TwoDatePickerComponent } from './two-datepicker/two-datepicker.component';

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
    DateRangePickerDirective,
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
    DateRangePickerDirective,
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
