import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableComponent } from 'ng-devui/data-table';
import { SourceType, originSource } from '../mock-data';

@Component({
  selector: 'd-fix-header-virtual-scroll',
  templateUrl: './fix-height-virtual-scroll.component.html',
  styles: [
    `
    .splitter-wrapper{
      height: 600px;
      padding: 10px;
    }
    d-splitter-pane{
      padding: 5px 0;
    }
    `
  ]
})
export class FixHeightVirtualScrollComponent implements OnInit {

  @ViewChild('dataTable') dataTable: DataTableComponent;
  dataTableOptions = {
    columns: [
      {
        field: 'firstName',
        header: 'First Name',
        fieldType: 'text',
        sortable: true,
      },
      {
        field: 'lastName',
        header: 'Last Name',
        fieldType: 'text',
        sortable: true,
      },
      {
        field: 'gender',
        header: 'gender',
        fieldType: 'text',
        sortable: true,
      },
      {
        field: 'dob',
        header: 'Date of birth',
        fieldType: 'date',
        sortable: true,
      }
    ]
  };

  dataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice()));
  ngOnInit() {
    const tempArray = [];
    for (let i = 0; i < 100; i++) {
      tempArray.push({
        id: i,
        firstName: 'Mark' + i,
        lastName: 'Otto',
        dob: new Date(1990, 12, 1),
        gender: 'Male',
      });
    }
    this.dataSource = [...this.dataSource, ...tempArray];
  }

  updateScrollSize() {
    // 非window.resize改变的虚拟滚动表格，需要通过table实例来更新CDk虚拟滚动的视窗大小来实现新的高度渲染
    this.dataTable.updateVirtualScrollSize();
  }

}
