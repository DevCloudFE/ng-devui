import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleMenuModule } from 'ng-devui/toggle-menu';
import { TagsInputComponent } from './tags.input.component';
@NgModule({
  imports: [CommonModule, FormsModule, ToggleMenuModule],
  exports: [TagsInputComponent],
  declarations: [TagsInputComponent],
})
export class TagsInputModule {}
