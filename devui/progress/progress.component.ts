import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'd-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  preserveWhitespaces: false,
})
export class ProgressComponent implements OnInit , OnChanges {
  @Input() percentage = 0;
  @Input() percentageText: string;
  @Input() barbgcolor: string;
  @Input() height = '16px';
  @Input() strokeWidth = 6; // 设置圈形进度条宽度，进度条与画布宽度的百分比
  @Input() isCircle = false;
  @Input() showContent = true;
  @ContentChild(TemplateRef) customViewTemplate: TemplateRef<any>;
  trailPath: { [key: string]: string };
  strokePath: { [key: string]: string };
  pathString: string;
  constructor() {

  }
  ngOnInit(): void {
    if (this.isCircle) {
      this.setCircleProgress();
   }
  }
  ngOnChanges(changes: SimpleChanges): void {
   if (this.isCircle) {
      this.setCircleProgress();
   }
  }
  setCircleProgress(): void {
    if (!this.isCircle) {
      return;
    }
    const radius = 50 - this.strokeWidth / 2;
    const beginPositionY = -radius;
    const endPositionY = radius * -2;

    this.pathString = `M 50,50 m 0,${beginPositionY}
     a ${radius},${radius} 0 1 1 0,${-endPositionY}
     a ${radius},${radius} 0 1 1 0,${endPositionY}`;

    const len = Math.PI * 2 * radius;

    this.trailPath = {
      strokeDasharray: `${len}px ${len}px`,
      strokeDashoffset: `0`,
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
    };
    this.strokePath = {
      stroke: this.barbgcolor || (null as any),
      strokeDasharray: `${(this.percentage / 100) * len }px ${len}px`,
      strokeDashoffset: `0`,
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s'
    };
  }
}
