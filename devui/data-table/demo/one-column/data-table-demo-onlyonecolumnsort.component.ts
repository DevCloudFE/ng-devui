import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoadingType } from 'ng-devui/loading';
import { ColumnAdjustStrategy } from 'ng-devui/data-table';
import { originSource, SourceType } from '../mock-data';

@Component({
  selector: 'd-datatable-demo-onlyonecolumnsort',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './data-table-demo-onlyonecolumnsort.component.html'
})
export class DatatableDemoOnlyOneColumnSortComponent implements OnInit {
  pagerSource = JSON.parse(JSON.stringify(originSource));
  sortableDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  filterList2 = [
    {
      name: 'Clear',
      value: 'Clear',
    }, {
      name: 'Male',
      value: 'Male',
    }, {
      name: 'Female',
      value: 'Female',
    }];
  filterList = [
    {
      name: 'Mark',
      value: 'Mark'
    },
    {
      name: 'Jacob',
      value: 'Jacob'
    },
    {
      name: 'Danni',
      value: 'Danni'
    },
    {
      name: 'green',
      value: 'green'
    },
    {
      name: 'po',
      value: 'po'
    },
    {
      name: 'john',
      value: 'john'
    },

  ];
  filterListMulti = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  sortedColumn = [{
    field: 'lastName',
    direction: 'ASC'
  }];
  hideColumn = ['hidden'];
  total = 20;
  next = 1;
  complete = false;
  lazyDataSource = [];
  loading: LoadingType;
  columnAdjustStrategy = ColumnAdjustStrategy.mousemove;
  constructor(private ref: ChangeDetectorRef) { }
  ngOnInit() {
  }

  changePageContent($event) {
    this.sortableDataSource = this.pagerSource.slice(($event.pageIndex - 1) * $event.pageSize, $event.pageIndex * $event.pageSize - 1);
  }

  multiSortChange(multiSort) {
    console.log('multiSort selected', multiSort);
  }

  onResize(event) {
    console.log(event);
  }

  filterChangeRadio($event) {
    if ($event.name === 'Clear') {
      this.sortableDataSource = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
      return;
    }
    const filterList = $event.name;
    const dataDisplay = [];
    JSON.parse(JSON.stringify(originSource.slice(0, 6))).map(item => {
      if (filterList.includes(item.gender)) {
        dataDisplay.push(item);
      }
    });
    this.sortableDataSource = dataDisplay;
  }

  filterChangeMultiple($event) {
    const filterList = $event.map(item => item.name);
    const dataDisplay = [];
    JSON.parse(JSON.stringify(originSource.slice(0, 6))).map(item => {
      if (filterList.includes(item.firstName)) {
        dataDisplay.push(item);
      }
    });
    this.sortableDataSource = dataDisplay;
  }

  beforeFilter = (currentValue) => {
    console.log(currentValue);
    this.filterListMulti = this.filterList;
    this.ref.detectChanges();
    return true;
  }
}
