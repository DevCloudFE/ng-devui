import { Component, OnInit } from '@angular/core';
import { TableWidthConfig } from 'ng-devui/data-table';
import { originSource, SourceType } from '../mock-data';

@Component({
    selector: 'd-header-grouping',
    templateUrl: './header-grouping.component.html',
    standalone: false
})
export class HeaderGroupingComponent implements OnInit {
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  tableWidthConfig: TableWidthConfig[] = [
    {
      field: '$index',
      width: '50px'
    },
    {
      field: 'dob',
      width: '200px'
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
    }
  ];

  onResize({ width }, field) {
    const index = this.tableWidthConfig.findIndex((config) => {
      return config.field === field;
    });
    if (index > -1) {
      this.tableWidthConfig[index].width = width + 'px';
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
