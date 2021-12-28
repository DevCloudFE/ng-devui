import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-demo-time-axis-alternative-mode',
  templateUrl: './alternative-mode.component.html'
})
export class AlternativeModeComponent implements OnInit {
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
        text: 'Depoy',
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
        text: 'Depoy',
        dotColor: 'var(--devui-warning)'
      },
      {
        text: 'End',
        dotColor: 'var(--devui-waiting)'
      },
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
