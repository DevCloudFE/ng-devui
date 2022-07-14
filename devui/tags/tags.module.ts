import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'ng-devui/popover';
import { TagComponent } from './tag.component';
import { TagsComponent } from './tags.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PopoverModule
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
