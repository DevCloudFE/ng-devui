import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  DatepickerModule,
  EditableSelectModule,
  InputNumberModule,
  MultiAutoCompleteModule,
  TagsModule,
  TreeSelectModule
} from 'ng-devui';
import { ButtonModule } from 'ng-devui/button';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { DataTableModule } from 'ng-devui/data-table';
import { DropDownModule } from 'ng-devui/dropdown';
import { FormModule } from 'ng-devui/form';
import { PopoverModule } from 'ng-devui/popover';
import { RadioModule } from 'ng-devui/radio';
import { SearchModule } from 'ng-devui/search';
import { SelectModule } from 'ng-devui/select';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { StickyModule } from 'ng-devui/sticky';
import { TagsInputModule } from 'ng-devui/tags-input';
import { TextInputModule } from 'ng-devui/text-input';
import { TextareaModule } from 'ng-devui/textarea';
import { ToastModule } from 'ng-devui/toast';
import { ToggleModule } from 'ng-devui/toggle';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { CustomStatusComponent } from './custom-status/custom-status.component';
import { FormDemoComponent } from './form-demo.component';
import { LabelHorizontalComponent } from './label-horizontal/label-horizontal.component';
import { ModalOneComponent } from './modal-one/modal-one.component';
import { ModalComponent } from './modal/modal.component';
import { MultiColComponent } from './multi-col/multi-col.component';
import { ChildUserComponent } from './validate-cross-component/child-control/child-user.component';
import { ValidateCrossComponentComponent } from './validate-cross-component/validate-cross-component.component';
import { ValidateDynamicRuleComponent } from './validate-dynamic-rule/validate-dynamic-rule.component';
import { ValidateReactiveComponent } from './validate-reactive/validate-reactive.component';
import { ValidateSyncComponent } from './validate-sync/validate-sync.component';
import { CustomMessageShowComponent } from './validate-template/custom-message-show/custom-message-show.component';
import { CustomValidatorComponent } from './validate-template/custom-validator/custom-validator.component';
import { DebounceTimeComponent } from './validate-template/debounce-time/debounce-time.component';
import { ErrorStrategyComponent } from './validate-template/error-strategy/error-strategy.component';
import { InnerValidatorComponent } from './validate-template/inner-validator/inner-validator.component';
import { UserRegisterComponent } from './validate-template/user-register/user-register.component';
import { ChildFormComponent } from './validate-template/validate-cross-component/child-form/child-form.component';
import { CrossComponentComponent } from './validate-template/validate-cross-component/validate-cross-component.component';
import { ValidateTemplateFormComponent } from './validate-template/validate-template-form/validate-template-form.component';

@NgModule({
  imports: [
    TranslateModule,
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
          'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
          'en-us': require('!html-loader!markdown-loader!../doc/api-en.md'),
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
    InnerValidatorComponent,
    CustomValidatorComponent,
    ErrorStrategyComponent,
    CustomMessageShowComponent,
    ValidateTemplateFormComponent,
    UserRegisterComponent,
    ValidateReactiveComponent,
    ValidateDynamicRuleComponent,
    ValidateSyncComponent,
    ValidateCrossComponentComponent,
    ChildUserComponent,
    CrossComponentComponent,
    ChildFormComponent,
    CustomStatusComponent,
    DebounceTimeComponent,
  ],

})
export class FormDemoModule {}
