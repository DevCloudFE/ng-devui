import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MultiAutoCompleteComponent } from './multi-auto-complete.component';
import { AutoCompleteModule } from 'ng-devui/auto-complete';

@NgModule({
  imports: [CommonModule, AutoCompleteModule, FormsModule],
  exports: [MultiAutoCompleteComponent],
  declarations: [MultiAutoCompleteComponent],
  providers: [],
  
})
export class MultiAutoCompleteModule {
}
