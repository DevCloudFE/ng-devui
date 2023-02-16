import { Component, OnInit } from '@angular/core';
import { TableStyleData, TableWidthConfig } from 'ng-devui/data-table';
import { originSource, SourceType } from '../mock-data';

@Component({
  selector: 'd-dynamic-cols-demo',
  templateUrl: './dynamic-cols-demo.component.html'
})
export class DynamicColsDemoComponent implements OnInit {
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  allColumns = [
    {
      field: 'id',
      header: 'id',
      fieldType: 'text',
      width: '50px',
      checked: true,
      disabled: true
    },
    {
      field: 'firstName',
      header: 'First Name',
      fieldType: 'text',
      width: '150px',
      checked: true
    },
    {
      field: 'lastName',
      header: 'Last Name',
      fieldType: 'text',
      width: '150px',
      checked: true
    },
    {
      field: 'gender',
      header: 'Gender',
      fieldType: 'text',
      width: '150px',
      checked: true
    },
    {
      field: 'dob',
      header: 'Date of birth',
      fieldType: 'date',
      width: '150px',
      checked: true
    },
    {
      field: 'description',
      header: 'description',
      fieldType: 'text',
      width: '150px',
      checked: true
    },
  ];
  dataTableOptions: any = {
    columns: [
      {
        field: 'id',
        header: 'id',
        fieldType: 'text'
      },
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
      },
      {
        field: 'description',
        header: 'description',
        fieldType: 'text'
      },
    ]
  };

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'id',
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
      width: '150px'
    },
    {
      field: 'dob',
      width: '150px'
    },
    {
      field: 'description',
      width: '150px'
    }
  ];

  styleSetting: TableStyleData = {
    size: 'sm',
    borderType: '',
    striped: false,
    shadowType: 'embed'
  };

  ngOnInit() {
    console.log(this.basicDataSource);
  }

  onColsChanges(e) {
    this.allColumns = e;
    this.tableWidthConfig = [];
    this.dataTableOptions.columns = this.allColumns.filter(t => t.checked);
    this.tableWidthConfig = this.dataTableOptions.columns;
  }

  onStyleChanges(e) {
    this.styleSetting = e;
  }
}
