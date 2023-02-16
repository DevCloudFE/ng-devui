import { Component } from '@angular/core';

@Component({
  selector: 'd-demo-time-axis-single',
  templateUrl: './single.component.html'
})
export class TimeAxisSingleComponent {
  dataBottom = {
    direction: 'horizontal',
    model: '',
    horizontalAlign: 'left',
    list: [
      {
        text: 'Post',
      },
      {
        text: 'Check',
        dotColor: 'var(--devui-success)'
      },
      {
        text: 'Build',
        dotColor: 'var(--devui-danger)'
      },
      {
        text: 'Patch',
        dotColor: 'var(--devui-warning)'
      },
      {
        text: 'End',
        dotColor: 'var(--devui-waiting)'
      }
    ]
  };

  dataRight = {
    direction: 'vertical',
    model: '',
    list: [
      {
        text: 'Download',
      },
      {
        text: 'Check',
        dotColor: 'var(--devui-success)'
      },
      {
        text: 'Build',
        dotColor: 'var(--devui-danger)'
      },
      {
        text: 'Depoy',
        dotColor: 'var(--devui-warning)'
      },
      {
        text: 'End',
        dotColor: 'var(--devui-waiting)'
      }
    ]
  };

  constructor() { }

}
