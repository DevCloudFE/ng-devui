import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'd-demo-time-axis-html-content',
    templateUrl: './time-axis-html-content.component.html'
})
export class TimeAxisHtmlContentComponent implements OnInit {

    time_axis_html: any = [];

    constructor() {
    }

    ngOnInit() {
        this.time_axis_html = {
            position: 'left',
            model: 'html',
            list: [
              // tslint:disable-next-line: max-line-length
              {time: '2017-07-25', text: '<div class=\'blue\' style=\'font-weight: 600\'>这是2017-07-25发生的事件</div>', type: 'primary', iconClass: 'stops'},
              {time: '2017-07-27', text: '<div class=\'red\'>这是2017-07-27发生的事件</div>', type: 'primary'},
              {time: '2017-07-28', text: '<div>这是2017-07-28发生的事件</div>', type: 'primary'},
              {time: '2017-07-29', text: '<div class=\'blue\'>这是2017-07-29发生的事件</div>', type: 'primary'}
            ]};
    }
}
