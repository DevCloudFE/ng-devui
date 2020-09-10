import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableComponent } from 'ng-devui/data-table';
import { editableOriginSource, genderSource, SourceType } from '../mock-data';

@Component({
  selector: 'd-editable-old',
  templateUrl: './editable-old.component.html',
})
export class EditableOldComponent implements OnInit {
  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;
  genderSource = genderSource;
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(editableOriginSource.slice(0, 6)));
  thisCellEditEnd(event) {
    console.log('cellEditEnd');
    console.log(event.rowItem);
  }

  ngOnInit() {
  }

  beforeCellEdit = () => {
    return new Promise((resolve) => {
      console.log('beforeCellEdit');
      resolve();
    });
  }

  finishEdit() {
    this.dataTable.cancelEditingStatus();
  }

}
