import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'ng-devui/auto-complete';

import { EditableSelectDemoComponent } from './editable-select-demo.component';
import { ButtonModule } from 'ng-devui/button';
import { EditableSelectModule } from 'ng-devui/editable-select';
import {
  AsyncDataWithFuncitionComponent
} from './async-data-function/async-data-with-function.component';
import { DisableDataWithSourceComponent } from './disable-data/disable-data-with-source.component';
import { WithSearchFunctionComponent } from './search-function/with-search-function.component';
import { WithSourceComponent } from './basic/with-source.component';

import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { LazyLoadComponent } from './lazy-load/lazy-load.component';

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
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: EditableSelectDemoComponent },
      {
        path: 'api', component: DevUIApiComponent, data: {
          api: require('!html-loader!markdown-loader!../doc/api.md')
        }
      }
    ])
  ],
  exports: [EditableSelectDemoComponent],
  declarations: [
    EditableSelectDemoComponent,
    AsyncDataWithFuncitionComponent,
    DisableDataWithSourceComponent,
    WithSearchFunctionComponent,
    WithSourceComponent,
    LazyLoadComponent
  ],
  providers: [],
  entryComponents: [EditableSelectDemoComponent]
})
export class EditableSelectDemoModule {
}
