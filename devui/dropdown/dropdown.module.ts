import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WindowRefModule } from 'ng-devui/window-ref';
import { DropDownMenuItemDirective } from './dropdown-item.directive';
import { DropDownMenuDirective } from './dropdown-menu.directive';
import { DropDownToggleDirective } from './dropdown-toggle.directive';
import { DropDownAppendToBodyComponent } from './dropdown.component';
import { DropDownDirective } from './dropdown.directive';

@NgModule({
  imports: [CommonModule, OverlayModule, WindowRefModule],
  exports: [DropDownDirective, DropDownMenuItemDirective, DropDownMenuDirective, DropDownToggleDirective, DropDownAppendToBodyComponent],
  declarations: [
    DropDownDirective,
    DropDownMenuItemDirective,
    DropDownMenuDirective,
    DropDownToggleDirective,
    DropDownAppendToBodyComponent,
  ],
})
export class DropDownModule {}
