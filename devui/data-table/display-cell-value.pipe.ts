import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'disPlayCellValuePipe'})
export class DisPlayCellValuePipe implements PipeTransform {
  constructor() {}
  transform(cellValue, cellItem, column): any {
    if (column.extraOptions && column.extraOptions.filterKey) {
      if (column.extraOptions.multiple) {
        if (cellItem && cellItem.length > 0) {
          let displayValue = '';
          displayValue = cellItem.map(item => item[column.extraOptions.filterKey]).join(';');
          return displayValue;
        } else {
          return '--';
        }
      } else {
        return (cellItem && cellItem[column.extraOptions.filterKey]) || '--';
      }
    } else {
      if (column.extraOptions && column.extraOptions.multiple) {
        if (cellItem && cellItem.length > 0) {
          let displayValue = '';
          displayValue = cellItem.join(';');
          return displayValue;
        } else {
          return '--';
        }
      } else {
        return cellValue === 0 ? 0 : (cellValue || '--');
      }
    }
  }
}
