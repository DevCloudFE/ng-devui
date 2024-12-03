import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { SourceType, originSource } from '../mock-data';

@Component({
  selector: 'd-datatable-demo-async',
  templateUrl: './data-table-demo-async.component.html',
})
export class DatatableDemoAsyncComponent implements OnInit {

  /* get Async DataSource*/
  remoteDataSource: Array<SourceType> = [];
  showLoading = false;
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
    },
  ];

  colDataOptions = this.columns.slice(0, 3);

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

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

  ngOnInit() {}
}
