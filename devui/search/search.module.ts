import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DCommonModule } from 'ng-devui/common';
import { SearchComponent } from './search.component';
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
