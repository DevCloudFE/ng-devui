import { Component, HostBinding, OnInit } from '@angular/core';
import {editableOriginSource, SourceType, genderSource, hobbySource, DutySource} from '../mock-data';

@Component({
    selector: 'd-datatable-demo-editable',
    templateUrl: './data-table-demo-editable.component.html'
})
export class DatatableDemoEditableComponent implements OnInit {
  genderSource = genderSource;
  hobbySource = hobbySource;
  DutySource = DutySource;
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(editableOriginSource.slice(0, 6)));
  thisCellEditEnd(event) {
    console.log('cellEditEnd');
    console.log(event.rowItem);
  }

  ngOnInit() {
  }
}
