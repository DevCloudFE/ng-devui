import { Component, OnInit, ViewChild } from '@angular/core';
import { ProgressComponent } from 'ng-devui/progress';

@Component({
  selector: 'd-multiple',
  templateUrl: './multiple.component.html',
})
export class MultipleComponent implements OnInit {
  @ViewChild('multilineBar') barInstance: ProgressComponent;
  @ViewChild('multilineCircle') circleInstance: ProgressComponent;
  percentage = 0;
  content = 'This is a progress bar with a gradient background color.';
  count = 0;
  config = [
    {
      name: 'success',
      color: '#50d4ab',
      percentage: 21,
    },
    {
      name: 'fail',
      color: '#f66f6a',
      percentage: 16,
    },
    {
      name: 'other',
      color: '#fac20a',
      percentage: 30,
    },
  ];
  showContentConfig = {
    showInnerContent: true,
    showOuterContent: false,
    showCenterContent: false,
  };
  circleGradientColor = [
    { color: '#db4d83', percentage: '0%' },
    { color: '#ffad63', percentage: '100%' },
  ];
  lineGradientColor = [
    { color: '#50d4ab', percentage: '0%' },
    { color: '', percentage: '40%' },
    { color: '#5e7ce0', percentage: '100%' },
  ];

  ngOnInit(): void {
    this.progressing(3);
  }

  progressing(time: number) {
    setTimeout(() => {
      if (this.count < time) {
        this.config.forEach((item) => {
          item.percentage += Math.ceil(Math.random() * 3);
        });
        this.barInstance.render();
        this.circleInstance.render();
        this.count++;
        this.progressing(time);
      } else {
        setTimeout(() => {
          const rest = this.config.slice(0, -1);
          const last = this.config.slice(-1)[0];
          last.percentage = rest.reduce((total, item) => total - item.percentage, 100);
          /* set percentage to 100 to complete the multi-stage progress. */
          this.percentage = 100;
        }, 1000);
      }
    }, 1000);
  }
}
