import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { DatepickerComponent } from './datepicker.component';
import { DatepickerDirective } from './datepicker.directive';
import { ButtonModule } from 'ng-devui/button';
import { DatePickerAppendToBodyComponent } from './datepicker-cdk-overlay.component';
import { DevUIConfig } from 'ng-devui/devui.config';

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
  ],
  declarations: [
    DatepickerComponent,
    DatepickerDirective,
    DatePickerAppendToBodyComponent,
  ],
  entryComponents: [DatepickerComponent],
  providers: [
    DevUIConfig,
  ],
})
export class DatepickerModule {
}
