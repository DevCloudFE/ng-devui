import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ObserveVisibilityDirective } from './observer-visibility.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ObserveVisibilityDirective],
  exports: [ObserveVisibilityDirective]
})
export class ObserverVisibilityModule { }
