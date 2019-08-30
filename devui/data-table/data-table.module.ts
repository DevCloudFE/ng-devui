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
import { DataTableHeadTmplComponent } from './tmpl/data-table-head-tmpl.component';
import { DataTableCellFilterTmplComponent } from './tmpl/data-table-cell-filter-tmpl.component';
import { DataTableFootTmplComponent } from './tmpl/data-table-foot-tmpl.component';
import { DataTableFootComponent } from './data-table-foot.component';
import { PaginationModule } from 'ng-devui/pagination';
import { DataTableTmplsComponent } from './tmpl/data-table-tmpls.component';
import { DataTableCellTmplComponent } from './tmpl/data-table-cell-tmpl.component';
import { DataTablePagerComponent } from './data-table-pager.component';
import { DataTablePagerTmplComponent } from './tmpl/data-table-pager-tmpl.component';
import { DataTableHeadCellTmplComponent } from './tmpl/data-table-head-cell-tmpl.component';
import { DCommonModule } from 'ng-devui/common';
import { DatepickerModule } from 'ng-devui/datepicker';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { ResizeableDirective } from './resizeable.directive';
import { DevUIConfig } from 'ng-devui/devui.config';
import { ButtonModule } from 'ng-devui/button';
import { SelectModule } from 'ng-devui/select';
import { InputNumberModule } from 'ng-devui/input-number';
import { SearchModule } from 'ng-devui/search';
import { DropDownModule } from 'ng-devui/dropdown';
import { TreeSelectModule } from 'ng-devui/tree-select';
import { SafePipeModule } from 'ng-devui/utils';
import { DisPlayCellValuePipe } from './display-cell-value.pipe';
import { DynamicCellTemplatePipe } from './dynamic-cell-template.pipe';
import { I18nService } from 'ng-devui/utils';

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
    SearchModule,
    DropDownModule,
    TreeSelectModule,
    SafePipeModule
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
    DataTableHeadCellTmplComponent,
    DynamicCellTemplatePipe,
    DisPlayCellValuePipe
  ],
  providers: [DevUIConfig, I18nService],
})
export class DataTableModule {
}
