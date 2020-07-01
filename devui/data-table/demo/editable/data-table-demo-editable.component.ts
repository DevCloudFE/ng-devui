import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import {editableOriginSource, SourceType, genderSource} from '../mock-data';
import { EditableTip } from 'ng-devui/data-table';

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

  onEditing(editing, rowItem, editField) {
    rowItem[editField] = editing;
  }

  dateEditEnd(rowItem) {
    rowItem['dateEdit'] = false;
  }

  genderEditEnd(rowItem) {
    rowItem['genderEdit'] = false;
  }
}
