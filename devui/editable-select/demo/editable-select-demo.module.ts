import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule } from 'ng-devui/auto-complete';
import { ButtonModule } from 'ng-devui/button';
import { EditableSelectModule } from 'ng-devui/editable-select';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { AsyncDataWithFuncitionComponent } from './async-data-function/async-data-with-function.component';
import { WithSourceComponent } from './basic/with-source.component';
import { DisableDataWithSourceComponent } from './disable-data/disable-data-with-source.component';
import { EditableSelectDemoComponent } from './editable-select-demo.component';
import { LazyLoadComponent } from './lazy-load/lazy-load.component';
import { WithSearchFunctionComponent } from './search-function/with-search-function.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    EditableSelectModule,
    FormsModule,
    AutoCompleteModule,
    DevUIApiModule,
    DevUICodeboxModule,
    ButtonModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: EditableSelectDemoComponent },
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
  exports: [EditableSelectDemoComponent],
  declarations: [
    EditableSelectDemoComponent,
    AsyncDataWithFuncitionComponent,
    DisableDataWithSourceComponent,
    WithSearchFunctionComponent,
    WithSourceComponent,
    LazyLoadComponent,
  ],
  providers: [],

})
export class EditableSelectDemoModule {}
