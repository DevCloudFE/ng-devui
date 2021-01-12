import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TextareaDirective} from './textarea.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [TextareaDirective],
  declarations: [TextareaDirective],
})
export class TextareaModule {
}
