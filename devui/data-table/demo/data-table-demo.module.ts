import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DevUIModule } from 'ng-devui/devui.module';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DataTableModule } from 'ng-devui/data-table';
import { DatatableDemoBasicComponent } from './basic/data-table-demo-basic.component';
import { DataTableDemoComponent } from './data-table-demo.component';
import { DatatableDemoAsyncComponent } from './async/data-table-demo-async.component';
import { TooltipModule } from 'ng-devui/tooltip';
import { AutoCompleteModule } from 'ng-devui/auto-complete';
import { DatatableDemoMaxheightComponent } from './max-height/data-table-demo-maxheight.component';
import { DatatableDemoLazyloadDataComponent } from './lazy/data-table-demo-lazyloaddata.component';
import { DatatableDemoMultiHeaderComponent } from './multi-header/data-table-demo-multiheader.component';
import { DatatableDemoEditableComponent } from './editable/data-table-demo-editable.component';
import { TreeDataComponent } from './tree-table/tree-data.component';
import { ExpandRowComponent } from './expand-row/expand-row.component';
import { FixColumnComponent } from './fix-column/fix-column.component';
import { DragColumnComponent } from './drag-column/drag-column.component';
import { I18nModule } from 'ng-devui/i18n';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { CellMergeComponent } from './cell-merge/cell-merge.component';
import { DragRowComponent } from './drag-row/drag-row.component';
import { InteractionComponent } from './interaction/interaction.component';
import { BasicOldComponent } from './basic-old/basic-old.component';
import { HeaderGroupingComponent } from './header-grouping/header-grouping.component';
import { EditableOldComponent } from './editable-old/editable-old.component';
import { ExpandRowOldComponent } from './expand-row-old/expand-row-old.component';
import { TreeTableOldComponent } from './tree-table-old/tree-table-old.component';
import { FixColumnOldComponent } from './fix-column-old/fix-column-old.component';
import { MutiDragRowComponent } from './muti-drag-row/muti-drag-row.component';
import { CheckOptionsComponent } from './check-options/check-options.component';
import { CheckOptionsColumnComponent } from './check-options-column/check-options-column.component';
import { InteractionColumnComponent } from './interaction-column/interaction-column.component';
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';

@NgModule({
  imports: [
    CommonModule,
    DevUIModule,
    FormsModule,
    DataTableModule,
    DevUICodeboxModule,
    DevUIApiModule,
    TooltipModule,
    AutoCompleteModule,
    I18nModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: DataTableDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [DataTableDemoComponent],
  declarations: [
    DataTableDemoComponent,
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
    VirtualScrollComponent
  ],
  providers: [],
  entryComponents: [DataTableDemoComponent]
})
export class DataTableDemoModule {
}
