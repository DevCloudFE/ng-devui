import { NgModule } from '@angular/core';
import { SelectModule } from 'ng-devui/select';
import { PaginationComponent } from './pagination.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SelectModule,
    FormsModule
  ],
  declarations: [PaginationComponent],
  exports: [PaginationComponent]
})
export class PaginationModule {
}
