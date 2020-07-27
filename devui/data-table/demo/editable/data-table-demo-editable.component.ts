import { Component, OnInit } from '@angular/core';
import { EditableTip } from 'ng-devui/data-table';
import { editableOriginSource, genderSource, SourceType } from '../mock-data';

@Component({
    selector: 'd-editable',
    templateUrl: './data-table-demo-editable.component.html'
})
export class DatatableDemoEditableComponent implements OnInit {
  genderSource = genderSource;
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(editableOriginSource.slice(0, 6)));

  editableTip = EditableTip.btn;
  nameEditing: boolean;
  thisCellEditEnd(event) {
    console.log('cellEditEnd');
    console.log(event.rowItem);
  }

  ngOnInit() {
  }

  onEditEnd(rowItem, field) {
    rowItem[field] = false;
  }
}
