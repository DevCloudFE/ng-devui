import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckBoxGroupComponent } from './checkbox-group.component';
import { CheckBoxComponent } from './checkbox.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [CheckBoxComponent, CheckBoxGroupComponent],
  declarations: [CheckBoxComponent, CheckBoxGroupComponent],
  providers: [],
})
export class CheckBoxModule {
}
