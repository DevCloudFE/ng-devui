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

  ngOnInit() {
  }

  onEditEnd(rowItem, field) {
    rowItem[field] = false;
  }

  beforeEditStart = (rowItem, field) => {
    return true;
  }

  beforeEditEnd = (rowItem, field) => {
    console.log('beforeEditEnd');
    if (rowItem && rowItem[field].length < 3) {
      return false;
    } else {
      return true;
    }
  }
}
