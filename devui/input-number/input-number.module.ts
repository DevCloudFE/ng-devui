import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { InputNumberComponent } from './input-number.component';
import { CommonModule } from '@angular/common';


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
