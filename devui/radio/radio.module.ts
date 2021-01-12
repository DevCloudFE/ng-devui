import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RadioGroupComponent} from './radio-group.component';
import { RadioComponent } from './radio.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [RadioGroupComponent, RadioComponent],
  declarations: [RadioGroupComponent, RadioComponent],
  providers: [],
})
export class RadioModule {}
