import {NgModule} from '@angular/core';

import {ProgressComponent} from './progress.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [ProgressComponent],
  declarations: [ProgressComponent],
  providers: [],
})
export class ProgressModule {
}
