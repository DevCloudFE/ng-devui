import { AfterContentInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TableExpandConfig } from 'ng-devui/data-table';
import { originSource, SourceType } from '../mock-data';

@Component({
    selector: 'd-expand-row-old',
    templateUrl: './expand-row-old.component.html',
    styles: [
        `
  .input-block {
    width: 200px;
    display: inline-block;
    margin-right: 5px;
  }
  .cursor-pointer{
    vertical-align: middle;
    cursor: pointer;
  }
  .edit-padding-fix {
    margin-top: -2px;
    margin-bottom: -2px;
  }
  .tips-icon {
    margin-right: 5px;
  }
  `
    ],
    standalone: false
})
export class ExpandRowOldComponent implements OnInit, AfterContentInit {
  @ViewChild('quickAddRowTip', { static: true }) quickAddRowTip: TemplateRef<any>;
  @ViewChild('quickAddRowContent', { static: true }) quickAddRowContent: TemplateRef<any>;
  @ViewChild('addSubRowContent', { static: true }) addSubRowContent: TemplateRef<any>;

  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  headerExpandConfig: TableExpandConfig;
  defaultRowData = {
    firstName: '',
    lastName: '',
    gender: 'Female',
    dob: new Date(1991, 3, 1),
  };

  thisCellEditEnd(event) {
    console.log('cellEditEnd');
    console.log(event.rowItem);
  }

  ngOnInit() {
    this.basicDataSource[0].$expandConfig = { expand: false, expandTemplateRef: this.addSubRowContent };
  }

  ngAfterContentInit() {
    this.headerExpandConfig = { expand: true, expandTemplateRef: this.quickAddRowTip };
  }

  newRow() {
    this.headerExpandConfig.expandTemplateRef = this.quickAddRowContent;
  }

  quickRowAdded() {
    const newData = { ...this.defaultRowData };
    this.basicDataSource.unshift(newData);
    this.headerExpandConfig.expandTemplateRef = this.quickAddRowTip;
  }

  quickRowCancel() {
    this.headerExpandConfig.expandTemplateRef = this.quickAddRowTip;
  }

  subRowAdded(index, item) {
    this.basicDataSource[index].$expandConfig.expand = false;
    const newData = { ...this.defaultRowData };
    this.basicDataSource.splice(index + 1, 0, newData);
  }

  subRowCancel(index) {
    this.basicDataSource[index].$expandConfig.expand = false;
  }
  toggle(event) {
    console.log(event);
  }
}
