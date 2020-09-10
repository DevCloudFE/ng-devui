import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GanttService } from 'ng-devui/gantt';

@Component({
  selector: 'd-reset-position',
  templateUrl: './reset-position.component.html',
  styleUrls: ['./reset-position.component.scss']
})
export class ResetPositionComponent implements OnInit, OnChanges {
  @Input() datatableElementRef: any;
  @Input() ganttScaleContainerOffsetLeft: number;
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() containerScrollLeft: number;
  visible = false;
  direction: string;
  position: number;
  scrollView: HTMLElement;
  constructor(private ganttService: GanttService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['startDate'] || changes['endDate'] || changes['ganttScaleContainerOffsetLeft'] || changes['containerScrollLeft']) {
      if (this.startDate && this.endDate && this.ganttScaleContainerOffsetLeft) {
        this.scrollView = this.datatableElementRef.elementRef.nativeElement.getElementsByClassName('scroll-view')[0];
        if (this.scrollView) {
          this.position = this.ganttService.getDatePostionOffset(this.startDate);
          const endPosition = this.ganttService.getDatePostionOffset(this.endDate);
          if (this.position + this.ganttScaleContainerOffsetLeft > this.scrollView.scrollLeft + this.scrollView.clientWidth) {
            this.visible = true;
            this.direction = 'right';
            return;
          }
          if (endPosition < this.scrollView.scrollLeft) {
            this.visible = true;
            this.direction = 'left';
            return;
          }
          this.visible = false;
        }
      }
    }
  }

  reset() {
    if (this.scrollView) {
      this.scrollView.scrollTo(this.position, 0);
      this.visible = false;
    }
  }
}
