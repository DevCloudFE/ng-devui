import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { LoadingType } from 'ng-devui';
import { SourceType, originSource } from '../mock-data';

@Component({
    selector: 'ave-datatable-demo-dynamic',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './data-table-demo-dynamic.component.html'
})
export class DatatableDemoDynamicComponent implements OnInit {

   dynamicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
   total = 20;
   next = 1;
   complete = false;
   lazyDataSource = [];
   loading: LoadingType;

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
