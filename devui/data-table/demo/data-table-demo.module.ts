import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DevUIModule } from 'ng-devui';
import { AutoCompleteModule } from 'ng-devui/auto-complete';
import { DCommonModule } from 'ng-devui/common';
import { DataTableModule } from 'ng-devui/data-table';
import { I18nModule } from 'ng-devui/i18n';
import { LoadingModule } from 'ng-devui/loading';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { SplitterModule } from 'ng-devui/splitter';
import { TooltipModule } from 'ng-devui/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { DatatableDemoAsyncComponent } from './async/data-table-demo-async.component';
import { BasicOldComponent } from './basic-old/basic-old.component';
import { DatatableDemoBasicComponent } from './basic/data-table-demo-basic.component';
import { CellMergeComponent } from './cell-merge/cell-merge.component';
import { CheckOptionsColumnComponent } from './check-options-column/check-options-column.component';
import { CheckOptionsComponent } from './check-options/check-options.component';
import { DataTableDemoComponent } from './data-table-demo.component';
import { DataTableDesignComponent } from './data-table-design.component';
import { DragColumnComponent } from './drag-column/drag-column.component';
import { DragRowComponent } from './drag-row/drag-row.component';
import { DynamicColsDemoComponent } from './dynamic-cols/dynamic-cols-demo.component';
import { EditableOldComponent } from './editable-old/editable-old.component';
import { DatatableDemoEditableComponent } from './editable/data-table-demo-editable.component';
import { ExpandRowOldComponent } from './expand-row-old/expand-row-old.component';
import { ExpandRowComponent } from './expand-row/expand-row.component';
import { FixColumnOldComponent } from './fix-column-old/fix-column-old.component';
import { FixColumnComponent } from './fix-column/fix-column.component';
import { FixHeightVirtualScrollComponent } from './fix-height-virtual-scroll/fix-height-virtual-scroll.component';
import { HeaderGroupingComponent } from './header-grouping/header-grouping.component';
import { InteractionColumnComponent } from './interaction-column/interaction-column.component';
import { InteractionComponent } from './interaction/interaction.component';
import { DatatableDemoLazyloadDataComponent } from './lazy/data-table-demo-lazyloaddata.component';
import { DatatableDemoMaxheightComponent } from './max-height/data-table-demo-maxheight.component';
import { MemoryTableWidthDirective } from './memory-table/memory-table-width.directive';
import { MemoryTableComponent } from './memory-table/memory-table.component';
import { DatatableDemoMultiHeaderComponent } from './multi-header/data-table-demo-multiheader.component';
import { MutiDragRowComponent } from './muti-drag-row/muti-drag-row.component';
import { MutilStylesComponent } from './mutil-styles/mutil-styles.component';
import { TreeTableOldComponent } from './tree-table-old/tree-table-old.component';
import { TreeDataComponent } from './tree-table/tree-data.component';
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';
@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    ScrollingModule,
    DevUIModule,
    FormsModule,
    DataTableModule,
    DevUICodeboxModule,
    DevUIApiModule,
    TooltipModule,
    AutoCompleteModule,
    I18nModule,
    DDemoNavModule,
    LoadingModule,
    SplitterModule,
    DCommonModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo', pathMatch: 'full' },
      {
        path: 'design',
        component: DataTableDesignComponent,
      },
      { path: 'demo', component: DataTableDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ],
  exports: [DataTableDemoComponent],
  declarations: [
    DataTableDemoComponent,
    DataTableDesignComponent,
    DatatableDemoBasicComponent,
    DatatableDemoAsyncComponent,
    DatatableDemoMaxheightComponent,
    DatatableDemoMultiHeaderComponent,
    DatatableDemoLazyloadDataComponent,
    DatatableDemoEditableComponent,
    TreeDataComponent,
    ExpandRowComponent,
    FixColumnComponent,
    DragColumnComponent,
    CellMergeComponent,
    DragRowComponent,
    InteractionComponent,
    BasicOldComponent,
    HeaderGroupingComponent,
    EditableOldComponent,
    ExpandRowOldComponent,
    TreeTableOldComponent,
    FixColumnOldComponent,
    MutiDragRowComponent,
    CheckOptionsComponent,
    CheckOptionsColumnComponent,
    InteractionColumnComponent,
    VirtualScrollComponent,
    MutilStylesComponent,
    FixHeightVirtualScrollComponent,
    DynamicColsDemoComponent,
    MemoryTableComponent,
    MemoryTableWidthDirective
  ],
  providers: [],
})
export class DataTableDemoModule {}
