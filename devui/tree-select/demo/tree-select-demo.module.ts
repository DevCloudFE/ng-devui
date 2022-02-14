import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'ng-devui/button';
import { ModalModule } from 'ng-devui/modal';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TreeSelectModule } from 'ng-devui/tree-select';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { TreeSelectAppendToComponent, TreeSelectModalComponent } from '../demo/append-to/tree-select-append-to.component';
import { TreeSelectBasicComponent } from '../demo/basic/tree-select-basic.component';
import { TreeSelectCustomIconComponent } from '../demo/custom-icon/tree-select-custom-icon.component';
import { TreeSelectHooksComponent } from '../demo/hooks/tree-select-hooks.component';
import { TreeSelectIconParentComponent } from '../demo/icon-parent/icon-parent.component';
import { TreeSelectKeysComponent } from '../demo/keys/tree-select-keys.component';
import { LabelizationComponent } from '../demo/labelization/labelization.component';
import { TreeSelectLeafOnlyComponent } from '../demo/leaf-only/tree-select-leaf-only.component';
import { TreeSelectSearchableComponent } from '../demo/searchable/tree-select-searchable.component';
import { TreeSelectCustomTemplateComponent } from './custom-template/custom-template.component';
import { TreeSelectDemoComponent } from './tree-select-demo.component';
import { TreeSelectVirtualScrollComponent } from './virtual-scroll/tree-select-virtual-scroll.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    ButtonModule,
    TreeSelectModule,
    DDemoNavModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'demo',
      },
      {
        path: 'demo',
        component: TreeSelectDemoComponent,
      },
      {
        path: 'api',
        component: DevUIApiComponent,
        data: {
          'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
          'en-us': require('!html-loader!markdown-loader!../doc/api-en.md'),
        },
      },
    ]),
    ModalModule,
  ],
  exports: [TreeSelectDemoComponent],
  declarations: [
    TreeSelectDemoComponent,
    TreeSelectBasicComponent,
    TreeSelectLeafOnlyComponent,
    TreeSelectHooksComponent,
    TreeSelectSearchableComponent,
    TreeSelectAppendToComponent,
    TreeSelectModalComponent,
    TreeSelectCustomIconComponent,
    TreeSelectCustomTemplateComponent,
    LabelizationComponent,
    TreeSelectKeysComponent,
    TreeSelectIconParentComponent,
    TreeSelectVirtualScrollComponent,
  ],

  providers: [],
})
export class TreeSelectDemoModule {}
