import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataTableComponent, LoadingType } from 'ng-devui';
import { EMPTY } from 'rxjs';

@Component({
    selector: 'ave-datatable-demo-lazyloaddata',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './data-table-demo-lazyloaddata.component.html'
})
export class DatatableDemoLazyloadDataComponent implements OnInit {

  // Lazy Load
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

      loadMore(datatable: DataTableComponent) {
        if (this.next > this.total) {
            return;
        }

        const end = this.next + 20;
        const dataSource = [];
        for (; this.next < end; this.next++) {
            dataSource.push({
                firstName: 'Danni',
                lastName: 'Yu',
                gender: 'Female',
                dob: new Date(1991, 3, 1),
                detail: '这是另外一个行详情'
            });
        }
        this.lazyDataSource = this.lazyDataSource.concat(dataSource);
        this.complete = this.next > this.total;
        datatable.loadFinish(this.complete);
        if (this.complete) {
            this.loading = EMPTY;
        }
        console.log(`load more`, this.next, this.complete);
    }

  ngOnInit() {
  }
}
