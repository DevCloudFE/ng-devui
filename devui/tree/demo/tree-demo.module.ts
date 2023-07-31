import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'ng-devui/badge';
import { ButtonModule } from 'ng-devui/button';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { DropDownModule } from 'ng-devui/dropdown';
import { IconModule } from 'ng-devui/icon';
import { LoadingModule } from 'ng-devui/loading';
import { SearchModule } from 'ng-devui/search';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TooltipModule } from 'ng-devui/tooltip';
import { TreeModule } from 'ng-devui/tree';
import { SafePipeModule } from 'ng-devui/utils';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { CheckControlComponent } from './check-control/check-control.component';
import { CustomKeyComponent } from './custom-key/custom-key.component';
import { CustomLoadingComponent } from './custom-loading/custom-loading.component';
import { CustomizeComponent } from './customize/customize.component';
import { DraggableComponent } from './draggable/draggable.component';
import { MergeNodeComponent } from './merge-node/merge-node.component';
import { OperateBtnComponent } from './operate-btn/operate-btn.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { TreeDemoComponent } from './tree-demo.component';
import { TreeDesignComponent } from './tree-design.component';
import { OperationForAllNodesComponent } from './tree-factory/tree-factory.component';
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    TreeModule,
    ButtonModule,
    FormsModule,
    LoadingModule,
    CheckBoxModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    TooltipModule,
    DropDownModule,
    SafePipeModule,
    SearchModule,
    BadgeModule,
    IconModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo', pathMatch: 'full' },
      {
        path: 'design',
        component: TreeDesignComponent,
      },
      { path: 'demo', component: TreeDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ],
  exports: [TreeDemoComponent],
  declarations: [
    TreeDemoComponent,
    TreeDesignComponent,
    BasicComponent,
    CustomKeyComponent,
    OperateBtnComponent,
    CustomizeComponent,
    DraggableComponent,
    SearchFilterComponent,
    CheckControlComponent,
    VirtualScrollComponent,
    CustomLoadingComponent,
    MergeNodeComponent,
    OperationForAllNodesComponent,
  ],
})
export class TreeDemoModule {}
