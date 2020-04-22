import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from 'ng-devui/utils';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';

@Pipe({ name: 'disPlayCellValuePipe' })
export class DisPlayCellValuePipe implements PipeTransform {
  datePicker = {
    format: {
      date: 'YYYY-MM-DD',
      time: 'YYYY-MM-DD HH:mm'
    }
  };

  constructor() { }
  transform(rowItem, rowIndex, column: DataTableColumnTmplComponent): any {
    if (!column || !column.field) {
      return null;
    }

    if (column.field === '$index') {
      return rowIndex + 1;
    }

    const cellItem = rowItem[column.field];

    switch (column.fieldType) {
      case 'date':
        let pattern;
        if (column.extraOptions && column.extraOptions.dateFormat) {
          pattern = column.extraOptions.dateFormat;
        } else {
          pattern = column.extraOptions && column.extraOptions.showTime ?
            this.datePicker.format.time : this.datePicker.format.date;
        }
        return cellItem ? formatDate(new Date(cellItem), pattern) : '';
      case 'select':
      case 'treeSelect':
        if (column.extraOptions && column.extraOptions.multiple) {
          if (cellItem && cellItem.length > 0) {
            let displayValue;
            if (column.extraOptions.filterKey) {
              displayValue = cellItem.map(item => item[column.extraOptions.filterKey]).join(';');
            } else {
              displayValue = cellItem.join(';');
            }
            return displayValue;
          } else {
            return '--';
          }
        } else {
          let displayValue;
          if (column.extraOptions && column.extraOptions.filterKey) {
            displayValue = cellItem ? cellItem[column.extraOptions.filterKey] : cellItem;
          } else {
            displayValue = cellItem;
          }
          return displayValue === 0 ? 0 : (displayValue || '--');
        }
      default:
        return cellItem === 0 ? 0 : (cellItem || '--');
    }
  }
}
