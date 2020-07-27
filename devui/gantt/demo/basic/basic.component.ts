import { Subscription } from 'rxjs';
import { basicData } from './../mock-data';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { GanttService, GanttScaleUnit, GanttTaskInfo } from 'ng-devui/gantt';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('ganttContainer', { static: true }) ganttContainer: ElementRef;
  list = basicData;
  ganttStartDate: Date;
  ganttEndDate: Date;
  unit = GanttScaleUnit.day;
  ganttScaleWidth: string;
  ganttSacleConfigHandler: Subscription;
  originOffsetLeft = 0;
  scrollElement: HTMLElement;
  constructor(private ganttService: GanttService) { }

  ngOnInit() {
    const curDate = new Date();
    this.ganttStartDate = new Date(curDate.getFullYear(), 4, 1);
    this.ganttEndDate = new Date(curDate.getFullYear(), 10, 15);
    this.ganttService.setScaleConfig({
      startDate: this.ganttStartDate,
      endDate: this.ganttEndDate,
      unit: this.unit
    });
    this.ganttScaleWidth = this.ganttService.getDurationWidth(this.ganttStartDate, this.ganttEndDate) + 'px';
    this.ganttSacleConfigHandler = this.ganttService.ganttScaleConfigChange.subscribe((config) => {
      if (config.startDate) {
        this.ganttStartDate = config.startDate;
      }
      if (config.endDate) {
        this.ganttEndDate = config.endDate;
      }
      if (config.startDate || config.endDate) {
        this.ganttScaleWidth = this.ganttService.getDurationWidth(this.ganttStartDate, this.ganttEndDate) + 'px';
      }
    });
  }

  ngAfterViewInit() {
    this.scrollElement = this.ganttContainer.nativeElement;
  }

  onGanttBarMoveStart() {
    this.originOffsetLeft = this.scrollElement.scrollLeft;
  }

  onGanttBarMoving(info: GanttTaskInfo) {
    this.adjustScrollView(info);
  }

  onGanttBarResizeStart() {
    this.originOffsetLeft = this.scrollElement.scrollLeft;
  }

  onGanttBarResizing(info: GanttTaskInfo) {
    this.adjustScrollView(info);
  }

  adjustScrollView(info: GanttTaskInfo) {
    const moveOffset = info.moveOffset ? info.moveOffset : 0;
    this.scrollElement.scrollTo(this.originOffsetLeft + moveOffset, this.scrollElement.scrollTop);
  }

  onGanttBarMove(info: GanttTaskInfo) {
    this.updateData(info);
  }

  onGanttBarResize(info: GanttTaskInfo) {
    this.updateData(info);
  }

  updateData(info: GanttTaskInfo) {
    const index = this.list.findIndex((data) => {
      return data.id === info.id;
    });
    if (index > -1) {
      this.list[index].startDate = info.startDate;
      this.list[index].endDate = info.endDate;
    }
  }

  onBarProgressEvent(progress: number) {
    console.log(progress);
  }

  ngOnDestroy() {
    if (this.ganttSacleConfigHandler) {
      this.ganttSacleConfigHandler.unsubscribe();
      this.ganttSacleConfigHandler = null;
    }
  }
}
