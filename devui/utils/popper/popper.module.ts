import {NgModule} from '@angular/core';
import {PopperComponent} from './popper.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [PopperComponent],
  exports: [PopperComponent]
})
export class PopperModule {
}
