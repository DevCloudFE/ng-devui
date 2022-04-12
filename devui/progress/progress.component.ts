import {
  Component,
  ContentChild,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef
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
  /**
   * @deprecated
   * 用stroleColor替换
   */
  @Input() barbgcolor: string;
  @Input() strokeColor: string;
  /**
   * @deprecated
   * 统一用strokeWidth
   */
  @Input() set height(value) {
    this.strokeWidth = parseInt(value, 10);
  };
  @Input() strokeWidth = 14; // 进度条的线条宽度
  /**
   * @deprecated
   * 用type类型替换
   */
  @Input() set isCircle(value: boolean) {
    this.type = value ? 'circle' : 'line';
  };
  @Input() type: 'line' | 'circle' = 'line';
  @Input() showContent = true;
  @ContentChild(TemplateRef) customViewTemplate: TemplateRef<any>;
  trailPath: { [key: string]: string };
  strokePath: { [key: string]: string };
  pathString: string;
  constructor() {

  }
  ngOnInit(): void {
    if (this.type === 'circle') {
      this.setCircleProgress();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.type === 'circle') {
      this.setCircleProgress();
    }
  }
  setCircleProgress(): void {
    if (this.type !== 'circle') {
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
      stroke: this.strokeColor || this.barbgcolor || (null as any),
      strokeDasharray: `${(this.percentage / 100) * len }px ${len}px`,
      strokeDashoffset: `0`,
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s'
    };
  }
}
