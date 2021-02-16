import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {AlertComponent} from './alert.component';

@NgModule({
  imports: [CommonModule],
  exports: [AlertComponent],
  declarations: [AlertComponent],
  providers: [],
})
export class AlertModule {
}
