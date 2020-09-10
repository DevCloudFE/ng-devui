import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SourceType, originSource } from '../mock-data';
import { TableWidthConfig } from 'ng-devui/data-table';

@Component({
  selector: 'd-muti-drag-row',
  templateUrl: './muti-drag-row.component.html',
  styleUrls: ['./muti-drag-row.component.scss']
})
export class MutiDragRowComponent implements OnInit {

  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  dataTableOptions = {
    columns: [
      {
        field: 'firstName',
        header: 'First Name',
        fieldType: 'text'
      },
      {
        field: 'lastName',
        header: 'Last Name',
        fieldType: 'text'
      },
      {
        field: 'gender',
        header: 'Gender',
        fieldType: 'text'
      },
      {
        field: 'dob',
        header: 'Date of birth',
        fieldType: 'date'
      }
    ]
  };

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'drag',
      width: '4%'
    },
    {
      field: 'firstName',
      width: '24%'
    },
    {
      field: 'lastName',
      width: '24%'
    },
    {
      field: 'gender',
      width: '24%'
    },
    {
      field: 'dob',
      width: '24%'
    }
  ];

  list = [];
  constructor(private cdr: ChangeDetectorRef) { }
  ngOnInit() {
  }

  batchSelect(item) {
    item.isSelected = !(item.isSelected || false);
    this.cdr.detectChanges();
  }

  removeItem(item: any, list: Array<any>) {
    const index = list.indexOf(item);
    list.splice(index, 1);
  }

  batchSelectCheck(event: MouseEvent, item) {
    if (event.ctrlKey) {
      this.batchSelect(item);
    }
  }

  batchDrop(e) {
    let fromIndexLessThanDropIndexCount = 0;
    e.batchDragData.map((dragData) => {
      const index = this.basicDataSource.indexOf(dragData);
      if (index > -1 && index < e.dropIndex) {
        fromIndexLessThanDropIndexCount++;
      }
      return dragData;
    }).forEach((dragData) => {
      this.removeItem(dragData, this.basicDataSource);
    });
    this.basicDataSource.splice(e.dropIndex - fromIndexLessThanDropIndexCount, 0, ...e.batchDragData);
    return;
  }

  onDrop(e: any) {
    if (e.batchDragData) {
      this.batchDrop(e);
      return;
    }
    let index = e.dropIndex;
    const fromIndex = e.dragFromIndex;
    if (-1 !== index) {
      /*修正同一个container排序，往下拖动index多了1个位置*/
      if (-1 !== fromIndex && index > fromIndex) {
        index--;
      }
      this.basicDataSource.splice(index, 0, fromIndex === -1 ? e.dragData : this.basicDataSource.splice(fromIndex, 1)[0]);
    } else {
      this.basicDataSource.push(e.dragData);
    }
  }

}
