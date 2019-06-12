import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownDirective } from './dropdown.directive';
import { DropDownToggleDirective } from './dropdown-toggle.directive';
import { DropDownMenuDirective } from './dropdown-menu.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    DropDownDirective,
    DropDownMenuDirective,
    DropDownToggleDirective
  ],
  declarations: [
    DropDownDirective,
    DropDownMenuDirective,
    DropDownToggleDirective
  ],
  entryComponents: []
})
export class DropDownModule {
}
