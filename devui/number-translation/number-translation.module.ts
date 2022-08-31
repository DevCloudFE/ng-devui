import { NgModule } from '@angular/core';
import { NumberTransPipe } from './number-translation.pipe';

@NgModule({
  declarations: [
    NumberTransPipe
  ],
  exports: [
    NumberTransPipe
  ]
})
export class NumberTransModule { }
