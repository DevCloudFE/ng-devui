import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { DatePipe } from './date-pipe';
import { AutoFocusDirective } from './auto-focus.directive';
import { SimulateATagDirective } from './helper-utils';
import { IframeEventPropagateDirective } from './iframe-event-propagate.directive';
import { ClipboardDirective } from './clipboard.directive';

@NgModule({
  imports: [
    CommonModule,
    ClipboardModule
  ],
  exports: [
    AutoFocusDirective,
    DatePipe,
    SimulateATagDirective,
    IframeEventPropagateDirective,
    ClipboardDirective
  ],
  declarations: [
    AutoFocusDirective,
    DatePipe,
    SimulateATagDirective,
    IframeEventPropagateDirective,
    ClipboardDirective
  ],
  providers: [],
})
export class DCommonModule {
}
