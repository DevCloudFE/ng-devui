import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableComponent, FilterConfig, SortDirection, SortEventArg } from 'ng-devui/data-table';
import { LoadingType } from 'ng-devui/loading';
import { SourceType, originSource } from '../mock-data';

@Component({
  selector: 'd-interaction-column',
  templateUrl: './interaction-column.component.html',
  styleUrls: ['./interaction-column.component.scss'],
})
export class InteractionColumnComponent implements OnInit {

  @ViewChild(DataTableComponent, { static: true }) datatable: DataTableComponent;
  pagerSource = JSON.parse(JSON.stringify(originSource));
  sortableDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  filterList2: FilterConfig[] = [
    {
      name: 'Clear',
      value: 'Clear',
    },
    {
      name: 'Male',
      value: 'Male',
      selected: true,
    },
    {
      name: 'Female',
      value: 'Female',
    },
  ];
  filterList = [
    {
      name: 'Mark',
      value: 'Mark',
    },
    {
      name: 'Jacob',
      value: 'Jacob',
    },
    {
      name: 'Danni',
      value: 'Danni',
    },
    {
      name: 'green',
      value: 'green',
    },
    {
      name: 'po',
      value: 'po',
    },
    {
      name: 'john',
      value: 'john',
    },
  ];
  filterListMulti = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  sortedColumn: SortEventArg[] = [
    {
    field: 'lastName',
      direction: SortDirection.ASC,
    },
  ];
  hideColumn = ['hidden'];
  total = 20;
  next = 1;
  complete = false;
  lazyDataSource = [];
  loading: LoadingType;
  checkboxList = [];
  allChecked = false;
  halfChecked = false;
  filterIconActive = false;

  constructor(private ref: ChangeDetectorRef) {}
  ngOnInit() {
    this.checkboxList = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
    this.filterChangeRadio(this.filterList2[1]);
    (this.sortableDataSource[0] as any).$checkDisabled = true;
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
    JSON.parse(JSON.stringify(originSource.slice(0, 6))).forEach((item) => {
      if (filterList.includes(item.gender)) {
        dataDisplay.push(item);
      }
    });
    this.sortableDataSource = dataDisplay;
  }

  filterChangeMultiple($event) {
    const filterList = $event.map((item) => item.name);
    const dataDisplay = [];
    JSON.parse(JSON.stringify(originSource.slice(0, 6))).forEach((item) => {
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
  };

  getCheckedRows() {
    const rows = this.datatable.getCheckedRows();
    console.log(rows);
  }

  onCheckboxChange($event, name) {
    this.setHalfChecked();
  }
  setHalfChecked() {
    this.halfChecked = false;
    const chosen = this.checkboxList.filter((item) => item.chosen);
    if (chosen.length === this.checkboxList.length) {
      this.allChecked = true;
    } else if (chosen.length > 0) {
      this.halfChecked = true;
    } else {
      this.allChecked = false;
      this.halfChecked = false;
    }
  }

  filterSource(dropdown) {
    this.sortableDataSource = this.checkboxList.filter((item) => item.chosen);
    this.filterIconActive = true;
    dropdown.toggle();
  }

  cancelFilter(dropdown) {
    dropdown.toggle();
  }

  cellDBClick(e) {
    console.log('cellDB');
    console.log(e);
  }
  cellClick(e) {
    console.log('cell');
    console.log(e);
  }
  rowDBClick(e) {
    console.log('rowDB');
    console.log(e);
  }

  rowClick(e) {
    console.log('row');
    console.log(e);
  }

  onToggle(data) {
    console.log('onToggle ---', data);
  }

}
