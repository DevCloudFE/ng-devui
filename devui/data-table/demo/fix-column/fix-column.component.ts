import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { DataTableComponent, TableWidthConfig } from 'ng-devui/data-table';
import { originSource, SourceType } from '../mock-data';

@Component({
    selector: 'd-fix-column',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './fix-column.component.html',
    standalone: false
})
export class FixColumnComponent implements OnInit {
  @ViewChild(DataTableComponent, { static: true }) datatable: DataTableComponent;
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  dataTableOptions = {
    columns: [
      {
        field: 'firstName',
        header: 'First Name',
        fieldType: 'text',
        fixedLeft: '41px'
      },
      {
        field: 'lastName',
        header: 'Last Name',
        fieldType: 'text'
      },
      {
        field: 'gender',
        header: 'gender',
        fieldType: 'text'
      },
      {
        field: 'gender',
        header: 'gender',
        fieldType: 'text'
      },
      {
        field: 'gender',
        header: 'gender',
        fieldType: 'text'
      },
      {
        field: 'gender',
        header: 'gender',
        fieldType: 'text'
      },
      {
        field: 'dob',
        header: 'Date of birth',
        fieldType: 'date'
      },
      {
        field: 'dob',
        header: 'Date of birth',
        fieldType: 'date'
      },
      {
        field: 'dob',
        header: 'Date of birth',
        fieldType: 'date'
      },
      {
        field: 'dob',
        header: 'Date of birth',
        fieldType: 'date'
      },
      {
        field: 'dob',
        header: 'Date of birth',
        fieldType: 'date',
        fixedRight: '0px'
      }
    ]
  };

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'checkbox',
      width: '41px'
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
      field: 'gender',
      width: '150px'
    },
    {
      field: 'gender',
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
      field: 'dob',
      width: '150px'
    },
    {
      field: 'dob',
      width: '150px'
    },
    {
      field: 'dob',
      width: '150px'
    },
    {
      field: 'dob',
      width: '150px'
    }
  ];

  ngOnInit() {
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
}
