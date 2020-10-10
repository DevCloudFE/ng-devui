import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PopoverModule } from 'ng-devui/popover';
import { FormItemComponent } from './form-item.component';
import { FormLabelComponent } from './form-label.component';
import { FormControlComponent } from './form-control.component';
import { FormOperationComponent, DFormSubmitDirective, DFormResetDirective } from './form-operation.component';
import { FormDirective } from './form.directive';
import { DFormControlRuleDirective, DFormGroupRuleDirective } from './validator-directive/form-control-rules.directive';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, PopoverModule],
  exports: [
    FormItemComponent,
    FormLabelComponent,
    FormControlComponent,
    FormOperationComponent,
    FormDirective,
    DFormGroupRuleDirective,
    DFormControlRuleDirective,
    DFormSubmitDirective,
    DFormResetDirective
  ],
  declarations: [
    FormItemComponent,
    FormLabelComponent,
    FormControlComponent,
    FormOperationComponent,
    FormDirective,
    DFormGroupRuleDirective,
    DFormControlRuleDirective,
    DFormSubmitDirective,
    DFormResetDirective
  ],
  providers: [],
})
export class FormModule {
}
