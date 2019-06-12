import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataTableComponent } from './data-table.component';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';
import { DataTableCellViewTmplComponent } from './tmpl/data-table-cell-view-tmpl.component';
import { DataTableCellEditTmplComponent } from './tmpl/data-table-cell-edit-tmpl.component';
import { DataTableCellComponent } from './data-table-cell.component';
import { DataTableBodyComponent } from './data-table-body.component';
import { DataTableHeadComponent } from './data-table-head.component';
import { DataTableRowComponent } from './data-table-row.component';
import { DataTableHeadTmplComponent } from './tmpl/data-table-head-tmpl.component';
import { DataTableCellFilterTmplComponent } from './tmpl/data-table-cell-filter-tmpl.component';
import { DataTableFootTmplComponent } from './tmpl/data-table-foot-tmpl.component';
import { DataTableFootComponent } from './data-table-foot.component';
import { PaginationModule } from '../pagination';
import { DataTableTmplsComponent } from './tmpl/data-table-tmpls.component';
import { DataTableCellTmplComponent } from './tmpl/data-table-cell-tmpl.component';
import { DataTablePagerComponent } from './data-table-pager.component';
import { DataTablePagerTmplComponent } from './tmpl/data-table-pager-tmpl.component';
import { DataTableHeadCellTmplComponent } from './tmpl/data-table-head-cell-tmpl.component';
import { AveCommonModule } from '../common';
import { DatepickerModule } from '../datepicker';
import { CheckBoxModule } from '../checkbox';
import { ResizeableDirective } from './resizeable.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    AveCommonModule,
    DatepickerModule,
    CheckBoxModule
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
    DataTableCellFilterTmplComponent,
    DataTableFootTmplComponent,
    DataTableFootComponent,
    DataTableTmplsComponent,
    DataTableCellTmplComponent,
    DataTablePagerComponent,
    DataTablePagerTmplComponent,
    DataTableRowComponent,
    ResizeableDirective,
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
    DataTableCellFilterTmplComponent,
    DataTableFootTmplComponent,
    DataTableFootComponent,
    DataTableTmplsComponent,
    DataTableCellTmplComponent,
    DataTablePagerComponent,
    DataTablePagerTmplComponent,
    DataTableRowComponent,
    ResizeableDirective,
    DataTableHeadCellTmplComponent
  ],
  providers: [],
})
export class DataTableModule {
}
