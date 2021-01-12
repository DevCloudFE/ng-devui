import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { GanttBarStatus, GanttMilestone, GanttScaleDateInfo, GanttScaleUnit } from '../gantt.model';
import { GanttService } from '../gantt.service';

@Component({
  selector: 'd-gantt-scale',
  templateUrl: './gantt-scale.component.html',
  styleUrls: ['./gantt-scale.component.scss']
})
export class GanttScaleComponent implements OnInit, OnChanges, OnDestroy {
  scaleData: GanttScaleDateInfo[];
  ganttBarStatusHandler: Subscription;
  ganttSacleConfigHandler: Subscription;
  highlight: boolean;
  highlightStartText: string;
  highlightEndText: string;
  highlightMinWidth: number;

  SCALE_START_LABLE_OFFSET = 7;

  @Input() unit = GanttScaleUnit.day;
  @Input() height: number;
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() ganttBarContainerElement: HTMLElement;
  @Input() ganttScaleContainerOffsetLeft: number;
  @Input() milestoneList: GanttMilestone[];
  @Output() addMilestoneEvent = new EventEmitter<GanttScaleDateInfo>();
  constructor(private ganttService: GanttService) { }

  ngOnInit() {
    this.ganttBarStatusHandler = this.ganttService.ganttBarStatusChange.subscribe((status) => {
      this.ganttBarStatusChange(status);
    });

    this.ganttSacleConfigHandler = this.ganttService.ganttScaleConfigChange.subscribe((config) => {
      if (config.startDate) {
        this.startDate = config.startDate;
      }
      if (config.endDate) {
        this.endDate = config.endDate;
      }
      if (config.startDate || config.endDate) {
        this.scaleData = this.generateScaleData(this.startDate, this.endDate);
      }
      if (config.unit) {
        this.unit = config.unit;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  private generateScaleData(startDate: Date, endDate: Date): GanttScaleDateInfo[] {
    if (startDate && endDate) {
      const scaleData = [];
      let handleDate = startDate;
      while (!this.ganttService.isSomeDate(handleDate, endDate)) {
        const dateInfo = this.generateDateInfo(handleDate);
        scaleData.push(dateInfo);
        handleDate = this.getNextDay(new Date(handleDate));
      }
      return scaleData;
    }
  }

  private getNextDay(date: Date) {
    const nextDayDate = date.setDate(date.getDate() + 1);
    return new Date(nextDayDate);
  }

  private generateDateInfo(date: Date): GanttScaleDateInfo {
    const dateInfo = {
      dayOfMonthLabel: '',
      dayOfWeekLabel: '',
      monthLabel: '',
      yearLabel: '',
      date: date,
      monthStart: false,
      weekend: false,
      today: false,
      milestone: '',
      highlightStart: false,
      scaleStartVisable: true
    };

    const dayOfMonth = date.getDate();
    dateInfo.dayOfMonthLabel = dayOfMonth + '';
    if (dayOfMonth === 1) {
      dateInfo.monthStart = true;
    }

    const dayOfWeek = date.getDay();
    dateInfo.dayOfWeekLabel = dayOfWeek + '';
    if (dayOfWeek === 6) {
      dateInfo.weekend = true;
    }
    const month = date.getMonth() + 1;
    dateInfo.monthLabel = month + '';
    const year = date.getFullYear();
    dateInfo.yearLabel = year + '';
    if (this.ganttService.isSomeDate(date, new Date())) {
      dateInfo.today = true;
    }

    if (new Date(year, month - 1, dayOfMonth + this.SCALE_START_LABLE_OFFSET).getMonth() > month - 1) {
      dateInfo.scaleStartVisable = false;
    }
    if (this.milestoneList) {
      this.milestoneList.forEach((milestone) => {
        if (milestone.date) {
          if (this.ganttService.isSomeDate(milestone.date, dateInfo.date)) {
            dateInfo.milestone = milestone.lable;
          }
        }
      });
    }

    return dateInfo;
  }

  trackByFn(index, item) {
    return index;
  }

  private ganttBarStatusChange(status: GanttBarStatus) {
    this.highlight = status.focused;
    if (this.highlight) {
      this.scaleData.forEach((dateInfo, index) => {
        if (dateInfo.date >= status.startDate && dateInfo.date <= status.endDate) {
          dateInfo.highlight = true;
        } else {
          dateInfo.highlight = false;
        }
        dateInfo.highlightStart = false;
      });
      const highlightBarStartIndex =  this.scaleData.findIndex((data) => {
        return data.highlight;
      });
      if (highlightBarStartIndex > -1) {
        this.scaleData[highlightBarStartIndex].highlightStart = true;
      }

      const highlightData = this.scaleData.filter((data) => {
        return data.highlight;
      });

      if (highlightData.length === 0) {
        return;
      }

      if (highlightData.length === 1) {
        const startData = highlightData[0];
        this.highlightStartText = this.prefixZero(parseInt(startData.monthLabel, 10)) + '-' +
        this.prefixZero(parseInt(startData.dayOfMonthLabel, 10));
        const highlightWidth = this.ganttService.getScaleUnitPixel();
        if (highlightWidth < 40) {
          this.highlightMinWidth = 40;
        } else {
          this.highlightMinWidth = highlightWidth;
        }
      } else {
        const startData = highlightData[0];
        const endData = highlightData[highlightData.length - 1];
        this.highlightStartText = this.prefixZero(parseInt(startData.monthLabel, 10)) + '-' +
        this.prefixZero(parseInt(startData.dayOfMonthLabel, 10));
        this.highlightEndText = this.prefixZero(parseInt(endData.monthLabel, 10)) + '-' +
        this.prefixZero(parseInt(endData.dayOfMonthLabel, 10));
        const highlightWidth = highlightData.length * this.ganttService.getScaleUnitPixel();
        if (highlightWidth < 80) {
          this.highlightMinWidth = 80;
        } else {
          this.highlightMinWidth = highlightWidth;
        }
      }
    }
  }

  prefixZero(num: number) {
    return (Array(2).join('0') + num).slice(-2);
  }

  addMilestone(info: GanttScaleDateInfo) {
    this.addMilestoneEvent.emit(info);
  }

  ngOnDestroy() {
    if (this.ganttBarStatusHandler) {
      this.ganttBarStatusHandler.unsubscribe();
      this.ganttBarStatusHandler = null;
    }
    if (this.ganttSacleConfigHandler) {
      this.ganttSacleConfigHandler.unsubscribe();
      this.ganttSacleConfigHandler = null;
    }
  }
}
