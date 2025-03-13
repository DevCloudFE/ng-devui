import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GanttScaleUnit, GanttService, GanttTaskInfo } from 'ng-devui/gantt';
import { Subscription } from 'rxjs';
import { basicData, curYear } from './../mock-data';

@Component({
    selector: 'd-basic',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    providers: [GanttService],
    standalone: false
})
export class BasicComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('ganttContainer', { static: true }) ganttContainer: ElementRef;
  curYear = curYear;
  list = basicData;
  ganttStartDate: Date;
  ganttEndDate: Date;
  unit = GanttScaleUnit.day;
  ganttScaleWidth: string;
  ganttSacleConfigHandler: Subscription;
  originOffsetLeft = 0;
  scrollElement: HTMLElement;
  startMove = false;
  startMoveX = 0;
  isFullScreen = false;
  scaleStep = 50;
  private mouseDownHandler: Subscription | null;
  private mouseMoveHandler: Subscription | null;
  private mouseEndHandler: Subscription | null;

  constructor(private ganttService: GanttService, private ele: ElementRef) {}

  ngOnInit() {
    this.ganttStartDate = new Date(curYear, 0, 1);
    this.ganttEndDate = new Date(curYear, 11, 31);
    this.ganttService.setScaleConfig({
      startDate: this.ganttStartDate,
      endDate: this.ganttEndDate,
      unit: this.unit,
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
    this.list.forEach(item => this.updateBarData(item));
  }

  updateBarData(item) {
    item.overdueTime = this.getOverdueTime(item.endDate, new Date());
    if (item.overdueTime > 0 && item.status !== 'done') {
      item.status = 'overdue';
    } else if(item.overdueTime <= 0 && item.status !== 'done') {
      item.status = 'normal';
    }
  }

  updateBarItemStatus(item) {
    const barData = this.list.find(data => data.id === item.id);
    if (barData) {
      this.updateBarData(barData);
    }
  }

  getOverdueTime(startDate: Date, endDate: Date): number {
    if (startDate && endDate) {
      const timeOffset = endDate.getTime() - startDate.getTime();
      const duration = timeOffset / GanttService.DAY_DURATION;
      return Math.floor(duration);
    }
  }

  goToday() {
    const today = new Date();
    const offset = this.ganttService.getDatePostionOffset(today) - this.ganttService.getScaleUnitPixel() * 3;
    if (this.scrollElement) {
      this.scrollElement.scrollTo(offset, this.scrollElement.scrollTop);
    }
  }

  onIncreaseUnit() {
    if (this.unit === GanttScaleUnit.month) {
      return;
    }
    if (this.unit === GanttScaleUnit.week) {
      this.unit = GanttScaleUnit.month;
    }
    if (this.unit === GanttScaleUnit.day) {
      this.unit = GanttScaleUnit.week;
    }
    this.ganttService.setScaleConfig({ unit: this.unit });
    this.ganttScaleWidth = this.ganttService.getDurationWidth(this.ganttStartDate, this.ganttEndDate) + 'px';
  }

  onReduceUnit() {
    if (this.unit === GanttScaleUnit.day) {
      return;
    }
    if (this.unit === GanttScaleUnit.week) {
      this.unit = GanttScaleUnit.day;
    }
    if (this.unit === GanttScaleUnit.month) {
      this.unit = GanttScaleUnit.week;
    }
    this.ganttService.setScaleConfig({ unit: this.unit });
    this.ganttScaleWidth = this.ganttService.getDurationWidth(this.ganttStartDate, this.ganttEndDate) + 'px';
  }

  onSwitchView(unit) {
    this.unit = unit;
    this.ganttService.setScaleConfig({ unit });
    this.ganttScaleWidth = this.ganttService.getDurationWidth(this.ganttStartDate, this.ganttEndDate) + 'px';
  }

  launchFullscreen({ isFullscreen }) {
    this.isFullScreen = isFullscreen;
    this.ganttService.setScaleConfig({viewChange: true});
  }

  ngAfterViewInit() {
    this.scrollElement = this.ganttContainer.nativeElement;
    this.ganttService.registContainerEvents(this.scrollElement);
    this.mouseDownHandler = this.ganttService.mouseDownListener.subscribe(this.onMousedown.bind(this));
    this.mouseMoveHandler = this.ganttService.mouseMoveListener.subscribe(this.onMouseMove.bind(this));
    this.mouseEndHandler = this.ganttService.mouseEndListener.subscribe(this.onMouseEnd.bind(this));
    this.goToday();
  }

  onGanttBarMoveEnd (info: GanttTaskInfo) {
    this.updateData(info);
    this.updateBarItemStatus(info);
  }

  onMousedown(pageX) {
    this.startMove = true;
    this.originOffsetLeft = this.scrollElement.scrollLeft;
    this.startMoveX = pageX;
  }

  onMouseMove(pageX) {
    if (this.startMove) {
      const moveOffset = this.startMoveX - pageX;
      this.scrollElement.scrollTo(this.originOffsetLeft + moveOffset, this.scrollElement.scrollTop);
    }
  }

  onMouseEnd() {
    this.startMove = false;
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
    if (info.left + info.width > this.scrollElement.scrollLeft + this.scrollElement.clientWidth) {
      this.scrollElement.scrollTo(this.scrollElement.scrollLeft + this.scaleStep, this.scrollElement.scrollTop);
    }
    if (info.left < this.scrollElement.scrollLeft) {
      this.scrollElement.scrollTo(this.scrollElement.scrollLeft - this.scaleStep, this.scrollElement.scrollTop);
    }
  }

  onGanttBarMove(info: GanttTaskInfo) {
    this.updateData(info);
  }

  onGanttBarResize(info: GanttTaskInfo) {
    this.updateData(info);
    this.updateBarItemStatus(info);
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
    this.mouseDownHandler.unsubscribe();
    this.mouseMoveHandler.unsubscribe();
    this.mouseEndHandler.unsubscribe();
  }
}
