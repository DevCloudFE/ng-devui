import { NgModule } from '@angular/core';
import { OverlayContainerRef } from './overlay-container-ref';

import { DocumentRef } from '../window-ref/document-ref.service';
import { WindowRef } from '../window-ref/window-ref.service';
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    OverlayContainerRef,
    DocumentRef,
    WindowRef
  ],
})
export class OverlayContainerModule {
}
