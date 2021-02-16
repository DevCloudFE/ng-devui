import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'ng-devui/button';
import { DropDownModule } from 'ng-devui/dropdown';
import { LoadingModule } from 'ng-devui/loading';
import { SearchModule } from 'ng-devui/search';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TooltipModule } from 'ng-devui/tooltip';
import { SafePipeModule } from 'ng-devui/utils';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { TreeModule } from '../tree.module';
import { BasicComponent } from './basic/basic.component';
import { CheckControlComponent } from './check-control/check-control.component';
import { CheckableComponent } from './checkable/checkable.component';
import { CustomLoadingComponent } from './custom-loading/custom-loading.component';
import { CustomTitleKeyComponent } from './custom-title-key/custom-title-key.component';
import { CustomizeComponent } from './customize/customize.component';
import { DraggableComponent } from './draggable/draggable.component';
import { MergeNodeComponent } from './merge-node/merge-node.component';
import { OperateBtnComponent } from './operate-btn/operate-btn.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { TreeDemoComponent } from './tree-demo.component';
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';

@NgModule({
  imports: [
    TranslateModule,
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
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
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
