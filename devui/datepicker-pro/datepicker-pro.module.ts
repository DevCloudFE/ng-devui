import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'ng-devui/button';
import { DropDownModule } from 'ng-devui/dropdown';
import { PopoverModule } from 'ng-devui/popover';
import { DatepickerPanelComponent } from './datepicker-panel.component';
import { DatepickerProCalendarComponent } from './datepicker-pro-calendar.component';
import { DatepickerProComponent } from './datepicker-pro.component';
import { DatepickerProCommonDataService } from './datepicker-pro.service';
import { CalendarPanelComponent } from './lib/calendar-panel.component';
import { FooterPanelComponent } from './lib/footer-panel.component';
import { MonthPanelComponent } from './lib/month-panel.component';
import { TimepickerPanelComponent } from './lib/timepicker-panel.component';
import { YearPanelComponent } from './lib/year-panel.component';
import { RangeDatepickerProComponent } from './range-datepicker-pro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DropDownModule,
    ScrollingModule,
    ButtonModule,
    PopoverModule
  ],
  exports: [
    DatepickerProComponent,
    DatepickerPanelComponent,
    RangeDatepickerProComponent,
    DatepickerProCalendarComponent
  ],
  declarations: [
    DatepickerProComponent,
    DatepickerPanelComponent,
    TimepickerPanelComponent,
    FooterPanelComponent,
    CalendarPanelComponent,
    MonthPanelComponent,
    YearPanelComponent,
    RangeDatepickerProComponent,
    DatepickerProCalendarComponent
  ],
  providers: [
    DatepickerProCommonDataService
  ]
})
export class DatepickerProModule {
}
