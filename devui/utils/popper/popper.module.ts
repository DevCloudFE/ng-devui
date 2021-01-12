import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PopperComponent} from './popper.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PopperComponent],
  exports: [PopperComponent]
})
export class PopperModule {
}
