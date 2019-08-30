import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SearchComponent,
  ],
  declarations: [
    SearchComponent,
  ]
})
export class SearchModule {}
