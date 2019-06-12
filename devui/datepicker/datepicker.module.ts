import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DatepickerComponent } from './datepicker.component';
import { DatepickerDirective } from './datepicker.directive';
import {ButtonModule} from '../button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule
  ],
  exports: [
    DatepickerComponent,
    DatepickerDirective,
  ],
  declarations: [
    DatepickerComponent,
    DatepickerDirective,
  ],
  entryComponents: [DatepickerComponent],
  providers: [],
})
export class DatepickerModule {
}
