import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './tags.component';
import { TagComponent } from './tag.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TagsComponent,
    TagComponent
  ],
  declarations: [
    TagsComponent,
    TagComponent
  ]
})
export class TagsModule { }
