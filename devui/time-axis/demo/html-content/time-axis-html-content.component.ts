import { Component, OnInit } from '@angular/core';
import { TimeAxisData } from 'ng-devui/time-axis';
@Component({
    selector: 'd-demo-time-axis-html-content',
    templateUrl: './time-axis-html-content.component.html',
    styleUrls: ['./time-axis-html-content.component.scss']
})
export class TimeAxisHtmlContentComponent implements OnInit {

    timeAxisHtml: TimeAxisData;

    constructor() {
    }

    ngOnInit() {
        this.timeAxisHtml = {
            position: 'left',
            model: 'html',
            direction: 'vertical',
            list: [
              {time: '2017-07-25', text: '<div style=\'font-weight: 600\'>some events in 2017-07-25</div>',
                type: 'success', iconClass: 'stops'},
              {time: '2017-07-27', text: '<div>some events in 2017-07-27</div>', type: 'warning'},
              {time: '2017-07-28', text: '<div style=\'color: chocolate\'>some events in 2017-07-28</div>', type: 'primary'},
              {time: '2017-07-29', text: '<div>some events in 2017-07-29</div>', type: 'info'}
            ]};
    }
}
