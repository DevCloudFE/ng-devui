import { NgModule } from '@angular/core';
import { LazyLoadDirective } from './lazy-load.directive';

@NgModule({
  imports: [LazyLoadDirective],
  exports: [LazyLoadDirective]
})
export class LazyLoadModule { }
