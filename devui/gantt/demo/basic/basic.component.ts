import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { treeDataSource, SourceType } from '../mock-data';
import { GanttScaleUnit, GanttMilestone, GanttTaskInfo } from 'ng-devui/gantt/gantt.model';
import { GanttService } from 'ng-devui/gantt';
import { ColumnResizeEventArg, ColumnAdjustStrategy } from 'ng-devui/data-table/data-table.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit, AfterViewInit, OnDestroy {
  basicDataSource: Array<SourceType> = treeDataSource;
  @ViewChild('datatable', { read: ElementRef, static: true }) datatableElementRef: ElementRef;
  ganttScaleWidth: string;
  ganttBarContainerElement: Element;
  ganttScaleContainerOffsetLeft: number;
  ganttStartDate: Date;
  ganttEndDate: Date;
  unit = GanttScaleUnit.day;
  milestoneList: GanttMilestone[];
  ganttSacleConfigHandler: Subscription;
  originOffsetLeft: number;
  columnAdjustStrategy = ColumnAdjustStrategy.mousemove;

  constructor(private ganttService: GanttService) { }
  tableWidthConfig = [
    {
      field: 'title',
      width: '200px'
    },
    {
      field: 'name',
      width: '100px'
    },
    {
      field: 'status',
      width: '100px'
    },
    {
      field: 'gantt',
      width: this.ganttScaleWidth
    }
  ];

  ngOnInit() {
    const curDate = new Date();
    this.ganttStartDate = new Date(curDate.getFullYear(), 1, 1);
    this.ganttEndDate = new Date(curDate.getFullYear(), 2, 15);
    this.ganttService.setScaleConfig({
      startDate: this.ganttStartDate,
      endDate: this.ganttEndDate,
      unit: this.unit
    });
    this.ganttScaleWidth = this.ganttService.getDurationWidth(this.ganttStartDate, this.ganttEndDate) + 'px';
    this.tableWidthConfig[3].width = this.ganttScaleWidth;
    const milestone = {
      date: new Date(2020, 1, 8),
      lable: 'V1.2'
    };
    this.milestoneList = [];
    this.milestoneList.push(milestone);

    this.ganttSacleConfigHandler = this.ganttService.ganttScaleConfigChange.subscribe((config) => {
      if (config.startDate) {
        this.ganttStartDate = config.startDate;
      }
      if (config.endDate) {
        this.ganttEndDate = config.endDate;
      }
      if (config.startDate || config.endDate) {
        this.ganttScaleWidth = this.ganttService.getDurationWidth(this.ganttStartDate, this.ganttEndDate) + 'px';
        this.tableWidthConfig[3].width = this.ganttScaleWidth;
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.datatableElementRef.nativeElement) {
        this.ganttBarContainerElement = this.datatableElementRef.nativeElement.getElementsByTagName('table')[1];
        this.ganttScaleContainerOffsetLeft = this.datatableElementRef.nativeElement.getElementsByTagName('th')[3].offsetLeft;
      }
    });
  }

  goToday() {
    const today = new Date();
    const offset = this.ganttService.getDatePostionOffset(today);
    const scrollView = this.datatableElementRef.nativeElement.getElementsByClassName('scroll-view')[0];
    if (scrollView) {
      scrollView.scrollTo(offset, scrollView.scrollTop);
    }
  }

  onTableResize(event: ColumnResizeEventArg) {
    if (this.datatableElementRef.nativeElement) {
      this.ganttScaleContainerOffsetLeft = this.datatableElementRef.nativeElement.getElementsByTagName('th')[3].offsetLeft;
    }
  }

  increaseUnit() {
    if (this.unit === GanttScaleUnit.month) {
      return;
    }
    if (this.unit === GanttScaleUnit.week) {
      this.unit = GanttScaleUnit.month;
    }
    if (this.unit === GanttScaleUnit.day) {
      this.unit = GanttScaleUnit.week;
    }
    this.ganttService.setScaleConfig({unit: this.unit});
    this.ganttScaleWidth = this.ganttService.getDurationWidth(this.ganttStartDate, this.ganttEndDate) + 'px';
    this.tableWidthConfig[3].width = this.ganttScaleWidth;
  }

  reduceUnit() {
    if (this.unit === GanttScaleUnit.day) {
      return;
    }
    if (this.unit === GanttScaleUnit.week) {
      this.unit = GanttScaleUnit.day;
    }
    if (this.unit === GanttScaleUnit.month) {
      this.unit = GanttScaleUnit.week;
    }
    this.ganttService.setScaleConfig({unit: this.unit});
    this.ganttScaleWidth = this.ganttService.getDurationWidth(this.ganttStartDate, this.ganttEndDate) + 'px';
    this.tableWidthConfig[3].width = this.ganttScaleWidth;
  }

  onGanttBarMoveStart(info: GanttTaskInfo) {
    const scrollView = this.datatableElementRef.nativeElement.getElementsByClassName('scroll-view')[0];
    if (scrollView) {
      this.originOffsetLeft = scrollView.scrollLeft;
    }
  }

  onGanttBarMoving(info: GanttTaskInfo) {
    this.adjustScrollView(info);
  }

  onGanttBarResizeStart() {
    const scrollView = this.datatableElementRef.nativeElement.getElementsByClassName('scroll-view')[0];
    if (scrollView) {
      this.originOffsetLeft = scrollView.scrollLeft;
    }
  }

  onGanttBarResizing(info: GanttTaskInfo) {
    this.adjustScrollView(info);
  }

  adjustScrollView(info: GanttTaskInfo) {
    const moveOffset = info.moveOffset ? info.moveOffset : 0;
    const scrollView = this.datatableElementRef.nativeElement.getElementsByClassName('scroll-view')[0];
    if (scrollView) {
      scrollView.scrollTo(this.originOffsetLeft + moveOffset, scrollView.scrollTop);
    }
  }

  onGanttBarMove(info: GanttTaskInfo) {
    this.updateData(info);
  }

  onGanttBarResize(info: GanttTaskInfo) {
    this.updateData(info);
  }

  updateData(info: GanttTaskInfo) {
    const index = this.basicDataSource.findIndex((data) => {
      return data.title === info.title;
    });
    if (index > -1) {
      this.basicDataSource[index].startDate = info.startDate;
      this.basicDataSource[index].endDate = info.endDate;
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
