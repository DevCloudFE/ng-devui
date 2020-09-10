import { Component, OnInit,  Input, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { IQuadrantConfigs, IAxisConfigs, IViewConfigs } from '../quadrant-diagram.type';

@Component({
  selector: 'd-quadrant-region',
  templateUrl: './quadrant-region.component.html',
  styleUrls: ['./quadrant-region.component.scss']
})
export class QuadrantRegionComponent implements OnInit, OnChanges {
  @Input() quadrantConfigs: Array<IQuadrantConfigs>;
  @Input() axisConfigs: IAxisConfigs;
  @Input() view: IViewConfigs;
  @Input() labelData;
  @Input() normalLabelTemplate: TemplateRef<any>;
  @Input() largeLabelTemplate: TemplateRef<any>;
  @Input() smallLabelTemplate: TemplateRef<any>;
  @Input() currentLabelSize;
  @Input() showQuadrants;
  @Input() dropScope;
  @Input() diagramId;
  quadrantHeight: number;
  quadrantWidth: number;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && (changes['axisConfigs'] || changes['view'])) {
      this.drawQuadrantRegion();
    }
  }

  ngOnInit() {
    this.drawQuadrantRegion();
  }
  drawQuadrantRegion() {
    if (this.view && this.view.height) {
      this.quadrantHeight = (this.view.height - this.axisConfigs.axisMargin - this.axisConfigs.originPosition.bottom) / 2;
    }
    if (this.view && this.view.width) {
      this.quadrantWidth = (this.view.width - this.axisConfigs.axisMargin - this.axisConfigs.originPosition.left) / 2;
    }
  }

  getQuadrantTopValue(index) {
    let height = 0;
    if (index + 1 === 3 || index + 1 === 4) {
      height = this.quadrantHeight;
    }
    return this.axisConfigs.axisMargin + height;
  }
  getQuadrantLeftValue(index) {
    let width = 0;
    if (index + 1 === 1 || index + 1 === 4) {
      width = this.quadrantWidth;
    }
    return this.axisConfigs.originPosition.left + width;
  }
}
