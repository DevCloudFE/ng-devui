import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { originSource, SourceType } from '../mock-data';

@Component({
    selector: 'd-fix-column-old',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './fix-column-old.component.html'
})
export class FixColumnOldComponent implements OnInit {
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  dataTableOptions = {
    columns: [
        {
            field: 'firstName',
            header: 'First Name',
            fieldType: 'text',
            fixedLeft: '36px'
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
          fixedRight: '0px'
        }
    ]
};

  ngOnInit() {
  }
}
