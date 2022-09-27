import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DatePipe } from './date-pipe';
import { SafeNullPipe } from './safe-null.pipe';

import { SimulateATagDirective } from './helper-utils';
import { ClipboardDirective } from './clipboard.directive';
import { AutoFocusDirective } from './auto-focus.directive';
import { IframeEventPropagateDirective } from './iframe-event-propagate.directive';

@NgModule({
  imports: [CommonModule, ClipboardModule],
  exports: [
    DatePipe,
    SafeNullPipe,
    AutoFocusDirective,
    SimulateATagDirective,
    IframeEventPropagateDirective,
    ClipboardDirective,
  ],
  declarations: [
    DatePipe,
    SafeNullPipe,
    AutoFocusDirective,
    SimulateATagDirective,
    IframeEventPropagateDirective,
    ClipboardDirective,
  ],
  providers: [],
})
export class DCommonModule {}
