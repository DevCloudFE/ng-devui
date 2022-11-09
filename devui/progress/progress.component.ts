import { Component, ContentChild, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { IGradientColor, IProgressItem, ShowContentConfig } from './progress.types';

@Component({
  selector: 'd-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  preserveWhitespaces: false,
})
export class ProgressComponent implements OnChanges {
  static ID_SEED = 0;
  @Input() percentage = 0;
  @Input() percentageText: string;
  /**
   * @deprecated
   * 用strokeColor替换
   */
  @Input() barbgcolor: string;
  @Input() strokeColor: string | IGradientColor[] = '';
  /**
   * @deprecated
   * 统一用strokeWidth
   */
  @Input() set height(value) {
    this.strokeWidth = parseInt(value, 10);
  }
  @Input() strokeWidth = 14; // 进度条的线条宽度
  /**
   * @deprecated
   * 用type类型替换
   */
  @Input() set isCircle(value: boolean) {
    this.type = value ? 'circle' : 'line';
  }
  @Input() type: 'line' | 'circle' = 'line';
  @Input() showContent: boolean | ShowContentConfig;
  @Input() multiProgressConfig: IProgressItem[] = [];
  @ContentChild(TemplateRef) customViewTemplate: TemplateRef<any>;

  id: number;
  pathString: string;
  trailPath: { [key: string]: string };
  progressData: IProgressItem[] = [];
  isGradient = false;
  showContentConfig = {
    showInnerContent: false,
    showOuterContent: false,
    showCenterContent: true,
  };

  get content() {
    return this.percentageText ? this.percentageText : `${this.percentage}%`;
  }

  get arrayStrokeColor() {
    return this.strokeColor as Array<IGradientColor>;
  }

  constructor() {
    this.id = ProgressComponent.ID_SEED++;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { multiProgressConfig, percentage, showContent, strokeColor, type } = changes;
    if (multiProgressConfig) {
      this.init();
    }
    if (!this.multiProgressConfig?.length && (percentage || strokeColor || type)) {
      this.init();
    }
    if (type && this.type === 'circle') {
      this.setCircleProgress();
    }
    if (showContent) {
      this.showContentConfig =
        typeof this.showContent === 'boolean'
          ? {
            showInnerContent: this.showContent,
            showOuterContent: this.showContent,
            showCenterContent: false,
          }
          : { ...this.showContentConfig, ...this.showContent };
    }
  }

  init(): void {
    this.progressData = this.multiProgressConfig?.length
      ? [...this.multiProgressConfig]
      : [
        {
          color: this.checkStrokeColor() || this.barbgcolor,
          percentage: this.percentage,
          percentageText: this.percentageText,
          content: this.content,
        },
      ];
    if (this.type === 'line') {
      this.checkSumOfPercentages((sum: number, item: IProgressItem) => {
        item.width = sum;
      });
    }
  }

  setBarInnerText(bar: IProgressItem) {
    if (!bar.content) {
      bar.content = bar.percentageText ? bar.percentageText : `${bar.percentage}%`;
    }
    return bar.content;
  }

  setCircleProgress(): void {
    const radius = 50 - this.strokeWidth / 2;
    const beginPositionY = -radius;
    const endPositionY = radius * -2;
    const len = Math.PI * 2 * radius;

    this.pathString = `M 50,50 m 0,${beginPositionY}
     a ${radius},${radius} 0 1 1 0,${-endPositionY}
     a ${radius},${radius} 0 1 1 0,${endPositionY}`;

    this.trailPath = {
      strokeDasharray: `${len}px ${len}px`,
      strokeDashoffset: `0`,
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s',
    };
    this.checkSumOfPercentages((sum: number, item: IProgressItem) => {
      item.strokePath = {
        stroke: item.color || this.checkStrokeColor() || this.barbgcolor || (null as any),
        strokeDasharray: `${(sum / 100) * len}px ${len}px`,
        strokeDashoffset: `0`,
        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s',
      };
    });
  }

  checkSumOfPercentages(func: Function) {
    const result = this.progressData.reduce((sum: number, item: IProgressItem) => {
      sum += item.percentage;
      func(sum, item);
      return sum;
    }, 0);
    if (result > 100) {
      throw new Error('The sum of percentages cannot exceed 100%.');
    } else {
      this.percentage = result;
    }
    // 和值检查通过后将展示数据倒序输出，短的后输出，显示层级高
    this.progressData.reverse();
  }

  checkStrokeColor(): string {
    if (Array.isArray(this.strokeColor)) {
      this.isGradient = true;
      if (this.type === 'line') {
        const colors = this.strokeColor.map((item) => `${item.color} ${item.percentage}`).join(', ');
        const result = `linear-gradient(to right, ${colors})`;
        return this.strokeColor.length ? result : '';
      }
      if (this.type === 'circle') {
        return `url(#devui-progress-gradient-${this.id}`;
      }
    } else {
      this.isGradient = false;
      this.strokeColor = this.strokeColor || '';
      return this.strokeColor;
    }
  }
}
