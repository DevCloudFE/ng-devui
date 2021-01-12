import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { StatusComponent } from './status.component';

@NgModule({
  imports: [CommonModule],
  exports: [StatusComponent],
  declarations: [StatusComponent],
  providers: []
})

export class StatusModule { }
