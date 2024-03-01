import { NgModule } from '@angular/core';
import { IsTemplatePipe } from './is-template.pipe';

@NgModule({
  declarations: [IsTemplatePipe],
  exports: [IsTemplatePipe],
})
export class IsTemplateModule {}
