import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropDownModule } from 'ng-devui/dropdown';
import { IconModule } from 'ng-devui/icon';
import { SelectModule } from 'ng-devui/select';
import { TextInputModule } from 'ng-devui/text-input';
import { SafePipe } from 'ng-devui/utils';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [
    CommonModule,
    SelectModule,
    FormsModule,
    SafePipe,
    TextInputModule,
    IconModule,
    DropDownModule
  ],
  declarations: [PaginationComponent],
  exports: [PaginationComponent]
})
export class PaginationModule {
}
