import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadDirective } from './lazy-load.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [LazyLoadDirective],
    exports: [LazyLoadDirective]
})
export class LazyLoadModule { }
