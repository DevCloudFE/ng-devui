import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TreeSelectDemoComponent} from './tree-select-demo.component';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ng-devui/modal';
import {DevUICodeboxModule} from 'ng-devui/shared/devui-codebox';
import {DevUIApiComponent} from 'ng-devui/shared/devui-api/devui-api.component';
import {DevUIApiModule} from 'ng-devui/shared/devui-api/devui-api.module';
import {ButtonModule} from 'ng-devui/button';
import {TreeSelectModule} from 'ng-devui/tree-select';

import {
  TreeSelectAppendToComponent,
  TreeSelectModalComponent
} from '../demo/append-to/tree-select-append-to.component';
import {TreeSelectBasicComponent} from '../demo/basic/tree-select-basic.component';
import {TreeSelectCustomIconComponent} from '../demo/custom-icon/tree-select-custom-icon.component';
import {TreeSelectHooksComponent} from '../demo/hooks/tree-select-hooks.component';
import {TreeSelectLeafOnlyComponent} from '../demo/leaf-only/tree-select-leaf-only.component';
import {TreeSelectSearchableComponent} from '../demo/searchable/tree-select-searchable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    ButtonModule,
    TreeSelectModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'demo'
      },
      {
        path: 'demo', component: TreeSelectDemoComponent
      },
      {
        path: 'api',
        component: DevUIApiComponent,
        data: {
          api: require('!html-loader!markdown-loader!../doc/api.md'),
        }
      }
    ]),
    ModalModule
  ],
  exports: [
    TreeSelectDemoComponent
  ],
  declarations: [
    TreeSelectDemoComponent,
    TreeSelectBasicComponent,
    TreeSelectLeafOnlyComponent,
    TreeSelectHooksComponent,
    TreeSelectSearchableComponent,
    TreeSelectAppendToComponent,
    TreeSelectModalComponent,
    TreeSelectCustomIconComponent
  ],
  entryComponents: [
    TreeSelectDemoComponent,
    TreeSelectModalComponent
  ],
  providers: [],
})
export class TreeSelectDemoModule {
}
