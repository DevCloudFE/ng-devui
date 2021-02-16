import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TransferComponent } from './transfer.component';

import { CheckBoxModule } from 'ng-devui/checkbox';
import { DragDropModule } from 'ng-devui/dragdrop';
import { SearchModule } from 'ng-devui/search';

@NgModule({
  imports: [CommonModule, FormsModule, SearchModule, CheckBoxModule, DragDropModule],
  exports: [TransferComponent],
  declarations: [TransferComponent],
  providers: []
})
export class TransferModule { }
