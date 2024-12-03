import { Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { QuadrantDiagramService } from '../quadrant-diagram.service';
import { IAxisConfigs, IViewConfigs } from '../quadrant-diagram.type';
import { LARGE_LABEL_SIZE_CENTER_POINT, NORMAL_LABEL_SIZE_CENTER_POINT, SMALL_LABEL_SIZE_CENTER_POINT } from '../quadrant.config';
@Component({
  selector: 'd-quadrant-label',
  templateUrl: './quadrant-label.component.html',
  styleUrls: ['./quadrant-label.component.scss'],
})
export class QuadrantLabelComponent implements OnChanges {
  @Input() currentLabelSize;
  @Input() labelData;
  @Input() axisConfigs: IAxisConfigs;
  @Input() view: IViewConfigs;
  @Input() normalLabelTemplate: TemplateRef<any>;
  @Input() largeLabelTemplate: TemplateRef<any>;
  @Input() smallLabelTemplate: TemplateRef<any>;
  @Input() dropScope;
  @Input() diagramId;
  currentCenterPoint;
  currentLabelTemplate;

  constructor(private quadrantDiagramService: QuadrantDiagramService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.currentLabelSize) {
      switch (this.currentLabelSize) {
      case 'small':
        this.currentCenterPoint = SMALL_LABEL_SIZE_CENTER_POINT;
        this.currentLabelTemplate = this.smallLabelTemplate;
        break;
      case 'normal':
        this.currentCenterPoint = NORMAL_LABEL_SIZE_CENTER_POINT;
        this.currentLabelTemplate = this.normalLabelTemplate;
        break;
      default:
        this.currentCenterPoint = LARGE_LABEL_SIZE_CENTER_POINT;
        this.currentLabelTemplate = this.largeLabelTemplate;
      }
    }
  }

  /**
  * @param offsetY the half height of label
  */
  getLabelTopValue(yAxisValue, offsetY) {
    return this.view.height - yAxisValue * this.axisConfigs.yTickSpacing - this.axisConfigs.originPosition.bottom - offsetY;
  }

  /**
  * @param offsetX the half width of label
  */
  getLabelLeftValue(xAxisValue, offsetX) {
    return xAxisValue * this.axisConfigs.xTickSpacing + this.axisConfigs.originPosition.left - offsetX;
  }
  showAxisLine(x, y) {
    const top = this.getLabelTopValue(y, 0);
    const left = this.getLabelLeftValue(x, 0);
    this.quadrantDiagramService.showAxisLine(left, top, this.diagramId, this.view, this.axisConfigs);
  }
  hideAxisLine() {
    this.quadrantDiagramService.hideAxisLine(this.diagramId);
  }
  handleDropOutRegion(event) {
    this.hideAxisLine();
    this.quadrantDiagramService.setListPointerEvents(this.diagramId, '');
  }
}
