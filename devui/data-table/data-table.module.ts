import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollingModule as ExperimentalScrollingModule } from '@angular/cdk-experimental/scrolling';

import { DataTableComponent } from './data-table.component';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';
import { DataTableCellViewTmplComponent } from './tmpl/data-table-cell-view-tmpl.component';
import { DataTableCellEditTmplComponent } from './tmpl/data-table-cell-edit-tmpl.component';
import { DataTableCellComponent } from './data-table-cell.component';
import { DataTableBodyComponent } from './data-table-body.component';
import { DataTableHeadComponent } from './data-table-head.component';
import { DataTableRowComponent } from './data-table-row.component';
import { DataTableHeadTmplComponent } from './tmpl/data-table-head-tmpl.component';
import { DataTableFootTmplComponent } from './tmpl/data-table-foot-tmpl.component';
import { DataTableFootComponent } from './data-table-foot.component';
import { PaginationModule } from 'ng-devui/pagination';
import { DataTablePagerComponent } from './data-table-pager.component';
import { DataTablePagerTmplComponent } from './tmpl/data-table-pager-tmpl.component';
import { DataTableHeadCellTmplComponent } from './tmpl/data-table-head-cell-tmpl.component';
import { DCommonModule } from 'ng-devui/common';
import { DatepickerModule } from 'ng-devui/datepicker';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { ResizeableDirective } from './resizeable.directive';
import { ButtonModule } from 'ng-devui/button';
import { SelectModule, SelectComponent } from 'ng-devui/select';
import { InputNumberModule, InputNumberComponent } from 'ng-devui/input-number';
import { DropDownModule } from 'ng-devui/dropdown';
import { TreeSelectModule, TreeSelectComponent } from 'ng-devui/tree-select';
import { SafePipeModule } from 'ng-devui/utils';
import { DisPlayCellValuePipe } from './display-cell-value.pipe';
import { TooltipModule } from 'ng-devui/tooltip';
import { EditorDirective } from './editor-host.directive';
import { DataTableCellTmplComponent } from './tmpl/data-table-cell-tmpl.component';
import { DragDropModule } from 'ng-devui/dragdrop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    PaginationModule,
    DCommonModule,
    DatepickerModule,
    SelectModule,
    CheckBoxModule,
    ButtonModule,
    InputNumberModule,
    DropDownModule,
    TreeSelectModule,
    SafePipeModule,
    TooltipModule,
    DragDropModule,
    ExperimentalScrollingModule
  ],
  exports: [
    DataTableComponent,
    DataTableColumnTmplComponent,
    DataTableCellViewTmplComponent,
    DataTableCellEditTmplComponent,
    DataTableBodyComponent,
    DataTableHeadComponent,
    DataTableCellComponent,
    DataTableHeadTmplComponent,
    DataTableFootTmplComponent,
    DataTableFootComponent,
    DataTableCellTmplComponent,
    DataTablePagerComponent,
    DataTablePagerTmplComponent,
    DataTableRowComponent,
    DataTableHeadCellTmplComponent
  ],
  declarations: [
    DataTableComponent,
    DataTableColumnTmplComponent,
    DataTableCellViewTmplComponent,
    DataTableCellEditTmplComponent,
    DataTableBodyComponent,
    DataTableHeadComponent,
    DataTableCellComponent,
    DataTableHeadTmplComponent,
    DataTableFootTmplComponent,
    DataTableFootComponent,
    DataTableCellTmplComponent,
    DataTablePagerComponent,
    DataTablePagerTmplComponent,
    DataTableRowComponent,
    ResizeableDirective,
    DataTableHeadCellTmplComponent,
    DisPlayCellValuePipe,
    EditorDirective
  ],
  entryComponents: [
    InputNumberComponent,
    SelectComponent,
    TreeSelectComponent
  ],
  providers: [],
})
export class DataTableModule {
}
