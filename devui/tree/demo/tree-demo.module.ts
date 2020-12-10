import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeModule } from '../tree.module';
import { TreeDemoComponent } from './tree-demo.component';
import { ButtonModule } from 'ng-devui/button';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { CheckableComponent } from './checkable/checkable.component';
import { OperateBtnComponent } from './operate-btn/operate-btn.component';
import { CustomizeComponent } from './customize/customize.component';
import { DraggableComponent } from './draggable/draggable.component';
import { CustomTitleKeyComponent } from './custom-title-key/custom-title-key.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { CheckControlComponent } from './check-control/check-control.component';
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';
import { CustomLoadingComponent } from './custom-loading/custom-loading.component';
import { LoadingModule } from 'ng-devui/loading';
import { SafePipeModule } from 'ng-devui/utils';
import { TooltipModule } from 'ng-devui/tooltip';
import { SearchModule } from 'ng-devui/search';
import { DropDownModule } from 'ng-devui/dropdown';
import { MergeNodeComponent } from './merge-node/merge-node.component';

@NgModule({
  imports: [
    CommonModule,
    TreeModule,
    ButtonModule,
    FormsModule,
    LoadingModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    TooltipModule,
    DropDownModule,
    SafePipeModule,
    SearchModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: TreeDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [TreeDemoComponent],
  declarations: [
    TreeDemoComponent,
    BasicComponent,
    CheckableComponent,
    OperateBtnComponent,
    CustomizeComponent,
    DraggableComponent,
    CustomTitleKeyComponent,
    SearchFilterComponent,
    CheckControlComponent,
    VirtualScrollComponent,
    CustomLoadingComponent,
    MergeNodeComponent
  ],
  
})
export class TreeDemoModule {
}

