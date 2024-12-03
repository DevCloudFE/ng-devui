import { Directive, ElementRef, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { GanttScaleUnit } from './gantt.model';

@Directive({
  selector: '[dGanttMarker]',
})
export class GanttMarkerDirective implements OnChanges, OnDestroy {
  @Input() ganttBarContainerElement: HTMLElement;
  @Input() ganttScaleContainerOffsetLeft: number;
  @Input() monthMark = false;
  @Input() weekend = false;
  @Input() today = false;
  @Input() index: number;
  @Input() milestone = '';
  @Input() unit: GanttScaleUnit;
  @Input() date: Date;
  @Input() last: boolean;
  @Input() showDaySplitLine = false;
  hostElement: HTMLElement;
  monthMarkElement: HTMLElement;
  weekendElement: HTMLElement;
  todayElement: HTMLElement;
  milestoneElement: HTMLElement;
  daySplitLineElement: HTMLElement;

  constructor(element: ElementRef, private renderer: Renderer2) {
    this.hostElement = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    const { index, ganttBarContainerElement, ganttScaleContainerOffsetLeft, monthMark, weekend, last, today, milestone, unit } = changes;
    if (this.showDaySplitLine && index) {
      if (this.index >= 0 && !this.daySplitLineElement && this.unit === GanttScaleUnit.day) {
        this.drawSplitLine();
      } else if (this.index >= 0 && this.daySplitLineElement && this.unit === GanttScaleUnit.day) {
        this.updateSplitLine();
      }
    }

    if (ganttBarContainerElement && this.ganttBarContainerElement) {
      this.initMarkElement();
    }

    if (ganttScaleContainerOffsetLeft && this.ganttScaleContainerOffsetLeft) {
      this.setElementsStyle();
    }

    if (monthMark) {
      if (this.monthMark) {
        this.initMarkElement();
      } else {
        this.destroyMarkElement('monthMark');
      }
    }

    if (weekend || last) {
      if (this.weekend && !this.last) {
        this.initMarkElement();
      } else {
        this.destroyMarkElement('weekend');
      }
    }

    if (today) {
      if (this.today) {
        this.initMarkElement();
      } else {
        this.destroyMarkElement('today');
      }
    }

    if (milestone) {
      if (this.milestone) {
        this.initMarkElement();
      } else {
        this.destroyMarkElement('milestone');
      }
    }

    if (unit && this.unit) {
      if (this.unit !== GanttScaleUnit.day) {
        this.destorySplitLine();
      }
      this.setElementsStyle();
    }
  }

  initMarkElement() {
    if (this.ganttBarContainerElement) {
      if (this.monthMark && !this.monthMarkElement) {
        const node = this.renderer.createElement('div');
        this.renderer.addClass(node, 'devui-mark-line');
        this.renderer.appendChild(this.ganttBarContainerElement, node);
        this.monthMarkElement = node;
        this.setElementsStyle();
      }
      if (this.weekend && !this.last && !this.weekendElement) {
        const node = this.renderer.createElement('div');
        this.renderer.addClass(node, 'devui-mark-stripe');
        this.renderer.addClass(node, this.unit);
        this.renderer.appendChild(this.ganttBarContainerElement, node);
        this.weekendElement = node;
        this.setElementsStyle();
      }
      if (this.today && !this.todayElement) {
        const node = this.renderer.createElement('div');
        this.renderer.addClass(node, 'devui-mark-line');
        this.renderer.addClass(node, 'today');
        this.renderer.addClass(node, this.unit);
        this.renderer.appendChild(this.ganttBarContainerElement, node);
        this.todayElement = node;
        this.setElementsStyle();
      }
      if (this.milestone && !this.milestoneElement) {
        const node = this.renderer.createElement('div');
        this.renderer.addClass(node, 'devui-mark-line');
        this.renderer.addClass(node, 'milestone');
        this.renderer.addClass(node, this.unit);
        this.renderer.appendChild(this.ganttBarContainerElement, node);
        this.milestoneElement = node;
        this.setElementsStyle();
      }
    }
  }

  drawSplitLine() {
    const node = this.renderer.createElement('div');
    this.renderer.addClass(node, 'devui-day-split-line');
    this.renderer.appendChild(this.ganttBarContainerElement, node);
    this.daySplitLineElement = node;
    this.updateSplitLine();
  }

  updateSplitLine() {
    this.ganttScaleContainerOffsetLeft = this.ganttScaleContainerOffsetLeft ? this.ganttScaleContainerOffsetLeft : 0;
    const leftOffset = this.hostElement.offsetLeft + this.ganttScaleContainerOffsetLeft + 'px';
    if (!this.weekend && this.index && this.daySplitLineElement) {
      this.renderer.setStyle(this.daySplitLineElement, 'left', leftOffset);
    }
  }

  destorySplitLine() {
    if (this.showDaySplitLine && this.daySplitLineElement) {
      this.renderer.removeChild(this.ganttBarContainerElement, this.daySplitLineElement);
      this.daySplitLineElement = null;
    }
  }

  removeMonthMark() {
    if (this.monthMarkElement) {
      this.renderer.removeChild(this.ganttBarContainerElement, this.monthMarkElement);
      this.monthMarkElement = null;
    }
  }

  removeWeekendMark() {
    if (this.weekendElement) {
      this.renderer.removeChild(this.ganttBarContainerElement, this.weekendElement);
      this.weekendElement = null;
    }
  }

  removeTodayMark() {
    if (this.todayElement) {
      this.renderer.removeChild(this.ganttBarContainerElement, this.todayElement);
      this.todayElement = null;
    }
  }

  removeMileStoneMark() {
    if (this.milestoneElement) {
      this.renderer.removeChild(this.ganttBarContainerElement, this.milestoneElement);
      this.milestoneElement = null;
    }
  }

  destroyMarkElement(type = 'all') {
    switch (type) {
    case 'monthMark':
      this.removeMonthMark();
      break;
    case 'weekend':
      this.removeWeekendMark();
      break;
    case 'today':
      this.removeTodayMark();
      break;
    case 'milestone':
      this.removeMileStoneMark();
      break;
    case 'all':
      this.removeMonthMark();
      this.removeWeekendMark();
      this.removeTodayMark();
      this.removeMileStoneMark();
      break;
    default:
      break;
    }
  }

  private setElementsStyle() {
    this.ganttScaleContainerOffsetLeft = this.ganttScaleContainerOffsetLeft ? this.ganttScaleContainerOffsetLeft : 0;
    const leftOffset = this.hostElement.offsetLeft + this.ganttScaleContainerOffsetLeft + 'px';
    if (this.monthMark && this.monthMarkElement) {
      this.renderer.setStyle(this.monthMarkElement, 'left', leftOffset);
    }

    if (this.weekend && this.weekendElement) {
      this.weekendElement.className = 'devui-mark-stripe ' + this.unit;
      this.renderer.setStyle(this.weekendElement, 'left', leftOffset);
    }

    if (this.today && this.todayElement) {
      this.todayElement.className = 'devui-mark-line today ' + this.unit;
      this.renderer.setStyle(this.todayElement, 'left', leftOffset);
    }

    if (this.milestone && this.milestoneElement) {
      this.milestoneElement.className = 'devui-mark-line milestone ' + this.unit;
      this.renderer.setStyle(this.milestoneElement, 'left', leftOffset);
    }
  }

  ngOnDestroy() {
    this.destroyMarkElement();
    this.destorySplitLine();
  }
}
