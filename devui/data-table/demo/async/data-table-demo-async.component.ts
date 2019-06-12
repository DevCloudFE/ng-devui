import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { LoadingType } from 'ng-devui';
import { originSource, SourceType } from '../mock-data';

@Component({
    selector: 'ave-datatable-demo-async',
    templateUrl: './data-table-demo-async.component.html'
})
export class DatatableDemoAsyncComponent implements OnInit {

    /*get Async DataSource*/
    remoteDataSource: Array<SourceType> = [];
    showLoading = false;
    isDynamicColumn = false;
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

    remoteDataOptions = this.dataTableOptions.columns.slice();

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        this.loading = new Observable((function (observer) {
            if (this.complete) {
                observer.onNext(this.complete);
                observer.onCompleted();
            }
        }).bind(this));
    }

    getRemoteData() {
            this.remoteDataSource = [];
            this.showLoading = true;
            if (this.isDynamicColumn) {
                this.remoteDataOptions = [];
            }
            timer(2 * 1000).subscribe(() => {
                if (this.isDynamicColumn) {
                    this.remoteDataOptions = this.dataTableOptions.columns.map((col) => {
                        return Object.assign({}, col, {header: `${col.header}(dynamic)`});
                    });
                }
                this.remoteDataSource = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
                this.showLoading = false;
                this.changeDetectorRef.markForCheck();
            });
        }

    toggleOptions() {
        this.isDynamicColumn = !this.isDynamicColumn;
        if (this.isDynamicColumn) {
            this.remoteDataSource = [];
            this.remoteDataOptions = [];
        } else {
            this.remoteDataSource = [];
            this.remoteDataOptions = this.dataTableOptions.columns.slice();
        }
    }


  ngOnInit() {
  }
}
