import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DataTableFootTmplComponent } from './tmpl/data-table-foot-tmpl.component';

@Component({
  selector: 'ave-data-table-foot,[aveDataTableFoot]',
  templateUrl: './data-table-foot.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableFootComponent {
  @Input() footTemplate: DataTableFootTmplComponent;
}
