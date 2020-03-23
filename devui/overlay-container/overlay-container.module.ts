import { NgModule } from '@angular/core';
import { OverlayContainerRef } from './overlay-container-ref';

import { DocumentRef } from 'ng-devui/window-ref';
import { WindowRef } from 'ng-devui/window-ref';
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
