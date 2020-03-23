import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TransferComponent } from './transfer.component';

import { CheckBoxModule } from 'ng-devui/checkbox';
import { SearchModule } from 'ng-devui/search';
import { DragDropModule } from 'ng-devui/dragdrop';

@NgModule({
  imports: [CommonModule, FormsModule, SearchModule, CheckBoxModule, DragDropModule],
  exports: [TransferComponent],
  declarations: [TransferComponent],
  providers: []
})
export class TransferModule { }
