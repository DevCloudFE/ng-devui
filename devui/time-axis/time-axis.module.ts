import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SafePipeModule } from 'ng-devui/utils';
import { TimeAxisItemComponent } from './time-axis-item/time-axis-item.component';
import { TimeAxisComponent } from './time-axis.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SafePipeModule
  ],
  exports: [
    TimeAxisComponent,
    TimeAxisItemComponent
  ],
  declarations: [
    TimeAxisComponent,
    TimeAxisItemComponent
  ],
  providers: []
})
export class TimeAxisModule {}
