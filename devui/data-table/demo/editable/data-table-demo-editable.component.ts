import { Component } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { EditableTip } from 'ng-devui/data-table';
import { editableOriginSource, genderSource } from '../mock-data';

@Component({
  selector: 'd-editable',
  templateUrl: './data-table-demo-editable.component.html',
})
export class DatatableDemoEditableComponent {
  genderSource = genderSource;
  basicDataSource = cloneDeep(editableOriginSource.slice(0, 6));

  editableTip = EditableTip.hover;
  nameEditing: boolean;

  onEditEnd(rowItem, field) {
    rowItem[field] = false;
  }

  beforeEditStart = (rowItem, field) => {
    return true;
  };

  beforeEditEnd = (rowItem, field) => {
    console.log('beforeEditEnd');
    if (rowItem && rowItem[field].length < 3) {
      return false;
    } else {
      return true;
    }
  };
}
