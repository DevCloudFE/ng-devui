import { Component, Input } from '@angular/core';
import { DataTableComponent } from './data-table.component';
import { DataTablePager } from './data-table.model';
import { DataTableFootTmplComponent } from './tmpl/data-table-foot-tmpl.component';

@Component({
  selector: 'd-data-table-pager, [dDataTablePager]',
  templateUrl: './data-table-pager.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTablePagerComponent {
  @Input() pager: DataTablePager;
  @Input() pagerTemplate: DataTableFootTmplComponent;
  pagerMaxItems = 8;

  constructor(public dt: DataTableComponent) {

  }

  onPageChange($event: number) {
    this.dt.onPageChange($event);
  }
}
