import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckBoxComponent } from './checkbox.component';
import { CheckBoxGroupComponent } from './checkbox-group.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [CheckBoxComponent, CheckBoxGroupComponent],
  declarations: [CheckBoxComponent, CheckBoxGroupComponent],
  providers: [],
})
export class CheckBoxModule {
}
