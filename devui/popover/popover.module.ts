import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { OverlayContainerModule } from 'ng-devui/overlay-container';
import {PositioningModule} from 'ng-devui/position';
import {PopoverComponent} from './popover.component';
import {PopoverDirective} from './popover.directive';

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
