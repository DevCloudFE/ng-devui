import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StickyModule } from '../../sticky';
import { FormModule } from '../form.module';
import { FormDemoComponent } from './form-demo.component';
import { ToggleModule } from 'ng-devui/toggle';
import { ToastModule } from 'ng-devui/toast';
import { PopoverModule } from 'ng-devui/popover';
import { DataTableModule } from 'ng-devui/data-table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { SelectModule } from 'ng-devui/select';
import { ButtonModule } from 'ng-devui/button';
import { TagsInputModule } from 'ng-devui/tags-input';
import { RadioModule } from 'ng-devui/radio';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { DropDownModule } from 'ng-devui/dropdown';
import { LabelHorizontalComponent } from './label-horizontal/label-horizontal.component';
import { ModalOneComponent } from './modal-one/modal-one.component';
import { MultiColComponent } from './multi-col/multi-col.component';
import { FilterComponent } from './filter/filter.component';
import { BasicComponent } from './basic/basic.component';
import { ModalComponent } from './modal/modal.component';
import { TextInputModule } from 'ng-devui/text-input';
import { TextareaModule } from 'ng-devui/textarea';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { SearchModule } from 'ng-devui/search';
import {
  TreeSelectModule,
  TagsModule,
  MultiAutoCompleteModule,
  InputNumberModule,
  EditableSelectModule,
  DatepickerModule,
} from 'ng-devui';

import { InnerValidatorComponent } from './validate-template/inner-validator/inner-validator.component';
import { CustomValidatorComponent } from './validate-template/custom-validator/custom-validator.component';
import { ErrorStrategyComponent } from './validate-template/error-strategy/error-strategy.component';
import { CustomMessageShowComponent } from './validate-template/custom-message-show/custom-message-show.component';
import { ValidateTemplateFormComponent } from './validate-template/validate-template-form/validate-template-form.component';
import { UserRegisterComponent } from './validate-template/user-register/user-register.component';
import { ValidateSyncComponent } from './validate-sync/validate-sync.component';
import { ValidateCrossComponentComponent } from './validate-cross-component/validate-cross-component.component';
import { CrossComponentComponent } from './validate-template/validate-cross-component/validate-cross-component.component';

import { ValidateReactiveComponent } from './validate-reactive/validate-reactive.component';
import { ValidateCoordinatedComponent } from './validate-coordinated/validate-coordinated.component';
import { ValidateDynamicRuleComponent } from './validate-dynamic-rule/validate-dynamic-rule.component';

import { ChildUserComponent } from './validate-cross-component/child-control/child-user.component';
import { ChildFormComponent } from './validate-template/validate-cross-component/child-form/child-form.component';
import { CustomStatusComponent } from './custom-status/custom-status.component';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    StickyModule,
    DataTableModule,
    ToggleModule,
    ReactiveFormsModule,
    FormsModule,
    SelectModule,
    ButtonModule,
    TagsInputModule,
    RadioModule,
    CheckBoxModule,
    DropDownModule,
    TextInputModule,
    TextareaModule,
    DevUIApiModule,
    DevUICodeboxModule,
    DDemoNavModule,
    PopoverModule,
    ToastModule,
    SearchModule,
    TreeSelectModule,
    TagsModule,
    MultiAutoCompleteModule,
    InputNumberModule,
    EditableSelectModule,
    DatepickerModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: FormDemoComponent },
      {
        path: 'api',
        component: DevUIApiComponent,
        data: {
          api: require('!html-loader!markdown-loader!../doc/api.md'),
        },
      },
    ]),
  ],
  exports: [FormDemoComponent, ChildUserComponent, ChildFormComponent],
  declarations: [
    FormDemoComponent,
    BasicComponent,
    LabelHorizontalComponent,
    ModalComponent,
    ModalOneComponent,
    MultiColComponent,
    FilterComponent,
    InnerValidatorComponent,
    CustomValidatorComponent,
    ErrorStrategyComponent,
    CustomMessageShowComponent,
    ValidateTemplateFormComponent,
    UserRegisterComponent,
    ValidateReactiveComponent,
    ValidateCoordinatedComponent,
    ValidateDynamicRuleComponent,
    ValidateSyncComponent,
    ValidateCrossComponentComponent,
    ChildUserComponent,
    CrossComponentComponent,
    ChildFormComponent,
    CustomStatusComponent,
  ],

})
export class FormDemoModule {}
