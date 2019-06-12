import { Component, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { DataTableFootTmplComponent } from './tmpl/data-table-foot-tmpl.component';
import { DataTableTmplsComponent } from './tmpl/data-table-tmpls.component';
import { DataTableComponent } from './data-table.component';
import { DataTablePager } from './data-table.model';

@Component({
  selector: 'ave-data-table-pager, [aveDataTablePager]',
  templateUrl: './data-table-pager.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTablePagerComponent {
  @Input() pager: DataTablePager;
  @Input() dataTableTemplates: DataTableTmplsComponent;
  @Input() pagerTemplate: DataTableFootTmplComponent;
  pagerMaxItems = 8;

  constructor(public dt: DataTableComponent) {

  }

  onPageChange($event: number) {
    this.dt.onPageChange($event);
  }
}
