import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightComponent } from './highlight.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HighlightComponent],
  exports: [HighlightComponent]
})
export class HighlightModule { }
