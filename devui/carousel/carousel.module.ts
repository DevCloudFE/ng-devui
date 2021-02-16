import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselItemComponent } from './carousel-item.component';
import { CarouselComponent } from './carousel.component';

@NgModule({
  declarations: [CarouselComponent, CarouselItemComponent],
  imports: [CommonModule],
  exports: [CarouselComponent, CarouselItemComponent],
  providers: [],
})
export class CarouselModule {}
