import { Component, OnInit } from '@angular/core';
import { TimeAxisData } from 'ng-devui/time-axis';
@Component({
    selector: 'd-demo-time-axis-all-states',
    templateUrl: './time-axis-all-states.component.html'
})
export class TimeAxisAllStatesComponent implements OnInit {
    time_axis_data_left: TimeAxisData;
    time_axis_data_bottom: TimeAxisData;

    constructor() {
    }

    ngOnInit() {
        this.time_axis_data_left = {
            position: 'left',
            model: 'text',
            list: [
                { time: '2017-07-25', text: 'some events in 2017-07-25', type: 'success' },
                { time: '2017-07-27', text: 'some events in 2017-07-27', type: 'success' },
                { time: '2017-07-28', text: 'some events in 2017-07-28', type: 'success' },
                { time: '2017-07-29', text: 'some events in 2017-07-29', type: 'success' }
            ]
        };

        this.time_axis_data_bottom = {
            position: 'bottom',
            model: 'text',
            list: [
                { time: '2017-07-25', text: 'some events in 2017-07-25', type: 'success' },
                { time: '2017-07-27', text: 'some events in 2017-07-27', type: 'success' },
                { time: '2017-07-28', text: 'some events in 2017-07-28', type: 'success' },
                { time: '2017-07-29', text: 'some events in 2017-07-29', type: 'success' }
            ]
        };
    }
}
