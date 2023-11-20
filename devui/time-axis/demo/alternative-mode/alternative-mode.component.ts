import { Component } from '@angular/core';

@Component({
  selector: 'd-demo-time-axis-alternative-mode',
  templateUrl: './alternative-mode.component.html',
})
export class AlternativeModeComponent {
  dataHorizontal = {
    direction: 'horizontal',
    list: [
      {
        text: 'Download',
        position: 'top',
        dotColor: 'chocolate'
      },
      {
        text: 'Check',
        position: 'bottom',
        dotColor: 'var(--devui-success)'
      },
      {
        text: 'Build',
        position: 'top',
        dotColor: 'var(--devui-danger)'
      },
      {
        text: 'Deploy',
        position: 'bottom',
        dotColor: 'var(--devui-warning)'
      },
      {
        text: 'End',
        position: 'top',
        dotColor: 'var(--devui-waiting)'
      },
    ]
  };
  dataVertical = {
    direction: 'vertical',
    list: [
      {
        text: 'Download'
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
        text: 'Deploy',
        dotColor: 'var(--devui-warning)'
      },
      {
        text: 'End',
        dotColor: 'var(--devui-waiting)'
      },
    ]
  };
}
