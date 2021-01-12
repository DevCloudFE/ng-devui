import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BadgeComponent } from './badge.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [BadgeComponent],
  declarations: [BadgeComponent]
})
export class BadgeModule { }
