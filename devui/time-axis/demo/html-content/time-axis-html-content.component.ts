import { Component, OnInit } from '@angular/core';
import { TimeAxisData } from 'ng-devui/time-axis';
@Component({
    selector: 'd-demo-time-axis-html-content',
    templateUrl: './time-axis-html-content.component.html'
})
export class TimeAxisHtmlContentComponent implements OnInit {

    time_axis_html: TimeAxisData;
    time_axis_html2: TimeAxisData;

    constructor() {
    }

    ngOnInit() {
        this.time_axis_html = {
            position: 'left',
            model: 'html',
            direction: 'vertical',
            list: [
              // tslint:disable-next-line: max-line-length
              {time: '2017-07-25', text: '<div class=\'blue\' style=\'font-weight: 600\'>some events in 2017-07-25</div>', type: 'primary', iconClass: 'stops'},
              {time: '2017-07-27', text: '<div class=\'red\'>some events in 2017-07-27</div>', type: 'primary'},
              {time: '2017-07-28', text: '<div>some events in 2017-07-28</div>', type: 'primary'},
              {time: '2017-07-29', text: '<div class=\'blue\'>some events in 2017-07-29</div>', type: 'primary'}
            ]};
        this.time_axis_html2 = {
            position: 'left',
            model: 'html',
            direction: 'horizontal',
            list: [
                // tslint:disable-next-line: max-line-length
                {time: '2017-07-25', text: '<div class=\'blue\' style=\'font-weight: 600\'>some events in 2017-07-25</div>', type: 'primary', iconClass: 'stops'},
                {time: '2017-07-27', text: '<div class=\'red\'>some events in 2017-07-27</div>', type: 'primary'},
                {time: '2017-07-28', text: '<div>some events in 2017-07-28</div>', type: 'primary'},
                {time: '2017-07-29', text: '<div class=\'blue\'>some events in 2017-07-29</div>', type: 'primary'}
            ]};
    }
}
