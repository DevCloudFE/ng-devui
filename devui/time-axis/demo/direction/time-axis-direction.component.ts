import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'd-demo-time-axis-direction',
    templateUrl: './time-axis-direction.component.html'
})
export class TimeAxisDirectionComponent implements OnInit {
  dataHorizontal = {
    direction: 'horizontal',
    model: '',
    list: [
      {
        text: 'Download',
        time: '2021-07-28'
      },
      {
        text: 'Check',
        time: '2021-07-29',
        type: 'success'
      },
      {
        text: 'Build',
        time: '2021-07-30',
        type: 'danger'
      },
      {
        text: 'Depoy',
        time: '2021-07-31',
        type: 'warning'
      },
      {
        text: 'End',
        time: '2021-08-01',
        type: 'waiting'
      }
    ]
  };

  dataVertical = {
    direction: 'vertical',
    model: '',
    list: [
      {
        text: 'Download',
        time: '2021-07-28'
      },
      {
        text: 'Check',
        time: '2021-07-29',
        position: 'right',
        type: 'success'
      },
      {
        text: 'Build',
        time: '2021-07-30',
        position: 'right',
        type: 'danger'
      },
      {
        text: 'Depoy',
        time: '2021-07-31',
        position: 'right',
        type: 'warning'
      },
      {
        text: 'End',
        time: '2021-08-01',
        position: 'right',
        type: 'waiting',
        lineStyle: {style: 'none'}
      }
    ]
  };

  constructor() {}

  ngOnInit() {
  }
}
