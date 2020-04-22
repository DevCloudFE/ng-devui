import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { SourceType, originSource } from '../mock-data';

@Component({
    selector: 'd-datatable-demo-basic',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './data-table-demo-basic.component.html'
})
export class DatatableDemoBasicComponent implements OnInit {
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
            header: 'gender',
            fieldType: 'text'
        },
        {
            field: 'dob',
            header: 'Date of birth',
            fieldType: 'date'
        }
    ]
};


  ngOnInit() {
  }
}
