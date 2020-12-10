import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { DataTableComponent } from './data-table.component';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';
import { DataTableCellViewTmplComponent } from './tmpl/data-table-cell-view-tmpl.component';
import { DataTableCellEditTmplComponent } from './tmpl/data-table-cell-edit-tmpl.component';
import { DataTableCellComponent } from './data-table-cell.component';
import { DataTableBodyComponent } from './data-table-body.component';
import { DataTableHeadComponent } from './data-table-head.component';
import { DataTableRowComponent } from './data-table-row.component';
import { PaginationModule } from 'ng-devui/pagination';
import { DataTableHeadCellTmplComponent } from './tmpl/data-table-head-cell-tmpl.component';
import { DCommonModule } from 'ng-devui/common';
import { DatepickerModule } from 'ng-devui/datepicker';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { ButtonModule } from 'ng-devui/button';
import { WindowRefModule } from 'ng-devui/window-ref';
import { SelectModule, SelectComponent } from 'ng-devui/select';
import { InputNumberModule, InputNumberComponent } from 'ng-devui/input-number';
import { DropDownModule } from 'ng-devui/dropdown';
import { TreeSelectModule, TreeSelectComponent } from 'ng-devui/tree-select';
import { SafePipeModule, LazyLoadModule } from 'ng-devui/utils';
import { DisPlayCellValuePipe } from './display-cell-value.pipe';
import { TooltipModule } from 'ng-devui/tooltip';
import { EditorDirective } from './editor-host.directive';
import { DragDropModule } from 'ng-devui/dragdrop';
import { TableThComponent } from './table/head/th/th.component';
import { FilterComponent } from './table/head/th/filter/filter.component';
import { SortComponent } from './table/head/th/sort/sort.component';
import { TableTheadComponent } from './table/head/thead.component';
import { TableTrComponent } from './table/row/tr.component';
import { TableTbodyComponent } from './table/body/tbody.component';
import { TableTdComponent } from './table/body/td/td.component';
import { DataTableCellTmplComponent } from './tmpl/data-table-cell-tmpl.component';
import { TableTdService } from './table/body/td/td.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WindowRefModule,
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
    LazyLoadModule
  ],
  exports: [
    DataTableComponent,
    DataTableColumnTmplComponent,
    DataTableCellViewTmplComponent,
    DataTableCellEditTmplComponent,
    DataTableBodyComponent,
    DataTableHeadComponent,
    DataTableCellComponent,
    DataTableRowComponent,
    DataTableCellTmplComponent,
    DataTableHeadCellTmplComponent,
    TableThComponent,
    FilterComponent,
    SortComponent,
    TableTheadComponent,
    TableTrComponent,
    TableTbodyComponent,
    TableTdComponent
  ],
  declarations: [
    DataTableComponent,
    DataTableColumnTmplComponent,
    DataTableCellViewTmplComponent,
    DataTableCellEditTmplComponent,
    DataTableBodyComponent,
    DataTableHeadComponent,
    DataTableCellComponent,
    DataTableRowComponent,
    DataTableCellTmplComponent,
    DataTableHeadCellTmplComponent,
    DisPlayCellValuePipe,
    EditorDirective,
    TableThComponent,
    FilterComponent,
    SortComponent,
    TableTheadComponent,
    TableTrComponent,
    TableTbodyComponent,
    TableTdComponent
  ],
  
  providers: [ TableTdService ],
})
export class DataTableModule {
}
