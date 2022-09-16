import { Component, ViewChild } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { DataTableComponent } from 'ng-devui/data-table';
import { editableOriginSource, genderSource } from '../mock-data';

@Component({
  selector: 'd-editable-old',
  templateUrl: './editable-old.component.html',
})
export class EditableOldComponent {
  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;
  genderSource = genderSource;
  basicDataSource = cloneDeep(editableOriginSource.slice(0, 6));
  thisCellEditEnd(event) {
    console.log('cellEditEnd');
    console.log(event.rowItem);
  }

  beforeCellEdit = () => {
    return new Promise((resolve) => {
      console.log('beforeCellEdit');
      resolve(undefined);
    });
  };

  finishEdit() {
    this.dataTable.cancelEditingStatus();
  }
}
