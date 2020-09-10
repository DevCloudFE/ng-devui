import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
