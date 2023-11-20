import { Component } from '@angular/core';

@Component({
  selector: 'd-demo-time-axis-direction',
  templateUrl: './time-axis-direction.component.html',
})
export class TimeAxisDirectionComponent {
  dataHorizontal = {
    direction: 'horizontal',
    model: '',
    list: [
      {
        text: 'Download',
        time: '2021/07/28'
      },
      {
        text: 'Check',
        time: '2021/07/29',
        dotColor: 'var(--devui-success)'
      },
      {
        text: 'Build',
        time: '2021/07/30',
        dotColor: 'var(--devui-danger)'
      },
      {
        text: 'Deploy',
        time: '2021/07/31',
        dotColor: 'var(--devui-warning)'
      },
      {
        text: 'End',
        time: '2021/08/01',
        dotColor: 'var(--devui-waiting)'
      },
    ],
  };
  dataVertical = {
    direction: 'vertical',
    model: '',
    list: [
      {
        text: 'Download',
        time: '2021/07/28'
      },
      {
        text: 'Check',
        time: '2021/07/29',
        position: 'right',
        dotColor: 'var(--devui-success)'
      },
      {
        text: 'Build',
        time: '2021/07/30',
        position: 'right',
        dotColor: 'var(--devui-danger)'
      },
      {
        text: 'Deploy',
        time: '2021/07/31',
        position: 'right',
        dotColor: 'var(--devui-warning)'
      },
      {
        text: 'End',
        time: '2021/08/01',
        position: 'right',
        dotColor: 'var(--devui-waiting)',
        lineStyle: { style: 'none' }
      },
    ],
  };
}
