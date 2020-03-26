import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StickyModule } from '../../sticky';
import { AnchorModule } from '../../anchor';

import { AutoCompleteModule } from 'ng-devui/auto-complete/auto-complete.module';

import { EditableSelectDemoComponent } from './editable-select-demo.component';
import { ButtonModule } from 'ng-devui/button/button.module';
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
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';

@NgModule({
  imports: [
    DDemoNavModule,
    CommonModule,
    EditableSelectModule,
    FormsModule,
    AutoCompleteModule,
    DevUIApiModule,
    DevUICodeboxModule,
    ButtonModule,
    StickyModule,
    AnchorModule,
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
