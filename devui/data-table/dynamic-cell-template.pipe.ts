import { Pipe, PipeTransform } from '@angular/core';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';
import { DataTableTmplsComponent } from './tmpl/data-table-tmpls.component';

@Pipe({name: 'dynamicCellTemplatePipe'})
export class DynamicCellTemplatePipe implements PipeTransform {
  constructor() {}
  transform(column: DataTableColumnTmplComponent, dataTableTmplsComponent: DataTableTmplsComponent, type: string): any {
    switch (type) {
      case 'view':
        return dataTableTmplsComponent.getCellViewTemplate(column);
        break;
      case 'edit':
        return dataTableTmplsComponent.getCellEditTemplate(column);
        break;
      default:
        return null;
    }
  }
}
