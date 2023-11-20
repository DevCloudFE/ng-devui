import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertCarouselItemComponent } from './alert-carousel-item.component';
import { AlertComponent } from './alert.component';

@NgModule({
  imports: [CommonModule],
  exports: [AlertComponent, AlertCarouselItemComponent],
  declarations: [AlertComponent, AlertCarouselItemComponent],
})
export class AlertModule {}
