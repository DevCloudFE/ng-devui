import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { CarouselItemComponent } from './carousel-item.component';

@NgModule({
  declarations: [CarouselComponent, CarouselItemComponent],
  imports: [CommonModule],
  exports: [CarouselComponent, CarouselItemComponent],
  providers: [],
})
export class CarouselModule {}
