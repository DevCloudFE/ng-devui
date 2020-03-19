import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'ng-devui/auto-complete/auto-complete.module';

import { EditableSelectDemoComponent } from './editable-select-demo.component';
import { ButtonModule } from 'ng-devui/button/button.module';
import { EditableSelectModule } from 'ng-devui/editable-select';
import {
  EditableSelectDemoAsyncDataWithFuncitionComponent
} from './async-data-function/editable-select-demo-async-data-with-function.component';
import { EditableSelectDemoAsyncDataWithSourceComponent } from './async-data/editable-select-demo-async-data-with-source.component';
import { EditableSelectDemoWithSearchFunctionComponent } from './search-function/editable-select-demo-with-search-function.component';
import { EditableSelectDemoWithSourceComponent } from './basic/editable-select-demo-with-source.component';

import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';

@NgModule({
  imports: [
    CommonModule,
    EditableSelectModule,
    FormsModule,
    AutoCompleteModule,
    DevUIApiModule,
    DevUICodeboxModule,
    ButtonModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: EditableSelectDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [EditableSelectDemoComponent],
  declarations: [
    EditableSelectDemoComponent,
    EditableSelectDemoAsyncDataWithFuncitionComponent,
    EditableSelectDemoAsyncDataWithSourceComponent,
    EditableSelectDemoWithSearchFunctionComponent,
    EditableSelectDemoWithSourceComponent
  ],
  providers: [],
  entryComponents: [EditableSelectDemoComponent]
})
export class EditableSelectDemoModule {
}
