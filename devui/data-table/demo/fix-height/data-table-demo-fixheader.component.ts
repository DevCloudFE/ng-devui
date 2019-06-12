import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { originSource, SourceType } from '../mock-data';

@Component({
    selector: 'ave-datatable-demo-fixheader',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './data-table-demo-fixheader.component.html'
})
export class DatatableDemoFixheaderComponent implements OnInit {

   maxHeightAndFixHeaderDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice()));

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

    onRowCheckChange($event, datatable) {
        console.log($event, datatable.getCheckRows());
    }

   onCheckAllChange($event) {
        console.log($event);
    }

  ngOnInit() {
  }
}
