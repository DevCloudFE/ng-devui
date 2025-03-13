import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableWidthConfig } from 'ng-devui/data-table';
import { originSource, SourceType } from '../mock-data';

@Component({
    selector: 'd-expand-row',
    templateUrl: './expand-row.component.html',
    styles: [
        `
  .input-block {
    width: 200px;
    display: inline-block;
    margin-right: 5px;
  }
  .cursor-pointer{
    vertical-align: middle;
    cursor: pointer;
  }
  .edit-padding-fix {
    margin-top: -2px;
    margin-bottom: -2px;
  }
  .tips-icon {
    margin-right: 5px;
  }
  `
    ],
    standalone: false
})
export class ExpandRowComponent implements OnInit, AfterContentInit {
  @ViewChild('quickAddRowTip') quickAddRowTip: ElementRef;
  @ViewChild('quickAddRowContent') quickAddRowContent: ElementRef;
  @ViewChild('addSubRowContent') addSubRowContent: ElementRef;

  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'expand',
      width: '40px'
    },
    {
      field: '$index',
      width: '50px'
    },
    {
      field: 'firstName',
      width: '150px'
    },
    {
      field: 'lastName',
      width: '150px'
    },
    {
      field: 'gender',
      width: '100px'
    },
    {
      field: 'dob',
      width: '100px'
    }
  ];
  defaultRowData = {
    firstName: '',
    lastName: '',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
  };

  headerNewForm: boolean;
  ngOnInit() {
    this.basicDataSource[0].$expandConfig = { expand: false };
  }

  ngAfterContentInit() {}

  newRow() {
    this.headerNewForm = true;
  }

  quickRowAdded() {
    const newData = { ...this.defaultRowData };
    this.basicDataSource.unshift(newData);
    this.headerNewForm = false;
  }

  quickRowCancel() {
    this.headerNewForm = false;
  }

  subRowAdded(index, item) {
    this.basicDataSource[index].$expandConfig.expand = false;
    const newData = { ...this.defaultRowData };
    this.basicDataSource.splice(index + 1, 0, newData);
  }

  subRowCancel(index) {
    this.basicDataSource[index].$expandConfig.expand = false;
  }

  toggleExpand(rowItem) {
    if (rowItem.$expandConfig) {
      rowItem.$expandConfig.expand = !rowItem.$expandConfig.expand;
    }
  }
}
