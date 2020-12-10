import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SafePipeModule } from 'ng-devui/utils';
import { TimeAxisComponent } from './time-axis.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SafePipeModule
  ],
  exports: [
    TimeAxisComponent,
  ],
  declarations: [
    TimeAxisComponent,
  ],
  providers: []
})
export class TimeAxisModule {}
