import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { ProgressComponent } from 'ng-devui/progress';

@Component({
  selector: 'd-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss'],
})
export class MultipleComponent implements AfterViewInit {
  @ViewChild('multilineBar') barInstance: ProgressComponent;
  @ViewChild('multilineCircle') circleInstance: ProgressComponent;
  @ViewChild('barTemplate') barTemplate: TemplateRef<any>;
  config = [];
  content = 'This is a progress bar with a gradient background color.';
  count = 0;
  percentage = 0;
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
    { color: '#029931', percentage: '0%' },
    { color: '', percentage: '40%' },
    { color: '#5e7ce0', percentage: '100%' },
  ];

  ngAfterViewInit(): void {
    if (this.barTemplate) {
      setTimeout(() => {
        this.config = [
          {
            name: 'success',
            color: '#029931',
            percentage: 21,
            template: this.barTemplate,
          },
          {
            name: 'fail',
            color: '#f66f6a',
            percentage: 16,
            template: this.barTemplate,
          },
          {
            name: 'other',
            color: '#fac20a',
            percentage: 30,
            template: this.barTemplate,
          },
        ];
      });
    }
    this.progressing(3);
  }

  progressing(time: number): void {
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
