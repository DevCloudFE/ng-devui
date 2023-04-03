import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopoverModule } from 'ng-devui/popover';
import { FormControlComponent } from './form-control.component';
import { FormItemComponent } from './form-item.component';
import { FormLabelComponent } from './form-label.component';
import { DFormResetDirective, DFormSubmitDirective, FormOperationComponent } from './form-operation.component';
import { ActiveFormControlDirective, FormDirective } from './form.directive';
import { DValidateSyncDirective } from './validator-directive/d-validate-sync.directive';
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
    DFormResetDirective,
    DValidateSyncDirective,
    ActiveFormControlDirective
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
    DFormResetDirective,
    DValidateSyncDirective,
    ActiveFormControlDirective
  ],
  providers: [],
})
export class FormModule {
}
