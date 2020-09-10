import { NgModule } from '@angular/core';
import { OverlayContainerRef } from './overlay-container-ref';
import { WindowRefModule } from 'ng-devui/window-ref';
@NgModule({
  imports: [WindowRefModule],
  exports: [],
  declarations: [],
  providers: [
    OverlayContainerRef,
  ],
})
export class OverlayContainerModule {
}
