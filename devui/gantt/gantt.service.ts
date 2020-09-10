import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { GanttBarStatus, GanttScaleConfig, GanttScaleUnit } from './gantt.model';

@Injectable()
export class GanttService {
  static DAY_DURATION = 24 * 60 * 60 * 1000;
  scaleUnit = GanttScaleUnit.day;
  scaleStartDate: Date;
  scaleEndDate: Date;
  ganttBarStatusChange = new Subject<GanttBarStatus>();
  ganttScaleConfigChange = new ReplaySubject<GanttScaleConfig>(1);
  constructor() { }
  changeGanttBarStatus(status: GanttBarStatus) {
    this.ganttBarStatusChange.next(status);
  }

  changeGanttScaleConfig(status: GanttScaleConfig) {
    this.ganttScaleConfigChange.next(status);
  }

  setScaleConfig(config: GanttScaleConfig) {
    if (config.startDate) {
      this.scaleStartDate = config.startDate;
    }
    if (config.endDate) {
      this.scaleEndDate = config.endDate;
    }
    if (config.unit) {
      this.scaleUnit = config.unit;
    }
    this.changeGanttScaleConfig(config);
  }

  getScaleUnitPixel() {
    switch (this.scaleUnit) {
      case GanttScaleUnit.day:
        return 50;
        break;
      case GanttScaleUnit.week:
        return 20;
        break;
      case GanttScaleUnit.month:
        return 10;
        break;
      default:
        break;
    }
  }

  getDatePostionOffset(date: Date): number {
    if (date && this.scaleStartDate) {
      const timeOffset =  date.getTime() - this.scaleStartDate.getTime();
      const units =  timeOffset  / GanttService.DAY_DURATION;
      return units * this.getScaleUnitPixel();
    }
  }

  getDuration(startDate: Date, endDate: Date): number {
    if (startDate && endDate) {
      const timeOffset =  endDate.getTime() - startDate.getTime();
      const duration =  timeOffset / GanttService.DAY_DURATION + 1;
      return Math.round(duration);
    }
  }

  getDurationWidth(startDate: Date, endDate: Date): number {
    if (startDate && endDate) {
      const duration =  this.getDuration(startDate, endDate);
      return duration * this.getScaleUnitPixel();
    }
  }

  isSomeDate(date: Date, compareDate: Date) {
    if (date.getFullYear() !== compareDate.getFullYear()) {
      return false;
    }

    if (date.getMonth() !== compareDate.getMonth()) {
      return false;
    }

    if (date.getDate() !== compareDate.getDate()) {
      return false;
    }
    return true;
  }

  roundDate(date: Date) {
    if (date.getHours() >= 12) {
      date.setDate(date.getDate() + 1);
      date.setHours(0, 0, 0);
    } else if (date.getHours() < 12) {
      date.setHours(0, 0, 0);
    }
  }
}
