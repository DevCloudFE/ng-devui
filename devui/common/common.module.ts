import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutoFocusDirective } from './auto-focus.directive';
import { ClipboardDirective } from './clipboard.directive';
import { DatePipe } from './date-pipe';
import { SimulateATagDirective } from './helper-utils';
import { IframeEventPropagateDirective } from './iframe-event-propagate.directive';

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
