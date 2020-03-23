import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopoverComponent} from './popover.component';
import {PopoverDirective} from './popover.directive';
import {PositioningModule} from 'ng-devui/position';

@NgModule({
  imports: [
    CommonModule,
    PositioningModule
  ],
  exports: [PopoverComponent, PopoverDirective],
  declarations: [PopoverComponent, PopoverDirective],
  entryComponents: [PopoverComponent]
})
export class PopoverModule {
}
