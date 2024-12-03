import { Component } from '@angular/core';
import { TableWidthConfig } from 'ng-devui/data-table';
import { SourceType, originSource } from '../mock-data';

@Component({
  selector: 'd-drag-row',
  templateUrl: './drag-row.component.html',
  styleUrls: ['./drag-row.component.scss'],
})
export class DragRowComponent {
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  dataTableOptions = {
    columns: [
      {
        field: 'firstName',
        header: 'First Name',
        fieldType: 'text',
      },
      {
        field: 'lastName',
        header: 'Last Name',
        fieldType: 'text',
      },
      {
        field: 'gender',
        header: 'Gender',
        fieldType: 'text',
      },
      {
        field: 'dob',
        header: 'Date of birth',
        fieldType: 'date',
      },
    ],
  };

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'drag',
      width: '4%',
    },
    {
      field: 'firstName',
      width: '24%',
    },
    {
      field: 'lastName',
      width: '24%',
    },
    {
      field: 'gender',
      width: '24%',
    },
    {
      field: 'dob',
      width: '24%',
    },
  ];

  removeItem(item: any, list: Array<any>) {
    const index = list.map((e) => e.name).indexOf(item.name);
    list.splice(index, 1);
  }

  onDrop(e: any) {
    let index = e.dropIndex;
    const fromIndex = e.dragFromIndex;
    if (-1 !== index) {
      /* 修正同一个container排序，往下拖动index多了1个位置*/
      if (-1 !== fromIndex && index > fromIndex) {
        index--;
      }
      this.basicDataSource.splice(index, 0, fromIndex === -1 ? e.dragData : this.basicDataSource.splice(fromIndex, 1)[0]);
    } else {
      this.basicDataSource.push(e.dragData);
    }
  }
}
