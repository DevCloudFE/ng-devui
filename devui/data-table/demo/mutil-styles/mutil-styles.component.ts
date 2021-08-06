import { Component, OnInit } from '@angular/core';
import { TableWidthConfig } from 'ng-devui/data-table';
import { originSource, SourceType } from '../mock-data';

@Component({
  selector: 'd-mutil-styles',
  templateUrl: './mutil-styles.component.html',
  styleUrls: ['./mutil-styles.component.scss']
})
export class MutilStylesComponent implements OnInit {
  headerBk = false;
  striped = false;

  activeBorderTab: string | number = '';
  activeBorderTable: '' | 'bordered' | 'borderless' = '';
  borderItems = [
    {
      id: '',
      title: 'Normal'
    },
    {
      id: 'borderless',
      title: 'Borderless'
    },
    {
      id: 'bordered',
      title: 'Bordered'
    }
  ];

  activeSizeTab: string | number = 'sm';
  activeSizeTable: 'sm' | 'md' | 'lg' = 'sm';
  sizeItems = [
    {
      id: 'sm',
      title: 'Normal'
    },
    {
      id: 'md',
      title: 'Middle'
    },
    {
      id: 'lg',
      title: 'Large'
    }
  ];

  activeLayoutTab: string | number = 'fixed';
  activeLayoutTable: 'fixed' | 'auto' = 'fixed';
  layoutItems = [
    {
      id: 'fixed',
      title: 'fixed'
    },
    {
      id: 'auto',
      title: 'auto'
    }
  ];

  constructor() { }

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
      field: '#',
      width: '50px'
    },
    {
      field: 'firstName',
      width: '100px'
    },
    {
      field: 'lastName',
      width: '100px'
    },
    {
      field: 'gender',
      width: '50px'
    },
    {
      field: 'dob',
      width: '300px'
    }
  ];

  ngOnInit() {
  }

  layoutChange(layout) {
    if (layout === 'auto') {
      this.tableWidthConfig = [];
    } else {
      this.tableWidthConfig = [
        {
          field: '#',
          width: '50px'
        },
        {
          field: 'firstName',
          width: '100px'
        },
        {
          field: 'lastName',
          width: '100px'
        },
        {
          field: 'gender',
          width: '50px'
        },
        {
          field: 'dob',
          width: '300px'
        }
      ];
    }
  }
}
