import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'd-demo-time-axis-template-content',
    templateUrl: './time-axis-template-content.component.html'
})
export class TimeAxisTemplateContentComponent implements OnInit {

    time_axis_template: any = [];

    constructor() {
    }

    ngOnInit() {
        this.time_axis_template = {
            position: 'left',
            model: 'template',
            list: [
                {type: 'primary', status: 'running', data: [
                    {name: '标题1', des: '2017-07-25发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题1', des: '2017-07-25发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题1', des: '2017-07-25发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题1', des: '2017-07-25发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题1', des: '2017-07-25发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'}
                ]},
                {type: 'danger', data: [
                    {name: '标题2', des: '2017-07-27发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题2', des: '2017-07-27发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题2', des: '2017-07-27发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题2', des: '2017-07-27发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题2', des: '2017-07-27发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'}
                ]},
                {type: 'success', data: [
                    {name: '标题3', des: '2017-07-28发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题3', des: '2017-07-28发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题3', des: '2017-07-28发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题3', des: '2017-07-28发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题3', des: '2017-07-28发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'}
                ]},
                {type: 'primary', iconClass: 'stops', data: [
                    {name: '标题4', des: '2017-07-29发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题4', des: '2017-07-29发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题4', des: '2017-07-29发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题4', des: '2017-07-29发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'},
                    {name: '标题4', des: '2017-07-29发生的事件', createTime: '2017-08-08 12:30:20', endTime: '2017-08-08 12:30:20'}
                ]}
            ]};
    }
}
