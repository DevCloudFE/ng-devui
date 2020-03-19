import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingBackdropComponent } from './loading-backdrop.component';
import { LoadingComponent } from './loading.component';

import { LoadingDirective } from './loading.directive';

@NgModule({
  imports: [CommonModule],
  exports: [
    LoadingDirective,
    LoadingBackdropComponent,
    LoadingComponent,
  ],
  declarations: [
    LoadingDirective,
    LoadingBackdropComponent,
    LoadingComponent
  ],
  entryComponents: [
    LoadingBackdropComponent,
    LoadingComponent
  ],
  providers: [],
})
export class LoadingModule {
}
