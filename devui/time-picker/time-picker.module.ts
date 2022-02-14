import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'ng-devui/button';

import { TimePickerComponent } from './time-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    ButtonModule
  ],
  exports: [
    TimePickerComponent
  ],
  declarations: [
    TimePickerComponent
  ],
  providers: [],

})
export class TimePickerModule {}
