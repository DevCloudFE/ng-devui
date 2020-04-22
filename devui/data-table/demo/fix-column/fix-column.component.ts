import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { SourceType, originSource } from '../mock-data';

@Component({
    selector: 'd-fix-column',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './fix-column.component.html'
})
export class FixColumnComponent implements OnInit {
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  dataTableOptions = {
    columns: [
        {
            field: 'firstName',
            header: 'First Name',
            fieldType: 'text',
            fixedLeft: '0'
        },
        {
            field: 'lastName',
            header: 'Last Name',
            fieldType: 'text'
        },
        {
            field: 'gender',
            header: 'gender',
            fieldType: 'text'
        },
        {
            field: 'dob',
            header: 'Date of birth',
            fieldType: 'date'
        },
        {
          field: 'dob',
          header: 'Date of birth',
          fieldType: 'date'
        },
        {
          field: 'dob',
          header: 'Date of birth',
          fieldType: 'date'
        },
        {
          field: 'dob',
          header: 'Date of birth',
          fieldType: 'date'
        },
        {
          field: 'dob',
          header: 'Date of birth',
          fieldType: 'date',
          fixedRight: '0'
        }
    ]
};


  ngOnInit() {
  }
}
