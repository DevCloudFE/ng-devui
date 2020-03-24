import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SliderComponent} from './slider.component';
import {FormsModule} from '@angular/forms';
import {PopoverModule} from 'ng-devui/popover';


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
