import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { DropDownDirective } from './dropdown.directive';
import { DropDownToggleDirective } from './dropdown-toggle.directive';
import { DropDownMenuDirective } from './dropdown-menu.directive';
import { DropDownAppendToBodyComponent } from './dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
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
  entryComponents: []
})
export class DropDownModule {
}
