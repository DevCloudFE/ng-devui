import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableComponent, TableCheckOptions, TableWidthConfig } from 'ng-devui/data-table';
import { originSource, SourceType } from '../mock-data';

@Component({
  selector: 'd-check-options',
  templateUrl: './check-options.component.html',
  styles: [`
  .page-nation {
    position: absolute;
    right: 12px;
    margin-top: 4px;
  }
  `]
  })
export class CheckOptionsComponent implements OnInit {
  @ViewChild(DataTableComponent, { static: true }) datatable: DataTableComponent;

  bufferSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource));
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(this.bufferSource.slice(0, 6)));

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
      field: 'checkbox',
      width: '60px'
    },
    {
      field: '#',
      width: '10%'
    },
    {
      field: 'firstName',
      width: '30%'
    },
    {
      field: 'lastName',
      width: '30%'
    },
    {
      field: 'gender',
      width: '30%'
    },
    {
      field: 'dob',
      width: '30%'
    }
  ];

  checkOptions: TableCheckOptions[] = [
    {
      label: '全选所有数据',
      onChecked: this.checkTotalData.bind(this)
    },
    {
      label: '全选当前页数据',
      onChecked: this.checkPageData.bind(this)
    }
  ];

  pager = {
    total: 12,
    pageIndex: 1,
    pageSize: 6
  };

  totalDataChecked = false;
  allCheckedStatus = false;

  checkTotalData() {
    this.datatable.setTableCheckStatus(
      {
        pageAllChecked: true
      }
    );
    this.totalDataChecked = true;
    this.allCheckedStatus = true;
    this.bufferSource = this.bufferSource.map(item => ({ $checked: true, ...item }));
  }

  checkAllChange(checked: boolean) {
    this.allCheckedStatus = checked;

    this.updateCurrentPageDataCheck(checked);
  }

  checkPageData() {
    this.datatable.setTableCheckStatus(
      {
        pageAllChecked: true
      }
    );
    this.totalDataChecked = false;
    this.allCheckedStatus = true;

    this.updateCurrentPageDataCheck(true);
  }

  onRowCheckChange(checked, rowIndex, nestedIndex, rowItem) {
    rowItem.$checked = checked;
    rowItem.$halfChecked = false;
    this.datatable.setRowCheckStatus({
      rowIndex: rowIndex,
      nestedIndex: nestedIndex,
      rowItem: rowItem,
      checked: checked
    });

    const dataItem = this.bufferSource.find(item => item.id === rowItem.id);
    dataItem.$checked = checked;

    this.totalDataChecked = this.basicDataSource.every(item => item.$checked);
    this.allCheckedStatus = this.bufferSource.every(item => item.$checked);
  }

  ngOnInit() {
  }

  onPageIndexChange(pageIndex) {
    const startIndex = (pageIndex - 1) * this.pager.pageSize;
    const lastIndex = pageIndex * this.pager.pageSize;
    this.basicDataSource = this.bufferSource.slice(startIndex, lastIndex);
  }

  private updateCurrentPageDataCheck(checked: boolean) {
    const startIndex = (this.pager.pageIndex - 1) * 6;
    for (let i = startIndex; i < this.pager.pageSize; i++) {
      this.bufferSource[i].$checked = checked;
    }
  }
}
