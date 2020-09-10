import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';

import {LoadingType} from 'ng-devui/loading';
import { EMPTY } from 'rxjs';
import { DataTableComponent } from 'ng-devui/data-table';
import { originSource } from './../mock-data';
@Component({
    selector: 'd-datatable-demo-lazyloaddata',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './data-table-demo-lazyloaddata.component.html'
})
export class DatatableDemoLazyloadDataComponent implements OnInit {
    showLoading = false;
  // Lazy Load
    total = 40;
    next = 1;
    complete = false;
    lazyDataSource = originSource;

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

    constructor(private cdr: ChangeDetectorRef) {}

      loadMore(event) {
        if (this.next > this.total) {
            return;
        }
        this.showLoading = true;
        const end = this.next + 20;
        const dataSource = [];
        for (; this.next < end; this.next++) {
            dataSource.push({
                firstName: 'Danni',
                lastName: 'Yu',
                gender: 'Female',
                dob: new Date(1991, 3, 1)
            });
        }
        setTimeout(() => {
            this.lazyDataSource = this.lazyDataSource.concat(dataSource);
            this.showLoading = false;
            this.cdr.detectChanges();
        }, 300);
        this.complete = this.next > this.total;
        console.log(`load more`, this.next, this.complete);
    }

  ngOnInit() {
  }
}
