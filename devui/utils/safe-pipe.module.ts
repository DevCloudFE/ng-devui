import {NgModule} from '@angular/core';
import {SafePipe} from './safe.pipe';

@NgModule({
  imports: [SafePipe],
  exports: [SafePipe]
})
export class SafePipeModule {}
