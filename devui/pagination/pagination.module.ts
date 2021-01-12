import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'ng-devui/select';
import { SafePipeModule } from 'ng-devui/utils';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [
    CommonModule,
    SelectModule,
    FormsModule,
    SafePipeModule
  ],
  declarations: [PaginationComponent],
  exports: [PaginationComponent]
})
export class PaginationModule {
}
