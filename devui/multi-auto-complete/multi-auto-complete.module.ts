import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'ng-devui/auto-complete';
import { TagsModule } from 'ng-devui/tags';
import { MultiAutoCompleteComponent } from './multi-auto-complete.component';

@NgModule({
  imports: [CommonModule, AutoCompleteModule, FormsModule, TagsModule],
  exports: [MultiAutoCompleteComponent],
  declarations: [MultiAutoCompleteComponent],
  providers: [],
})
export class MultiAutoCompleteModule {}
