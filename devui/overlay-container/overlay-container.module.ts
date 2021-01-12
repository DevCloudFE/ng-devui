import { NgModule } from '@angular/core';
import { WindowRefModule } from 'ng-devui/window-ref';
import { OverlayContainerRef } from './overlay-container-ref';
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
