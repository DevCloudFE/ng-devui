import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { GanttService } from '../gantt.service';

@Component({
  selector: 'd-gantt-milestone',
  templateUrl: './gantt-milestone.component.html',
  styleUrls: ['./gantt-milestone.component.scss'],
})
export class GanttMilestoneComponent implements OnInit, OnChanges, OnDestroy {
  @Input() startDate: Date;
  @Input() title: string;
  @Input() id: string;

  left = 0;

  private ganttScaleStatusHandler: Subscription;

  constructor(private ganttService: GanttService) {}

  ngOnInit() {
    this.ganttScaleStatusHandler = this.ganttService.ganttScaleConfigChange.subscribe((config) => {
      if (config.startDate || config.unit) {
        this.left = this.ganttService.getDatePostionOffset(this.startDate);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.startDate) {
      this.left = this.ganttService.getDatePostionOffset(this.startDate);
    }
  }

  ngOnDestroy(): void {
    if (this.ganttScaleStatusHandler) {
      this.ganttScaleStatusHandler.unsubscribe();
      this.ganttScaleStatusHandler = null;
    }
  }
}
