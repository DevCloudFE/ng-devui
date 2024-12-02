import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ThemeService } from 'ng-devui/theme';
import { IAxisConfigs, IViewConfigs } from '../quadrant-diagram.type';
import { AXIS_TITLE_SPACE } from '../quadrant.config';

@Component({
  selector: 'd-quadrant-axis',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quadrant-axis.component.html',
  styleUrls: ['./quadrant-axis.component.scss'],
})
export class QuadrantDiagramAxisComponent implements OnInit, OnChanges {
  @Input() axisConfigs: IAxisConfigs;
  @Input() view: IViewConfigs;
  @Input() diagramId;
  quadrantAxis: any;
  context: any;
  axisOrigin: any;
  axisTop: number;
  axisRight: number;
  axisWidth: number;
  axisHeight: number;
  yAxisTicksNum: number;
  xAxisTicksNum: number;
  xTickSpacing: number;
  yTickSpacing: number;
  private AXIS_COLOR;
  private AXIS_LABEL_COLOR;
  themeService: ThemeService;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { axisConfigs, view } = changes;
    if (changes && (axisConfigs || view)) {
      this.resetAxis();
    }
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.themeService = (window as any).devuiThemeService;
      if (this.themeService && this.themeService.eventBus) {
        this.themeService.eventBus.add('themeChanged', this.refreshColor);
      }
      this.refreshColor();
    }
  }

  refreshColor = () => {
    if (this.themeService) {
      this.AXIS_COLOR = this.themeService.currentTheme.data['devui-dividing-line'];
      this.AXIS_LABEL_COLOR = this.themeService.currentTheme.data['devui-aide-text'];
    }
    this.resetAxis();
  };

  resetAxis() {
    this.initAxisData();
    this.setAxisData();
    this.drawAxis();
    this.drawAxisLabels();
  }

  initAxisData() {
    this.quadrantAxis = this.elementRef.nativeElement.querySelector('d-quadrant-diagram#' + this.diagramId + ' canvas');
    this.quadrantAxis.width = this.view.width;
    this.quadrantAxis.height = this.view.height;
  }
  setAxisData() {
    this.context = this.quadrantAxis.getContext('2d');
    this.axisOrigin = this.axisConfigs.axisOrigin;
    this.axisTop = this.axisConfigs.axisTop;
    this.axisRight = this.axisConfigs.axisRight;
    this.axisWidth = this.axisConfigs.axisWidth;
    this.axisHeight = this.axisConfigs.axisHeight;
    this.yAxisTicksNum = this.axisConfigs.yAxisTicksNum;
    this.xAxisTicksNum = this.axisConfigs.xAxisTicksNum;
    this.xTickSpacing = this.axisConfigs.xTickSpacing;
    this.yTickSpacing = this.axisConfigs.yTickSpacing;
  }

  drawAxis() {
    this.context.save();
    this.context.fillStyle = this.AXIS_COLOR;
    this.context.strokeStyle = this.AXIS_COLOR;
    this.drawXAxis();
    this.drawYAxis();
    this.context.lineWidth = 0.5;
    this.drawYAxisTicks();
    this.drawXAxisTicks();
    this.context.restore();
  }

  drawXAxisTicks() {
    let deltaY;
    for (let i = 1; i < this.xAxisTicksNum; i++) {
      this.context.beginPath();
      // 判断显示长刻度还是短刻度
      if (i % this.axisConfigs.xAxisRange.step === 0) {
        deltaY = this.axisConfigs.tickWidth;
      } else {
        deltaY = this.axisConfigs.tickWidth / 2;
      }
      this.context.moveTo(this.axisOrigin.x + i * this.xTickSpacing, this.axisOrigin.y - deltaY);
      this.context.lineTo(this.axisOrigin.x + i * this.xTickSpacing, this.axisOrigin.y + deltaY);
      this.context.stroke();
    }
  }

  drawYAxisTicks() {
    let deltaX;
    for (let i = 1; i < this.yAxisTicksNum; i++) {
      this.context.beginPath();
      if (i % this.axisConfigs.yAxisRange.step === 0) {
        deltaX = this.axisConfigs.tickWidth;
      } else {
        deltaX = this.axisConfigs.tickWidth / 2;
      }
      this.context.moveTo(this.axisOrigin.x - deltaX, this.axisOrigin.y - i * this.yTickSpacing);
      this.context.lineTo(this.axisOrigin.x + deltaX, this.axisOrigin.y - i * this.yTickSpacing);
      this.context.stroke();
    }
  }

  drawYAxis() {
    this.context.beginPath();
    this.context.moveTo(this.axisOrigin.x, this.axisOrigin.y);
    this.context.lineTo(this.axisOrigin.x, this.axisTop - this.axisConfigs.axisMargin);
    this.context.stroke();
    this.context.moveTo(this.axisOrigin.x, this.axisTop - this.axisConfigs.axisMargin);
    this.context.lineTo(this.axisOrigin.x + 5, this.axisTop - this.axisConfigs.axisMargin + 10);
    this.context.lineTo(this.axisOrigin.x - 5, this.axisTop - this.axisConfigs.axisMargin + 10);
    this.context.fill();
  }

  drawXAxis() {
    this.context.beginPath();
    this.context.moveTo(this.axisOrigin.x, this.axisOrigin.y);
    this.context.lineTo(this.axisRight + this.axisConfigs.axisMargin - 10, this.axisOrigin.y);
    this.context.stroke();
    // 绘制坐标轴三角形
    this.context.moveTo(this.axisRight + this.axisConfigs.axisMargin, this.axisOrigin.y);
    this.context.lineTo(this.axisRight + this.axisConfigs.axisMargin - 10, this.axisOrigin.y + 5);
    this.context.lineTo(this.axisRight + this.axisConfigs.axisMargin - 10, this.axisOrigin.y - 5);
    this.context.fill();
  }

  drawAxisLabels() {
    this.context.save();
    this.context.fillStyle = this.AXIS_LABEL_COLOR;
    this.drawXTicksLabels();
    this.drawYTicksLabels();
    this.context.restore();
    this.drawAxisTitle();
  }

  drawAxisTitle() {
    this.context.font = '12px Microsoft YaHei';
    this.context.textAlign = 'left';
    this.context.fillStyle = this.AXIS_LABEL_COLOR;
    const xLabelWidth = this.context.measureText(this.axisConfigs.xAxisLabel).width;
    this.rotateLabel(
      this.axisConfigs.xAxisLabel,
      this.axisRight + this.axisConfigs.axisMargin / 2,
      this.axisOrigin.y - xLabelWidth - AXIS_TITLE_SPACE
    );
    this.context.fillText(
      this.axisConfigs.yAxisLabel,
      this.axisOrigin.x + AXIS_TITLE_SPACE,
      this.axisTop - this.axisConfigs.axisMargin / 2
    );
  }

  drawXTicksLabels() {
    this.context.textAlign = 'center';
    this.context.textBaseline = 'top';
    for (let i = 0; i <= this.xAxisTicksNum; i++) {
      if (i % this.axisConfigs.xAxisRange.step === 0) {
        this.context.fillText(i, this.axisOrigin.x + i * this.xTickSpacing, this.axisOrigin.y + this.axisConfigs.spaceBetweenLabelsAxis);
      }
    }
  }

  drawYTicksLabels() {
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    for (let i = 0; i <= this.yAxisTicksNum; i++) {
      if (i % this.axisConfigs.yAxisRange.step === 0) {
        this.context.fillText(i, this.axisOrigin.x - this.axisConfigs.spaceBetweenLabelsAxis, this.axisOrigin.y - i * this.yTickSpacing);
      }
    }
  }

  rotateLabel(name, x, y) {
    for (let i = 0; i < name.length; i++) {
      const str = name.slice(i, i + 1).toString();
      if (str.match(/[A-Za-z0-9]/)) {
        this.context.save();
        this.context.translate(x, y);
        this.context.rotate((Math.PI / 180) * 90);
        this.context.textBaseline = 'bottom';
        this.context.fillText(str, 0, 0);
        this.context.restore();
        y += this.context.measureText(str).width;
      } else if (str.match(/[\u4E00-\u9FA5]/)) {
        this.context.save();
        this.context.textBaseline = 'top';
        this.context.fillText(str, x, y);
        this.context.restore();
        y += this.context.measureText(str).width;
      }
    }
  }
}
