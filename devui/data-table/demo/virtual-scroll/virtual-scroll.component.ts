import { Component, OnInit } from '@angular/core';
import { originSource, SourceType } from '../mock-data';

@Component({
  selector: 'd-virtual-scroll',
  templateUrl: './virtual-scroll.component.html'
})
export class VirtualScrollComponent implements OnInit {

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
    this.expandDataSource();
  }

  private expandDataSource(): void {
    const tmp: Array<SourceType> = this.dataSource;
    for (let index = 0; index < 20; index++) {
      this.dataSource = this.dataSource.concat(tmp);
    }
  }
}
