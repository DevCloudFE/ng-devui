import { Component, ContentChild, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { merge } from 'lodash-es';
import { IGradientColor, IProgressItem, ShowContentConfig } from './progress.types';

@Component({
  selector: 'd-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  preserveWhitespaces: false,
})
export class ProgressComponent implements OnChanges {
  static ID_SEED = 0;
  @Input() isDynamic = true;
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
  gradientColor: IGradientColor[] = [];
  isGradient = false;
  showContentConfig = {
    showInnerContent: false,
    showOuterContent: false,
    showCenterContent: true,
  };

  get content() {
    return this.percentageText ? this.percentageText : `${this.percentage}%`;
  }

  constructor() {
    this.id = ProgressComponent.ID_SEED++;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { isCircle, multiProgressConfig, percentage, showContent, strokeColor, type } = changes;
    const hasChanged = [percentage, strokeColor, type, isCircle].some((change) => change);

    if (multiProgressConfig || (this.multiProgressConfig?.length && percentage) || (!this.multiProgressConfig?.length && hasChanged)) {
      this.render();
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

  render(): void {
    const data = this.multiProgressConfig?.length
      ? [...this.multiProgressConfig]
      : [
        {
          color: (this.checkStrokeColor() || this.barbgcolor) ?? '',
          percentage: this.percentage ?? 0,
          percentageText: this.percentageText ?? '',
          content: this.content ?? '',
        },
      ];

    if (this.type === 'line') {
      this.checkSumOfPercentages(data, (sum: number, item: IProgressItem) => {
        item.width = sum;
      });
    }

    if (this.type === 'circle') {
      this.setCircleProgress(data);
    }

    // 展示数据倒序输出，短的后输出，显示层级高
    data.reverse();

    if (this.isDynamic) {
      // merge方式覆盖数据，不改变数据源，避免重渲染dom导致动画失效
      merge(this.progressData, data);
    } else {
      this.progressData = [...data];
    }
  }

  setCircleProgress(data: IProgressItem[]): void {
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
    this.checkSumOfPercentages(data, (sum: number, item: IProgressItem) => {
      item.strokePath = {
        stroke: item.color || this.checkStrokeColor() || this.barbgcolor || (null as any),
        strokeDasharray: `${(sum / 100) * len}px ${len}px`,
        strokeDashoffset: `0`,
        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s',
      };
    });
  }

  checkSumOfPercentages(data: IProgressItem[], func: Function) {
    const result = data.reduce((sum: number, item: IProgressItem, index: number) => {
      sum += Number(item.percentage);
      sum = sum > 100 || (index > 0 && index === data.length - 1 && this.percentage === 100) ? 100 : sum;
      func(sum, item);
      return sum;
    }, 0);
    this.percentage = this.percentage >= 100 ? 100 : result;
  }

  checkStrokeColor(): string {
    if (Array.isArray(this.strokeColor)) {
      this.isGradient = true;
      this.gradientColor = this.strokeColor;
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
