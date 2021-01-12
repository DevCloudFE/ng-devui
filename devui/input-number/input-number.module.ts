import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from './input-number.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [InputNumberComponent],
  declarations: [InputNumberComponent],
  providers: [],
})

export class InputNumberModule { }
