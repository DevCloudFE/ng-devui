import { NgModule } from '@angular/core';

import { StatusComponent } from './status.component';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [StatusComponent],
  declarations: [StatusComponent],
  providers: [],
})

export class StatusModule {

}
