import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
