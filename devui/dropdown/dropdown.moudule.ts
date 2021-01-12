import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WindowRefModule } from 'ng-devui/window-ref';
import { DropDownMenuDirective } from './dropdown-menu.directive';
import { DropDownToggleDirective } from './dropdown-toggle.directive';
import { DropDownAppendToBodyComponent } from './dropdown.component';
import { DropDownDirective } from './dropdown.directive';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    WindowRefModule
  ],
  exports: [
    DropDownDirective,
    DropDownMenuDirective,
    DropDownToggleDirective,
    DropDownAppendToBodyComponent
  ],
  declarations: [
    DropDownDirective,
    DropDownMenuDirective,
    DropDownToggleDirective,
    DropDownAppendToBodyComponent
  ],
  
})
export class DropDownModule {
}
