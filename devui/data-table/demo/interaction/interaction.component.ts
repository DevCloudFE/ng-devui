import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableComponent, SortDirection, SortEventArg, TableWidthConfig } from 'ng-devui/data-table';
import { originSource, SourceType } from '../mock-data';

@Component({
  selector: 'd-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.scss']
})
export class InteractionComponent implements OnInit {
  @ViewChild(DataTableComponent, { static: true }) datatable: DataTableComponent;
  sortableDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  filterListRadio = [
    {
      name: 'Clear',
      value: 'Clear',
    }, {
      name: 'Male',
      value: 'Male',
    }, {
      name: 'Female',
      value: 'Female',
    }
  ];

  firstFilterList = [
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
  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'checkbox',
      width: '36px'
    },
    {
      field: '$index',
      width: '50px'
    },
    {
      field: 'firstName',
      width: '150px'
    },
    {
      field: 'lastName',
      width: '150px'
    },
    {
      field: 'gender',
      width: '100px'
    },
    {
      field: 'dob',
      width: '100px'
    },
    {
      field: 'dob',
      width: '100px'
    },
    {
      field: 'dob',
      width: '100px'
    },
    {
      field: 'dob',
      width: '100px'
    },
    {
      field: 'dob',
      width: '100px'
    },
    {
      field: 'dob',
      width: '100px'
    }
  ];

  lastNameSortDirection = SortDirection.ASC;
  genderSortDirecticon = SortDirection.default;
  sortParams = {field: 'lastName', direction: this.lastNameSortDirection};
  checkboxList = [];
  allChecked = false;
  halfChecked = false;
  filterIconActive = false;

  constructor(private ref: ChangeDetectorRef) { }
  ngOnInit() {
    this.checkboxList = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  }

  onSortChange(event: SortEventArg, field) {
    switch (field) {
      case 'Gender':
        this.lastNameSortDirection = SortDirection.default;
      break;
      case 'lastName':
        this.genderSortDirecticon = SortDirection.default;
        break;
      default:
        break;
    }

    this.sortParams = {
      field: field,
      direction: event.direction
    };
  }

  onResize({ width }, field) {
    const index = this.tableWidthConfig.findIndex((config) => {
      return config.field === field;
    });
    if (index > -1) {
      this.tableWidthConfig[index].width = width + 'px';
    }
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

  onFirstFilterChange($event) {
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
    this.filterListMulti = this.firstFilterList;
    this.ref.detectChanges();
    return true;
  }

  onRowCheckChange(checked, rowIndex, nestedIndex, rowItem) {
    rowItem.$checked = checked;
    rowItem.$halfChecked = false;
    this.datatable.setRowCheckStatus({
      rowIndex: rowIndex,
      nestedIndex: nestedIndex,
      rowItem: rowItem,
      checked: checked
    });
  }

  onCheckboxChange($event, name) {
    this.setHalfChecked();
  }
  setHalfChecked() {
    this.halfChecked = false;
    const chosen = this.checkboxList.filter(item => item.chosen);
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
    this.sortableDataSource = this.checkboxList.filter(item => item.chosen);
    this.filterIconActive = true;
    dropdown.toggle();
  }

  cancelFilter(dropdown) {
    dropdown.toggle();
  }

  getCheckedRows() {
    const rows = this.datatable.getCheckedRows();
    console.log(rows);
  }
}
