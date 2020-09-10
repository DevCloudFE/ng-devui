import { NgModule } from '@angular/core';
import { SelectModule } from 'ng-devui/select';
import { PaginationComponent } from './pagination.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafePipeModule } from 'ng-devui/utils';

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
