import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip.component';
import { PortalModule } from 'ng-devui/portal';
import { TooltipDirective } from './tooltip.directive';
import { WindowRef } from 'ng-devui/window-ref';
import { DocumentRef } from 'ng-devui/window-ref';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import {PositioningModule} from 'ng-devui/position';

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    PositioningModule
  ],
  exports: [TooltipComponent, TooltipDirective],
  declarations: [TooltipComponent, TooltipDirective],
  providers: [
    WindowRef,
    DocumentRef,
    OverlayContainerRef,
  ],
  entryComponents: [TooltipComponent]
})
export class TooltipModule {
}
