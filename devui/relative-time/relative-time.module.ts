import { RelativeTimePipe } from './relative-time.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    RelativeTimePipe
  ],
  exports: [
    RelativeTimePipe
  ]
})
export class RelativeTimeModule { }
