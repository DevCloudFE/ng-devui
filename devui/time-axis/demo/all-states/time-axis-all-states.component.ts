import { Component, OnInit } from '@angular/core';
import { TimeAxisData } from 'ng-devui/time-axis';

@Component({
  selector: 'd-demo-time-axis-all-states',
  templateUrl: './time-axis-all-states.component.html',
  styleUrls: ['./time-axis-all-states.component.scss'],
})
export class TimeAxisAllStatesComponent implements OnInit {
  timeAxisDataLeft: TimeAxisData;
  timeAxisDataBottom: TimeAxisData;

  ngOnInit(): void {
    this.timeAxisDataLeft = {
      position: 'left',
      model: 'text',
      list: [
        { time: '2017/07/25', text: 'some events in 2017/07/25', type: 'success' },
        { time: '2017/07/27', text: 'some events in 2017/07/27', type: 'warning' },
        { time: '2017/07/28', text: 'some events in 2017/07/28', type: 'danger' },
        { time: '2017/07/29', text: 'some events in 2017/07/29', type: 'primary' }
      ],
    };

    this.timeAxisDataBottom = {
      position: 'bottom',
      model: 'text',
      list: [
        { time: '2017/07/25', text: 'some events in 2017/07/25', type: 'success' },
        { time: '2017/07/27', text: 'some events in 2017/07/27', type: 'success' },
        { time: '2017/07/28', text: 'some events in 2017/07/28', type: 'success' },
        { time: '2017/07/29', text: 'some events in 2017/07/29', type: 'success' }
      ],
    };
  }
}
