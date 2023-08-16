import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressTemplateDirective } from './progress-template.directive';
import { ProgressComponent } from './progress.component';

@NgModule({
  imports: [CommonModule],
  exports: [ProgressComponent, ProgressTemplateDirective],
  declarations: [ProgressComponent, ProgressTemplateDirective],
  providers: [],
})
export class ProgressModule {}
