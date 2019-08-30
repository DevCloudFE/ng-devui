import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagsInputComponent } from './tags.input.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TagsInputComponent,
  ],
  declarations: [
    TagsInputComponent,
  ]
})
export class TagsInputModule {}
