import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormItemComponent } from './form-item.component';
import { FormLabelComponent } from './form-label.component';
import { FormControlComponent } from './form-control.component';
import { FormOperationComponent } from './form-operation.component';
import { FormDirective } from './form.directive';
import { PopoverModule } from 'ng-devui/popover';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, PopoverModule],
  exports: [ FormItemComponent, FormLabelComponent, FormControlComponent, FormOperationComponent, FormDirective],
  declarations: [ FormItemComponent, FormLabelComponent, FormControlComponent, FormOperationComponent, FormDirective],
  providers: [],
})
export class FormModule {
}
