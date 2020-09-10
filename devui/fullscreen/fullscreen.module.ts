import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'ng-devui/button';
import { FullscreenComponent } from './fullscreen.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    FullscreenComponent
  ],
  declarations: [
    FullscreenComponent
  ]
})
export class FullscreenModule {
}
