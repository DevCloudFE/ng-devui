import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatePipe } from './date-pipe';
import { AutoFocusDirective } from './auto-focus.directive';
import { HelperUtils, SimulateATagDirective } from './helper-utils';
import { IframeEventPropagateDirective } from './iframe-event-propagate.directive';

@NgModule({
  imports: [CommonModule],
  exports: [
    AutoFocusDirective,
    DatePipe,
    SimulateATagDirective,
    IframeEventPropagateDirective
  ],
  declarations: [
    AutoFocusDirective,
    DatePipe,
    SimulateATagDirective,
    IframeEventPropagateDirective
  ]
  ,
  providers: [],
})
export class AveCommonModule {
}
