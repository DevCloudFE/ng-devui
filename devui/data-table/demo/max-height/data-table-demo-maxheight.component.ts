import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { originSource, SourceType } from '../mock-data';

@Component({
    selector: 'd-datatable-demo-maxheight',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './data-table-demo-maxheight.component.html',
    standalone: false
})
export class DatatableDemoMaxheightComponent implements OnInit {

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

  maxHeightDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice()));

  ngOnInit() {
  }
}
