import { Component, OnInit } from '@angular/core';
import { originSource, SourceType } from '../mock-data';

@Component({
    selector: 'd-basic-old',
    templateUrl: './basic-old.component.html',
    standalone: false
})
export class BasicOldComponent implements OnInit {
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  dataTableOptions = {
    columns: [
      {
        field: 'firstName',
        header: 'First Name',
        fieldType: 'text',
        order: 1
      },
      {
        field: 'lastName',
        header: 'Last Name',
        fieldType: 'text',
        order: 2
      },
      {
        field: 'gender',
        header: 'Gender',
        fieldType: 'text',
        order: 3
      },
      {
        field: 'dob',
        header: 'Date of birth',
        fieldType: 'date',
        order: 4
      }
    ]
  };

  ngOnInit() {
  }
}
