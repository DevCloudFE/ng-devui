import { NgModule } from '@angular/core';

import { PaginationComponent } from './pagination.component';
import { CommonModule } from '@angular/common';
import { SelectModule } from '../select';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SelectModule,
    FormsModule
  ],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
  providers: [],
})
export class PaginationModule {
}
