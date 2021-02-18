import { Component, OnInit } from '@angular/core';
import { TimeAxisData } from 'ng-devui/time-axis';
@Component({
    selector: 'd-demo-time-axis-direction',
    templateUrl: './time-axis-direction.component.html'
})
export class TimeAxisDirectionComponent implements OnInit {
  time_axis_data_horizontal: TimeAxisData;

  constructor() {}

  ngOnInit() {
    this.time_axis_data_horizontal = {
      direction: 'horizontal',
      model: 'text',
      list: [
        {text: 'Download', type: 'success', status: 'runned'},
        {text: 'Check', type: 'danger', status: 'runned'},
        {text: 'Build', type: 'primary', status: 'running'},
        {text: 'Depoy', type: 'primary', status: ''},
        {text: 'End', type: 'primary', status: ''}
      ]
    };
  }
}
