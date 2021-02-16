import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TextDirective} from './text-input.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [TextDirective],
  declarations: [TextDirective],
})
export class TextInputModule {
}
