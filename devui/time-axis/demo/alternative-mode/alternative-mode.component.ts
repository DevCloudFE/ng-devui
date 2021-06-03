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
          type: 'success'
        },
        {
          text: 'Build',
          position: 'top',
          type: 'danger'
        },
        {
          text: 'Depoy',
          position: 'bottom',
          type: 'warning'
        },
        {
          text: 'End',
          position: 'top',
          type: 'waiting'
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
          type: 'success'
        },
        {
          text: 'Build',
          type: 'danger'
        },
        {
          text: 'Depoy',
          type: 'warning'
        },
        {
          text: 'End',
          type: 'waiting'
        },
      ]
    };

  constructor() { }

  ngOnInit() {
  }

}
