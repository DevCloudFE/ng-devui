import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { DragDropModule } from 'ng-devui/dragdrop';
import { PopoverModule } from 'ng-devui/popover';
import { SearchModule } from 'ng-devui/search';
import { TransferComponent } from './transfer.component';

@NgModule({
  imports: [CommonModule, FormsModule, ScrollingModule, SearchModule, CheckBoxModule, DragDropModule, PopoverModule],
  exports: [TransferComponent],
  declarations: [TransferComponent],
  providers: []
})
export class TransferModule { }
