import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingType } from 'ng-devui/loading';
import { Observable, timer } from 'rxjs';
import { originSource, SourceType } from '../mock-data';

@Component({
  selector: 'd-datatable-demo-async',
  templateUrl: './data-table-demo-async.component.html'
})
export class DatatableDemoAsyncComponent implements OnInit {

  /* get Async DataSource*/
  remoteDataSource: Array<SourceType> = [];
  showLoading = false;
  loading: LoadingType;
  colChanged = false;

  columns = [
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
  ];

  colDataOptions = this.columns.slice(0, 3);

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
    timer(2 * 1000).subscribe(() => {
      this.remoteDataSource = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
      this.showLoading = false;
      this.changeDetectorRef.markForCheck();
    });
  }

  toggleColOptions() {
    if (this.colChanged) {
      this.colDataOptions = this.columns.slice(0, 3);
    } else {
      this.colDataOptions = this.columns;
    }
    this.colChanged = !this.colChanged;
  }

  ngOnInit() {
  }
}
