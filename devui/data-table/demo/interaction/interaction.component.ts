import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
      width: '150px'
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
      width: '150px'
    },
    {
      field: 'dob',
      width: '150px'
    },
    {
      field: 'description',
      width: '150px'
    }
  ];

  _totalWidth = 0;
  lastWidth = 0;
  firstResize = true;

  lastNameSortDirection = SortDirection.ASC;
  genderSortDirection = SortDirection.default;
  sortParams = {field: 'lastName', direction: this.lastNameSortDirection};
  checkboxList = [];
  allChecked = false;
  halfChecked = false;
  filterIconActive = false;

  constructor(
    private ref: ChangeDetectorRef,
    private ele: ElementRef
  ) { }
  ngOnInit() {
    this.checkboxList = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
    this.sortableDataSource[0]['$checkDisabled'] = true;
  }

  onSortChange(event: SortEventArg, field) {
    this.sortParams = {
      field: field,
      direction: event.direction
    };
  }

  onResize({ width, beforeWidth }, field) {
    const index = this.tableWidthConfig.findIndex((config) => {
      return config.field === field;
    });
    if (index > -1) {
      if (this.firstResize) {
        this.firstResize = false;
        const ratio = beforeWidth / parseInt(this.tableWidthConfig[index].width, 10);
        this.tableWidthConfig.forEach(t => {
          t.width = parseInt(t.width, 10) * ratio + 'px';
        });
        this._totalWidth = this.ele.nativeElement.querySelector('.table-wrap').offsetWidth;
        this.lastWidth = parseInt(this.tableWidthConfig.slice(-1)[0].width);
      }
      this.tableWidthConfig[index].width = width + 'px';

      let newWidthTotal = 0;
      this.tableWidthConfig.forEach(t => {
        newWidthTotal += parseInt(t.width, 10);
      });

      const lastCol = this.tableWidthConfig[this.tableWidthConfig.length - 1];
      const lastColWidth = parseInt(lastCol.width, 10);
      const changeValue = newWidthTotal - this._totalWidth;
      if (changeValue < 0) {
        lastCol.width = lastColWidth + this._totalWidth - newWidthTotal + 'px';
      } else if (lastColWidth > this.lastWidth) {
        const lastChange = (lastColWidth - this.lastWidth) > changeValue ? changeValue : (lastColWidth - this.lastWidth);
        lastCol.width = lastColWidth - lastChange + 'px';
      }
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
  };

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
