import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ColumnAdjustStrategy, ColumnResizeEventArg } from 'ng-devui/data-table';
import { GanttMilestone, GanttScaleUnit, GanttService, GanttTaskInfo } from 'ng-devui/gantt';
import { Subscription } from 'rxjs';
import { SourceType, curYear, treeDataSource } from '../mock-data';

const DEFAULT_WIDTH_CONFIG = [
  {
    field: 'title',
    width: '200px',
  },
  {
    field: 'name',
    width: '100px',
  },
  {
    field: 'status',
    width: '100px',
  },
];

@Component({
  selector: 'd-table-gantt',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [GanttService],
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  curYear = curYear;
  basicDataSource: Array<SourceType> = treeDataSource;
  @ViewChild('datatable', { read: ElementRef, static: true }) datatableElementRef: ElementRef;
  ganttScaleWidth: string;
  ganttBarContainerElement: HTMLElement;
  resizeHandleContainerElement: Element;
  ganttScaleContainerOffsetLeft: number;
  ganttStartDate: Date;
  ganttEndDate: Date;
  unit = GanttScaleUnit.day;
  milestoneList: GanttMilestone[];
  ganttSacleConfigHandler: Subscription;
  originOffsetLeft = 0;
  columnAdjustStrategy = ColumnAdjustStrategy.mousemove;
  tableScrollLeft = 0;
  isFullScreen = false;
  tableWidthConfig = [
    {
      field: 'gantt',
      width: null,
    },
  ];
  scrollView: HTMLElement;
  startMove = false;
  startMoveX = 0;
  originOffsetX = 0;
  scaleStep = 50;
  expand = true;
  private mouseDownHandler: Subscription | null;
  private mouseMoveHandler: Subscription | null;
  private mouseEndHandler: Subscription | null;

  constructor(private ganttService: GanttService) {
    this.tableWidthConfig = DEFAULT_WIDTH_CONFIG.concat(this.tableWidthConfig);
  }

  ngOnInit() {
    this.ganttStartDate = new Date(curYear, 0, 1);
    this.ganttEndDate = new Date(curYear, 11, 31);
    this.ganttService.setScaleConfig({
      startDate: this.ganttStartDate,
      endDate: this.ganttEndDate,
      unit: this.unit,
    });
    this.ganttScaleWidth = this.ganttService.getDurationWidth(this.ganttStartDate, this.ganttEndDate) + 'px';
    this.tableWidthConfig[3].width = this.ganttScaleWidth;
    const milestone: GanttMilestone = {
      date: new Date(curYear, 4, 10),
      lable: 'V1.2',
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
        const len = this.tableWidthConfig.length;
        this.tableWidthConfig[len - 1].width = this.ganttScaleWidth;
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.datatableElementRef.nativeElement) {
        this.ganttBarContainerElement = this.datatableElementRef.nativeElement.getElementsByTagName('table')[1];
        this.resizeHandleContainerElement = this.datatableElementRef.nativeElement.getElementsByClassName('devui-table-view')[0];
        this.setOffset();
      }
      this.scrollView = this.datatableElementRef.nativeElement.getElementsByClassName('scroll-view')[0];
      this.ganttService.registContainerEvents(this.scrollView);
      this.mouseDownHandler = this.ganttService.mouseDownListener.subscribe(this.onMousedown.bind(this));
      this.mouseMoveHandler = this.ganttService.mouseMoveListener.subscribe(this.onMouseMove.bind(this));
      this.mouseEndHandler = this.ganttService.mouseEndListener.subscribe(this.onMouseEnd.bind(this));
      this.goToday();
    });
  }

  onMousedown(pageX) {
    this.startMove = true;
    this.originOffsetLeft = this.scrollView.scrollLeft;
    this.startMoveX = pageX;
  }

  onMouseMove(pageX) {
    if (this.startMove) {
      const moveOffset = this.startMoveX - pageX;
      this.scrollView.scrollTo(this.originOffsetLeft + moveOffset, this.scrollView.scrollTop);
    }
  }

  onMouseEnd() {
    this.startMove = false;
  }

  goToday() {
    const today = new Date();
    const offset = this.ganttService.getDatePostionOffset(today) - (this.scrollView.clientWidth - this.originOffsetX) / 2;
    if (this.scrollView) {
      this.scrollView.scrollTo(offset, this.scrollView.scrollTop);
    }
  }

  onTableResize(event: ColumnResizeEventArg) {
    if (this.datatableElementRef.nativeElement) {
      this.setOffset();
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
    const len = this.tableWidthConfig.length;
    this.tableWidthConfig[len - 1].width = this.ganttScaleWidth;
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
    const len = this.tableWidthConfig.length;
    this.tableWidthConfig[len - 1].width = this.ganttScaleWidth;
  }

  launchFullscreen({ isFullscreen }) {
    this.isFullScreen = isFullscreen;
    this.ganttService.setScaleConfig({ viewChange: true });
  }

  onGanttBarMoveStart() {
    this.originOffsetLeft = this.tableScrollLeft;
  }

  onGanttBarResizeStart() {
    this.originOffsetLeft = this.tableScrollLeft;
  }

  onGanttBarResizing(info: GanttTaskInfo) {
    this.adjustScrollView(info);
  }

  adjustScrollView(info: GanttTaskInfo) {
    console.log(info);
  }

  onGanttBarMove(info: GanttTaskInfo) {
    this.updateData(info);
  }

  onGanttBarResize(info: GanttTaskInfo) {
    this.updateData(info);
  }

  updateData(info: GanttTaskInfo) {
    const index = this.basicDataSource.findIndex((data) => {
      return data.id === info.id;
    });
    if (index > -1) {
      this.basicDataSource[index].startDate = info.startDate;
      this.basicDataSource[index].endDate = info.endDate;
    }
  }

  onBarProgressEvent(progress: number) {
    console.log(progress);
  }

  onTableScroll(event: Event) {
    const target = <HTMLElement>event?.target;
    if (target) {
      this.tableScrollLeft = target.scrollLeft;
    }
  }

  onResizeStart(event) {
    console.log(event);
  }

  onResizing(event) {
    console.log(event);
  }

  onResized(event) {
    const finalWidth = event.width + 'px';
    const index = this.tableWidthConfig.findIndex((i) => i.field === 'status');
    this.tableWidthConfig[index].width = finalWidth;
    setTimeout(() => {
      this.setOffset();
    });
  }

  onCollapse() {
    this.expand = !this.expand;
    this.expand
      ? (this.tableWidthConfig = DEFAULT_WIDTH_CONFIG.concat(this.tableWidthConfig))
      : (this.tableWidthConfig = this.tableWidthConfig.slice(3));
    setTimeout(() => {
      this.setOffset();
    });
  }

  setOffset() {
    const len = this.tableWidthConfig.length;
    this.ganttScaleContainerOffsetLeft = this.datatableElementRef.nativeElement.getElementsByTagName('th')[len - 1].offsetLeft;
    this.originOffsetX = this.ganttScaleContainerOffsetLeft + 20;
  }

  ngOnDestroy() {
    if (this.ganttSacleConfigHandler) {
      this.ganttSacleConfigHandler.unsubscribe();
      this.ganttSacleConfigHandler = null;
    }
  }
}
