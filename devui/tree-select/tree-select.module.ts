import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CheckBoxModule} from 'ng-devui/checkbox';
import {LoadingModule} from 'ng-devui/loading';
import {TreeModule} from 'ng-devui/tree';
import {PopperModule} from 'ng-devui/utils';
import {TreeSelectComponent} from './tree-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CheckBoxModule,
    LoadingModule,
    TreeModule,
    PopperModule
  ],
  exports: [TreeSelectComponent],
  declarations: [
    TreeSelectComponent,
  ],
  providers: []
})

export class TreeSelectModule {
}
