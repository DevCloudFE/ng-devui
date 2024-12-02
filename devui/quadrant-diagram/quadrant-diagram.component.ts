import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { QuadrantDiagramService } from './quadrant-diagram.service';
import { IAxisConfigs, ILabelDataConfigs, IQuadrantConfigs, IViewConfigs, labelSize } from './quadrant-diagram.type';
import { DEFAULT_AXIS_CONFIGS, DEFAULT_QUADRANT_CONFIGS, LABEL_SIZE } from './quadrant.config';

@Component({
  selector: 'd-quadrant-diagram',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quadrant-diagram.component.html',
  styleUrls: ['./quadrant-diagram.component.scss'],
})
export class QuadrantDiagramComponent implements OnInit, OnChanges {
  static ID_SEED = 0;
  @Input() axisConfigs: IAxisConfigs = DEFAULT_AXIS_CONFIGS;
  @Input() quadrantConfigs: Array<IQuadrantConfigs> = DEFAULT_QUADRANT_CONFIGS;
  @Input() view: IViewConfigs = {
    height: 900,
    width: 950,
  };
  @Input() normalLabelTemplate: TemplateRef<any>;
  @Input() largeLabelTemplate: TemplateRef<any>;
  @Input() smallLabelTemplate: TemplateRef<any>;
  @Input() labelData: Array<ILabelDataConfigs> = [];
  @Input() currentLabelSize: labelSize = 'large';
  @Input() showQuadrants = true;
  @Input() diagramId;
  @Output() dropEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() zoomInEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() zoomOutEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() fullScreenEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() dropScope = 'default';
  @Input() showToolbar = true;
  private originHeight;
  private originWidth;
  isFullScreen = false;
  @HostBinding('attr.id')
  get id() {
    return this.diagramId;
  }
  constructor(private quadrantDiagramService: QuadrantDiagramService) {
    if (this.diagramId === undefined) {
      const id = QuadrantDiagramComponent.ID_SEED++;
      this.diagramId = 'devui-quadrant-diagram-' + id;
    }
  }
  ngOnInit(): void {
    this.initAxisData();
    this.originHeight = this.view.height;
    this.originWidth = this.view.width;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { axisConfigs, view } = changes;
    if (axisConfigs || view) {
      this.initAxisData();
      this.originHeight = this.view.height;
      this.originWidth = this.view.width;
    }
  }

  launchFullscreen({ isFullscreen }) {
    if (typeof window !== 'undefined' && isFullscreen) {
      this.isFullScreen = isFullscreen;
      this.view = {
        height: window.screen.height,
        width: window.screen.width,
      };
      this.initAxisData();
    } else {
      this.isFullScreen = isFullscreen;
      this.view = {
        height: this.originHeight,
        width: this.originWidth,
      };
      this.initAxisData();
    }
    this.fullScreenEvent.emit(isFullscreen);
  }

  onDrop(e: any) {
    const xAxisValue = this.quadrantDiagramService.getXAxisValue(this.view, this.axisConfigs, e.nativeEvent.offsetX);
    const yAxisValue = this.quadrantDiagramService.getYAxisValue(this.view, this.axisConfigs, e.nativeEvent.offsetY);
    this.quadrantDiagramService.setListPointerEvents(this.diagramId, '');
    this.quadrantDiagramService.hideAxisLine(this.diagramId);
    this.dropEvent.emit({ dragData: e.dragData, xAxisValue: xAxisValue, yAxisValue: yAxisValue });
  }

  initAxisData() {
    const axisConfigKeys = Object.keys(DEFAULT_AXIS_CONFIGS);
    for (let i = 0; i < axisConfigKeys.length; i++) {
      if (this.axisConfigs[axisConfigKeys[i]] === undefined) {
        this.axisConfigs[axisConfigKeys[i]] = DEFAULT_AXIS_CONFIGS[axisConfigKeys[i]];
      }
    }
    this.axisConfigs.axisOrigin = {
      x: this.axisConfigs.originPosition.left,
      y: this.view.height - this.axisConfigs.originPosition.bottom,
    };
    this.axisConfigs.axisTop = this.axisConfigs.axisMargin;
    this.axisConfigs.axisRight = this.view.width - this.axisConfigs.axisMargin;
    this.axisConfigs.axisWidth = this.axisConfigs.axisRight - this.axisConfigs.axisOrigin.x;
    this.axisConfigs.axisHeight = this.axisConfigs.axisOrigin.y - this.axisConfigs.axisTop;
    this.axisConfigs.yAxisTicksNum = this.axisConfigs.yAxisRange.max - this.axisConfigs.yAxisRange.min;
    this.axisConfigs.xAxisTicksNum = this.axisConfigs.xAxisRange.max - this.axisConfigs.xAxisRange.min;
    this.axisConfigs.xTickSpacing = this.axisConfigs.axisWidth / this.axisConfigs.xAxisTicksNum;
    this.axisConfigs.yTickSpacing = this.axisConfigs.axisHeight / this.axisConfigs.yAxisTicksNum;
  }

  zoomOut(size) {
    const index = LABEL_SIZE.indexOf(size);
    if (index > 0) {
      this.currentLabelSize = LABEL_SIZE[index - 1] as labelSize;
    }
    this.zoomOutEvent.emit(this.currentLabelSize);
  }

  zoomIn(size) {
    const index = LABEL_SIZE.indexOf(size);
    if (index < LABEL_SIZE.length - 1) {
      this.currentLabelSize = LABEL_SIZE[index + 1] as labelSize;
    }
    this.zoomInEvent.emit(this.currentLabelSize);
  }

  dragOverEvent(e) {
    this.quadrantDiagramService.setListPointerEvents(this.diagramId, 'none');
    this.quadrantDiagramService.showAxisLine(e.offsetX, e.offsetY, this.diagramId, this.view, this.axisConfigs);
  }

  handleDropOut() {
    this.quadrantDiagramService.setListPointerEvents(this.diagramId, '');
    this.quadrantDiagramService.hideAxisLine(this.diagramId);
  }
}
