import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PopoverModule} from 'ng-devui/popover';
import {SliderComponent} from './slider.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PopoverModule
  ],
  exports: [SliderComponent],
  declarations: [SliderComponent],
  providers: [],
})

export class SliderModule {
}
