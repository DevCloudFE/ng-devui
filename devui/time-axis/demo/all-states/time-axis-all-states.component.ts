import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'd-demo-time-axis-all-states',
    templateUrl: './time-axis-all-states.component.html'
})
export class TimeAxisAllStatesComponent implements OnInit {
    time_axis_data_left: any = [];
    time_axis_data_bottom: any = [];
    time_axis_data_horizontal: any = [];

    constructor() {
    }

    ngOnInit() {
        this.time_axis_data_left = {
            position: 'left',
            model: 'text',
            list: [
                { time: '2017-07-25', text: '这是2017-07-25发生的事件', type: 'success' },
                { time: '2017-07-27', text: '这是2017-07-27发生的事件', type: 'success' },
                { time: '2017-07-28', text: '这是2017-07-28发生的事件', type: 'success' },
                { time: '2017-07-29', text: '这是2017-07-29发生的事件', type: 'success' }
            ]
        };

        this.time_axis_data_bottom = {
            position: 'bottom',
            model: 'text',
            list: [
                { time: '2017-07-25', text: '这是2017-07-25发生的事件', type: 'primary' },
                { time: '2017-07-27', text: '这是2017-07-27发生的事件', type: 'primary' },
                { time: '2017-07-28', text: '这是2017-07-28发生的事件', type: 'primary' },
                { time: '2017-07-29', text: '这是2017-07-29发生的事件', type: 'primary' }
            ]
        };

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
