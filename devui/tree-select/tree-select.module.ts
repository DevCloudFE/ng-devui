import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { LoadingModule } from 'ng-devui/loading';
import { SearchModule } from 'ng-devui/search';
import { TreeModule } from 'ng-devui/tree';
import { PopperModule } from 'ng-devui/utils';
import { TreeSelectComponent } from './tree-select.component';

@NgModule({
  imports: [CommonModule, FormsModule, CheckBoxModule, LoadingModule, TreeModule, PopperModule, SearchModule],
  exports: [TreeSelectComponent],
  declarations: [TreeSelectComponent],
  providers: [],
})
export class TreeSelectModule {}
