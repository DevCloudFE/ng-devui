import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { DropDownDirective } from './dropdown.directive';
import { DropDownToggleDirective } from './dropdown-toggle.directive';
import { DropDownMenuDirective } from './dropdown-menu.directive';
import { DropDownAppendToBodyComponent } from './dropdown.component';
import { WindowRefModule } from 'ng-devui/window-ref';

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
