import { Component, OnInit } from '@angular/core';
import { TimeAxisData } from 'ng-devui/time-axis';

@Component({
  selector: 'd-demo-time-axis-custom-dot',
  templateUrl: './custom-dot.component.html',
})
export class CustomDotComponent implements OnInit {
  timeAxisHtml: TimeAxisData;

  ngOnInit(): void {
    this.timeAxisHtml = {
      position: 'left',
      widthMode: 'fitWidth',
      model: 'html',
      direction: 'horizontal',
      list: [
        {
          time: '2017/07/25',
          text: 'Start',
          customDot: '<i class="icon icon-cancel-forbidden" style="font-size:16px"></i>',
          lineStyle: { style: 'dashed', color: '#adb0b8' }
        },
        {
          time: '2017/07/27',
          text: 'Check',
          customDot: '<i class="icon icon-classroom-approve" style="font-size:16px"></i>',
          lineStyle: { style: 'dashed', color: '#adb0b8' }
        },
        {
          time: '2017/07/28',
          text: 'Debug',
          customDot: '<i class="icon icon-add-bug" style="font-size:16px"></i>',
          lineStyle: { style: 'dashed', color: '#adb0b8' }
        },
        {
          time: '2017/07/29',
          text: 'Display',
          customDot: '<i class="icon icon-go-chart" style="font-size:16px"></i>',
          lineStyle: { style: 'none' }
        },
      ],
    };
  }
}
