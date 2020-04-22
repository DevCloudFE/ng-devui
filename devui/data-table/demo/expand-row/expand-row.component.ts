import { Component, OnInit, HostBinding, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { originSource, SourceType } from '../mock-data';
import { TableExpandConfig } from 'ng-devui/data-table';


@Component({
  selector: 'd-expand-row',
  templateUrl: './expand-row.component.html',
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
    margin-top: -6px;
    margin-bottom: -6px;
  }
  .tips-icon {
    margin-right: 5px;
  }
  `
  ]
})
export class ExpandRowComponent implements OnInit, AfterContentInit {
  @ViewChild('quickAddRowTip', { static: true }) quickAddRowTip: ElementRef;
  @ViewChild('quickAddRowContent', { static: true }) quickAddRowContent: ElementRef;
  @ViewChild('addSubRowContent', { static: true }) addSubRowContent: ElementRef;

  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  genderSource = ['male', 'female'];
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

}
