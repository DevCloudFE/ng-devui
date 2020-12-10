import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { DCommonModule } from 'ng-devui/common';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DCommonModule
  ],
  exports: [
    SearchComponent,
  ],
  declarations: [
    SearchComponent,
  ]
})
export class SearchModule {}
