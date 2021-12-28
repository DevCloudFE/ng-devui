import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  CheckableRelation,
  DataTableComponent,
  TableWidthConfig
} from 'ng-devui/data-table';
import {
  SourceType,
  treeDataSource
} from '../mock-data';

@Component({
  selector: 'd-tree-data',
  templateUrl: './tree-data.component.html',
  styles: ['.demo-margin { margin: 5px 5px 0 0;}']
})
export class TreeDataComponent implements OnInit {
  iconParentOpen: string;
  iconParentClose: string;
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(treeDataSource.slice(0, 6)));
  checkableRelation: CheckableRelation = {downward: true, upward: true};
  @ViewChild(DataTableComponent, { static: true }) datatable: DataTableComponent;

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'checkbox',
      width: '4%'
    },
    {
      field: 'title',
      width: '36%'
    },
    {
      field: 'lastName',
      width: '20%'
    },
    {
      field: 'status',
      width: '20%'
    },
    {
      field: 'dob',
      width: '20%'
    }
  ];

  ngOnInit() {
    this.basicDataSource[0].$isChildTableOpen = true;
  }

  onChildTableToggle(status, rowItem) {
    this.datatable.setRowChildToggleStatus(rowItem, status);
  }

  loadChildrenTable = (rowItem) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (rowItem.title === 'table title1') {
          if (rowItem.children && rowItem.children.length === 0) {
            rowItem.children.push({
              title: 'table title11',
              lastName: 'Mark',
              status: 'done',
              dob: new Date(1989, 1, 1),
              startDate: new Date(2020, 1, 4),
              endDate: new Date(2020, 1, 8)
            });
          }
        }
        resolve(rowItem);
      }, 500);

    });
  };

  loadAllChildrenTable = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.basicDataSource[0].children[0].children[1].children[0].children = [];
        this.basicDataSource[0].children[0].children[1].children[0].children.push({
          title: 'table title01211',
          lastName: 'Mark',
          status: 'done',
          dob: new Date(1989, 1, 1),
        },
        {
          title: 'table title01212',
          lastName: 'Mark',
          status: 'done',
          dob: new Date(1991, 3, 1)
        });
        resolve(undefined);
      }, 500);
    });
  };

  setUnCheckableRelation(type) {
    if (type === 'upward') {
      this.checkableRelation.upward = false;
    } else {
      this.checkableRelation.downward = false;
    }
  }

  toggleIcon() {
    this.iconParentOpen = '<span class="icon icon-chevron-right"></span>';
    this.iconParentClose = '<span class="icon icon-chevron-down"></span>';
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

  expandAll() {
    this.datatable.setTableChildrenToggleStatus(true);
  }
}
