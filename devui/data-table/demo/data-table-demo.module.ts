import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DevUIModule } from 'ng-devui/devui.module';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DataTableModule } from '../data-table.module';
import { DatatableDemoBasicComponent } from './basic/data-table-demo-basic.component';
import { DataTableDemoComponent } from './data-table-demo.component';
import { DatatableDemoAsyncComponent } from './async/data-table-demo-async.component';
import { DatatableDemoResizeableComponent } from './resize/data-table-demo-resizeable.component';
import { TooltipModule } from 'ng-devui/tooltip';
import { AutoCompleteModule } from 'ng-devui/auto-complete';
import { DatatableDemoOnlyOneColumnSortComponent } from './one-column/data-table-demo-onlyonecolumnsort.component';
import { DatatableDemoMaxheightComponent } from './max-height/data-table-demo-maxheight.component';
import { DatatableDemoLazyloadDataComponent } from './lazy/data-table-demo-lazyloaddata.component';
import { DatatableDemoMultiHeaderComponent } from './multi-header/data-table-demo-multiheader.component';
import { DatatableDemoEditableComponent } from './editable/data-table-demo-editable.component';
import { TreeDataComponent } from './tree-table/tree-data.component';
import { ExpandRowComponent } from './expand-row/expand-row.component';
import { FixColumnComponent } from './fix-column/fix-column.component';
import { DragColumnComponent } from './drag-column/drag-column.component';
import { I18nModule } from 'ng-devui/i18n';
import { StickyModule } from '../../sticky';
import { AnchorModule } from '../../anchor';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';

@NgModule({
  imports: [
    DDemoNavModule,
    StickyModule,
    AnchorModule,
    CommonModule,
    DevUIModule,
    FormsModule,
    DataTableModule,
    DevUICodeboxModule,
    DevUIApiModule,
    TooltipModule,
    AutoCompleteModule,
    I18nModule,
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
    DatatableDemoResizeableComponent,
    DatatableDemoOnlyOneColumnSortComponent,
    DatatableDemoMaxheightComponent,
    DatatableDemoMultiHeaderComponent,
    DatatableDemoLazyloadDataComponent,
    DatatableDemoEditableComponent,
    TreeDataComponent,
    ExpandRowComponent,
    FixColumnComponent,
    DragColumnComponent
  ],
  providers: [],
  entryComponents: [DataTableDemoComponent]
})
export class DataTableDemoModule {
}
