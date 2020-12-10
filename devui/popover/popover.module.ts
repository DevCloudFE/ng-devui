import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopoverComponent} from './popover.component';
import {PopoverDirective} from './popover.directive';
import {PositioningModule} from 'ng-devui/position';
import { OverlayContainerModule } from 'ng-devui/overlay-container';

@NgModule({
  imports: [
    CommonModule,
    PositioningModule,
    OverlayContainerModule
  ],
  exports: [PopoverComponent, PopoverDirective],
  declarations: [PopoverComponent, PopoverDirective],
  
})
export class PopoverModule {
}
