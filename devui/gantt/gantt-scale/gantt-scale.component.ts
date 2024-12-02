import {
  Component, EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { fromEvent, Subscription } from 'rxjs';
import { GanttBarStatus, GanttMilestone, GanttScaleDateInfo, GanttScaleUnit } from '../gantt.model';
import { GanttService } from '../gantt.service';
@Component({
  selector: 'd-gantt-scale',
  templateUrl: './gantt-scale.component.html',
  styleUrls: ['./gantt-scale.component.scss'],
})
export class GanttScaleComponent implements OnInit, OnChanges, OnDestroy {
  scaleData: GanttScaleDateInfo[];
  viewScaleRange = [0, 0];
  viewSCaleData: GanttScaleDateInfo[] = [];
  ganttBarStatusHandler: Subscription;
  ganttSacleConfigHandler: Subscription;
  highlight: boolean;
  highlightStartText: string;
  highlightEndText: string;
  highlightMinWidth: number;

  SCALE_START_LABLE_OFFSET = 7;

  scaleWidth = {
    day: 40,
    week: 30,
    month: 20,
  };
  @Input() unit = GanttScaleUnit.day;
  @Input() height: number;
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() ganttBarContainerElement: HTMLElement;
  @Input() ganttScaleContainerOffsetLeft: number;
  @Input() milestoneList: GanttMilestone[];
  @Input() scrollElement: HTMLElement;
  @Input() showDaySplitLine = false;
  @Output() addMilestoneEvent = new EventEmitter<GanttScaleDateInfo>();

  private scrollHandler: Subscription;

  i18nText: I18nInterface['gantt'];
  i18nLocale: I18nInterface['locale'];
  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;
  constructor(private ganttService: GanttService, private i18n: I18nService) { }

  ngOnInit() {
    this.i18nText = this.i18n.getI18nText().gantt;
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nLocale = this.i18n.getI18nText().locale;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.gantt;
      this.i18nCommonText = data.common;
      this.i18nLocale = data.locale;
    });
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
        this.getViewScaleData();
      }
      if (config.unit) {
        if(this.unit === GanttScaleUnit.day && (config.unit === GanttScaleUnit.month || config.unit === GanttScaleUnit.week)) {
          this.clearDaySplitLine();
        }
        this.unit = config.unit;
        this.getViewScaleData();
      }
      if (config.viewChange){
        this.getViewScaleData();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (Object.prototype.hasOwnProperty.call(changes, 'scrollElement')) {
      this.registerScrollEvent();
    }
  }

  registerScrollEvent () {
    if (!this.scrollHandler && this.scrollElement) {
      this.scrollHandler = fromEvent(this.scrollElement, 'scroll').subscribe(e => {
        this.getViewScaleData();
      });
    }
  }

  getViewScaleData() {
    if (this.scrollElement) {
      const containerWidth = this.scrollElement.clientWidth;
      const scrollLeft = this.scrollElement.scrollLeft;
      const start = Math.floor(scrollLeft / this.scaleWidth[this.unit]);
      const offset = Math.ceil(containerWidth / this.scaleWidth[this.unit]);
      this.viewScaleRange = [start - 2, start + offset + 2];
      this.viewSCaleData = this.scaleData.filter((i: GanttScaleDateInfo) => {
        return i.index >= this.viewScaleRange[0] && i.index <= this.viewScaleRange[1];
      });
    }
  }

  private generateScaleData(startDate: Date, endDate: Date): GanttScaleDateInfo[] {
    if (startDate && endDate) {
      const scaleData = [];
      let handleDate = startDate;
      let index = 0;
      while (!this.ganttService.isSomeDate(handleDate, endDate)) {
        const dateInfo = this.generateDateInfo(handleDate, index);
        scaleData.push(dateInfo);
        handleDate = this.getNextDay(new Date(handleDate));
        index++;
      }
      return scaleData;
    }
  }

  private getNextDay(date: Date) {
    const nextDayDate = date.setDate(date.getDate() + 1);
    return new Date(nextDayDate);
  }

  private generateDateInfo(date: Date, index): GanttScaleDateInfo {
    const dateInfo: GanttScaleDateInfo = {
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
      scaleStartVisable: true,
      index
    };

    const dayOfMonth = date.getDate();
    dateInfo.dayOfMonthLabel = String(dayOfMonth);
    if (dayOfMonth === 1) {
      dateInfo.monthStart = true;
    }

    const dayOfWeek = date.getDay();
    dateInfo.dayOfWeekLabel = String(dayOfWeek);
    if (dayOfWeek === 6) {
      dateInfo.weekend = true;
    }
    const month = date.getMonth() + 1;
    dateInfo.monthLabel = String(month);
    const year = date.getFullYear();
    dateInfo.yearLabel = String(year);
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
        this.highlightStartText =
          this.prefixZero(parseInt(startData.monthLabel, 10)) + '-' + this.prefixZero(parseInt(startData.dayOfMonthLabel, 10));
        const highlightWidth = this.ganttService.getScaleUnitPixel();
        if (highlightWidth < 40) {
          this.highlightMinWidth = 40;
        } else {
          this.highlightMinWidth = highlightWidth;
        }
      } else {
        const startData = highlightData[0];
        const endData = highlightData[highlightData.length - 1];
        this.highlightStartText =
          this.prefixZero(parseInt(startData.monthLabel, 10)) + '-' + this.prefixZero(parseInt(startData.dayOfMonthLabel, 10));
        this.highlightEndText =
          this.prefixZero(parseInt(endData.monthLabel, 10)) + '-' + this.prefixZero(parseInt(endData.dayOfMonthLabel, 10));
        const highlightWidth = highlightData.length * this.ganttService.getScaleUnitPixel();
        if (highlightWidth < 84) {
          this.highlightMinWidth = 84;
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

  clearDaySplitLine() {
    if(this.showDaySplitLine && this.ganttBarContainerElement) {
      const dayLines = this.ganttBarContainerElement.querySelectorAll('.devui-day-split-line');
      dayLines.forEach(item => {
        const parent = item.parentElement;
        parent.removeChild(item);
      });
    }
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
    if (this.scrollHandler) {
      this.scrollHandler.unsubscribe();
    }
  }
}
