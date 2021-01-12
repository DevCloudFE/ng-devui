import { NgModule } from '@angular/core';
import { RelativeTimePipe } from './relative-time.pipe';

@NgModule({
  declarations: [
    RelativeTimePipe
  ],
  exports: [
    RelativeTimePipe
  ]
})
export class RelativeTimeModule { }
