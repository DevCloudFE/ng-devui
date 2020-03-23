import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StickyModule } from '../../sticky';
import { FormModule } from '../form.module';
import { FormDemoComponent } from './form-demo.component';
import { ToggleModule } from 'ng-devui/toggle';
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
import {DropDownModule} from 'ng-devui/dropdown';
import { LabelHorizontalComponent } from './label-horizontal/label-horizontal.component';
import { ModalOneComponent } from './modal-one/modal-one.component';
import { MultiColComponent } from './multi-col/multi-col.component';
import { FilterComponent } from './filter/filter.component';
import { BasicComponent } from './basic/basic.component';
import { ModalComponent } from './modal/modal.component';


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
    DevUIApiModule,
    DevUICodeboxModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: FormDemoComponent },
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [FormDemoComponent],
  declarations: [
    FormDemoComponent,
    BasicComponent,
    LabelHorizontalComponent,
    ModalComponent,
    ModalOneComponent,
    MultiColComponent,
    FilterComponent
  ],
  entryComponents: [ModalOneComponent]
})
export class FormDemoModule {
}
