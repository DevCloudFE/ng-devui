import { Component, OnInit, ViewChild } from '@angular/core';
import { CheckableRelation, DataTableComponent } from 'ng-devui/data-table';
import { SourceType, treeDataSource } from '../mock-data';

@Component({
    selector: 'd-tree-table-old',
    templateUrl: './tree-table-old.component.html',
    styles: ['.demo-margin { margin: 5px 5px 0 0;}'],
    standalone: false
})
export class TreeTableOldComponent implements OnInit {
  extraOptions: any;
  iconParentOpen = '<span class="icon icon-chevron-right"></span>';
  iconParentClose = '<span class="icon icon-chevron-down"></span>';
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(treeDataSource.slice(0, 6)));
  checkableRelation: CheckableRelation = {downward: true, upward: true};
  @ViewChild(DataTableComponent, { static: true }) datatable: DataTableComponent;
  ngOnInit() {
    this.extraOptions = {showHeadTableToggler: true};
    this.basicDataSource[0].$isChildTableOpen = true;
  }

  cellClick(e) {
    console.log('cell');
    console.log(e);
  }

  rowClick(e) {
    console.log('row');
    console.log(e);
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
    this.basicDataSource[0].children[0].children[1].children[0].children = [];
    this.basicDataSource[0].children[0].children[1].children[0].children.push({
      title: 'table title31',
      lastName: 'Mark',
      status: 'done',
      dob: new Date(1989, 1, 1),
    },
    {
      title: 'table title32',
      lastName: 'Mark',
      status: 'done',
      dob: new Date(1991, 3, 1)
    });
    return new Promise((resolve) => {
      resolve(true);
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
    this.extraOptions = {iconUnFoldTable: this.iconParentOpen, iconFoldTable: this.iconParentClose, showHeadTableToggler: true};
  }

  expandAll() {
    this.datatable.setTableChildrenToggleStatus(true);
  }
}
