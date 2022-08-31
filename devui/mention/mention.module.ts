import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingModule } from 'ng-devui/loading';
import { MentionComponent } from './mention.component';
import { MentionDirective } from './mention.directive';

@NgModule({
  imports: [CommonModule, LoadingModule],
  declarations: [MentionComponent, MentionDirective],
  exports: [MentionComponent, MentionDirective],
})
export class MentionModule {}
