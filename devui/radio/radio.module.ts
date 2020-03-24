import { RadioComponent } from './radio.component';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RadioGroupComponent} from './radio-group.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [RadioGroupComponent, RadioComponent],
  declarations: [RadioGroupComponent, RadioComponent],
  providers: [],
})
export class RadioModule {}
