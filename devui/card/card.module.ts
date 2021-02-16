import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CardActionsDirective, CardAvatarDirective, CardComponent, CardContentDirective,
  CardExtendComponent,
  CardHeaderComponent, CardMetaDirective, CardSubtitleDirective, CardTitleDirective
} from './card.component';

@NgModule({
  declarations: [CardComponent, CardHeaderComponent, CardAvatarDirective, CardMetaDirective,
    CardActionsDirective, CardSubtitleDirective, CardTitleDirective, CardContentDirective, CardExtendComponent],
  imports: [
    CommonModule
  ],
  exports: [CardComponent, CardHeaderComponent, CardAvatarDirective, CardMetaDirective,
    CardActionsDirective, CardSubtitleDirective, CardTitleDirective, CardContentDirective, CardExtendComponent]
})
export class CardModule { }
