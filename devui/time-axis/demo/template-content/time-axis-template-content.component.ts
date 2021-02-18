import { Component, OnInit } from '@angular/core';
import { TimeAxisData } from 'ng-devui/time-axis';
@Component({
    selector: 'd-demo-time-axis-template-content',
    templateUrl: './time-axis-template-content.component.html'
})
export class TimeAxisTemplateContentComponent implements OnInit {

    time_axis_template: TimeAxisData;

    constructor() {
    }

    ngOnInit() {
        this.time_axis_template = {
            position: 'left',
            model: 'template',
            list: [
                {type: 'primary', status: 'running', data: [
                    {name: '标题1', des: 'some events in 2017-07-25', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题1', des: 'some events in 2017-07-25', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题1', des: 'some events in 2017-07-25', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题1', des: 'some events in 2017-07-25', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题1', des: 'some events in 2017-07-25', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'}
                ]},
                {type: 'danger', data: [
                    {name: '标题2', des: 'some events in 2017-07-27', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题2', des: 'some events in 2017-07-27', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题2', des: 'some events in 2017-07-27', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题2', des: 'some events in 2017-07-27', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题2', des: 'some events in 2017-07-27', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'}
                ]},
                {type: 'success', data: [
                    {name: '标题3', des: 'some events in 2017-07-28', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题3', des: 'some events in 2017-07-28', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题3', des: 'some events in 2017-07-28', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题3', des: 'some events in 2017-07-28', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题3', des: 'some events in 2017-07-28', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'}
                ]},
                {type: 'primary', iconClass: 'stops', data: [
                    {name: '标题4', des: 'some events in 2017-07-29', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题4', des: 'some events in 2017-07-29', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题4', des: 'some events in 2017-07-29', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题4', des: 'some events in 2017-07-29', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题4', des: 'some events in 2017-07-29', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'}
                ]}
            ]};
    }
}
