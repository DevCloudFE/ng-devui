import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip.component';
import { PortalModule } from '../portal';
import { TooltipDirective } from './tooltip.directive';
import { WindowRef } from '../window-ref/window-ref.service';
import { DocumentRef } from '../window-ref/document-ref.service';
import { PositionService } from '../position';
import { OverlayContainerRef } from '../overlay-container';

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
  ],
  exports: [TooltipComponent, TooltipDirective],
  declarations: [TooltipComponent, TooltipDirective],
  providers: [
    WindowRef,
    DocumentRef,
    PositionService,
    OverlayContainerRef,
  ],
  entryComponents: [TooltipComponent]
})
export class TooltipModule {
}
