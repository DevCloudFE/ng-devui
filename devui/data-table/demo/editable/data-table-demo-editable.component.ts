import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import {editableOriginSource, SourceType, genderSource} from '../mock-data';
import { DataTableComponent } from 'ng-devui/data-table';

@Component({
    selector: 'd-datatable-demo-editable',
    templateUrl: './data-table-demo-editable.component.html'
})
export class DatatableDemoEditableComponent implements OnInit {
  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;
  genderSource = genderSource;
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(editableOriginSource.slice(0, 6)));
  thisCellEditEnd(event) {
    console.log('cellEditEnd');
    console.log(event.rowItem);
  }

  ngOnInit() {
  }

  finishEdit() {
    this.dataTable.cancelEditingStatus();
  }
}
