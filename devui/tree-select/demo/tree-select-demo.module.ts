import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TreeSelectDemoComponent} from './tree-select-demo.component';
import {FormsModule} from '@angular/forms';
import {TreeSelectDemoBasicComponent} from '../demo/basic/tree-select-demo-basic.component';
import {TreeSelectDemoLeafOnlyComponent} from '../demo/leaf-only/tree-select-demo-leaf-only.component';
import {TreeSelectDemoHooksComponent} from '../demo/hooks/tree-select-demo-hooks.component';
import {TreeSelectDemoSearchableComponent} from '../demo/searchable/tree-select-demo-searchable.component';
import {
  TreeSelectDemoAppendToComponent,
  TreeSelectModalComponent
} from '../demo/append-to/tree-select-demo-append-to.component';
import {ModalModule} from 'ng-devui/modal';
import {TreeSelectDemoCustomIconComponent} from '../demo/custom-icon/tree-select-demo-custom-icon.component';
import {DevUICodeboxModule} from 'ng-devui/shared/devui-codebox';
import {DevUIApiComponent} from 'ng-devui/shared/devui-api/devui-api.component';
import {DevUIApiModule} from 'ng-devui/shared/devui-api/devui-api.module';
import {ButtonModule} from 'ng-devui/button';
import {TreeSelectModule} from 'ng-devui/tree-select';

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
    TreeSelectDemoBasicComponent,
    TreeSelectDemoLeafOnlyComponent,
    TreeSelectDemoHooksComponent,
    TreeSelectDemoSearchableComponent,
    TreeSelectDemoAppendToComponent,
    TreeSelectModalComponent,
    TreeSelectDemoCustomIconComponent
  ],
  entryComponents: [
    TreeSelectDemoComponent,
    TreeSelectModalComponent
  ],
  providers: [],
})
export class TreeSelectDemoModule {
}
