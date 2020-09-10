import { Directive, ElementRef, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { GanttScaleUnit } from './gantt.model';

@Directive({
  selector: '[dGanttMarker]'
})
export class GanttMarkerDirective implements OnChanges, OnDestroy {
  @Input() ganttBarContainerElement: HTMLElement;
  @Input() ganttScaleContainerOffsetLeft: number;
  @Input() monthMark = false;
  @Input() weekend = false;
  @Input() today = false;
  @Input() milestone = false;
  @Input() unit: GanttScaleUnit;
  @Input() date: Date;
  @Input() last: boolean;
  hostElement: HTMLElement;
  monthMarkElement: HTMLElement;
  weekendElement: HTMLElement;
  todayElement: HTMLElement;
  milestoneElement: HTMLElement;

  constructor(element: ElementRef, private renderer: Renderer2) {
    this.hostElement = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ganttBarContainerElement'] && this.ganttBarContainerElement) {
      this.initMarkElement();
    }

    if (changes['ganttScaleContainerOffsetLeft'] && this.ganttScaleContainerOffsetLeft) {
      this.setElementsStyle();
    }

    if (changes['monthMark']) {
      if (this.monthMark) {
        this.initMarkElement();
      } else {
        this.destroyMarkElement('monthMark');
      }
    }

    if (changes['weekend'] || changes['last']) {
      if (this.weekend && !this.last) {
        this.initMarkElement();
      } else {
        this.destroyMarkElement('weekend');
      }
    }

    if (changes['today']) {
      if (this.today) {
        this.initMarkElement();
      } else {
        this.destroyMarkElement('today');
      }
    }

    if (changes['milestone']) {
      if (this.milestone) {
        this.initMarkElement();
      } else {
        this.destroyMarkElement('milestone');
      }
    }

    if (changes['unit'] && this.unit) {
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
  }
}
