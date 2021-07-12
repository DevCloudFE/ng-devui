import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class QuadrantDiagramService {
  document: Document;

  constructor(@Inject(DOCUMENT) private doc: any) {
    this.document = this.doc;
  }
  showAxisLine(x, y, diagramId, view, axisConfigs) {
    const horizontalLine = this.document.querySelector('d-quadrant-diagram#' + diagramId + ' .devui-horizontal-line') as HTMLElement;
    const verticalLine = this.document.querySelector('d-quadrant-diagram#' + diagramId + ' .devui-vertical-line') as HTMLElement;
    const labelXAxisValue = this.document.querySelector('d-quadrant-diagram#' + diagramId + ' #devui-label-x-axis-value') as HTMLElement;
    const labelYAxisValue = this.document.querySelector('d-quadrant-diagram#' + diagramId + ' #devui-label-y-axis-value') as HTMLElement;
    labelXAxisValue.textContent = this.getXAxisValue(view, axisConfigs, x);
    labelYAxisValue.textContent = this.getYAxisValue(view, axisConfigs, y);
    horizontalLine.style.top = y + 'px';
    horizontalLine.style.display = '';
    verticalLine.style.left = x + 'px';
    verticalLine.style.display = '';
  }
  hideAxisLine(diagramId) {
    const horizontalLine = this.document.querySelector('d-quadrant-diagram#' + diagramId + ' .devui-horizontal-line') as HTMLElement;
    const verticalLine = this.document.querySelector('d-quadrant-diagram#' + diagramId + ' .devui-vertical-line') as HTMLElement;
    verticalLine.style.display = 'none';
    horizontalLine.style.display = 'none';
  }
  setListPointerEvents(diagramId, value) {
    const ele = this.document.querySelectorAll('d-quadrant-diagram#' + diagramId + ' .devui-list-style');
    ele.forEach(element => {
      (element as HTMLElement).style.pointerEvents = value;
    });
  }
  getXAxisValue(view, axisConfigs, left) {
    return ((left - axisConfigs.originPosition.left) / axisConfigs.xTickSpacing).toFixed(1);
  }
  getYAxisValue(view, axisConfigs, top) {
    return ((view.height - top - axisConfigs.originPosition.bottom)
      / axisConfigs.yTickSpacing).toFixed(1);
  }
}
