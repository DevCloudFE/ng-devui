import { Component, DebugElement, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  GanttBarComponent, GanttModule, GanttScaleComponent, GanttScaleUnit,
  GanttService, GanttTaskInfo
} from 'ng-devui/gantt';
import { I18nModule } from 'ng-devui/i18n';
import { Subscription } from 'rxjs';
import { DomHelper } from '../utils/testing/dom-helper';

@Component({
    template: `
    <div #ganttContainer class="gantt-container">
    <div class="header" [style.width]="ganttScaleWidth">
    <d-gantt-scale [ganttBarContainerElement]="ganttBody"></d-gantt-scale>
    </div>
    <div #ganttBody class="body" [style.width]="ganttScaleWidth">
    <div class="item" *ngFor="let item of list">
        <d-gantt-bar
        [startDate]="item?.startDate"
        [endDate]="item?.endDate"
        [tipTemplateRef]="tipTemplate"
        [id]="item?.id"
        [progressRate]="item?.progressRate"
        (barMoveStartEvent)="onGanttBarMoveStart($event)"
        (barMovingEvent)="onGanttBarMoving($event)"
        (barResizeStartEvent)="onGanttBarResizeStart($event)"
        (barResizingEvent)="onGanttBarResizing($event)"
        (barMoveEndEvent)="onGanttBarMove($event)"
        (barResizeEndEvent)="onGanttBarResize($event)"
        (barProgressEvent)="onBarProgressEvent($event)"
        ></d-gantt-bar>
    </div>
    </div>
    </div>
    <ng-template #tipTemplate let-ganttInstance="ganttInstance" let-data="data">
    <div class="title">{{ data?.title }}</div>
    <div class="content">
    <div>持续时间：{{ ganttInstance?.duration }}</div>
    <div>当前进度：{{ (ganttInstance?.progressRate || 0) + '%' }}</div>
    <div>开始时间：{{ ganttInstance?.startDate | i18nDate: 'short' }}</div>
    <div>结束时间：{{ ganttInstance?.endDate | i18nDate: 'short' }}</div>
    </div>
    </ng-template>
  `,
    styles: [`.gantt-container {padding: 0 30px 0 30px; overflow: scroll;}
    .gantt-container .header {position: relative;border-bottom: 1px solid #adb0b8;}
    .gantt-container .body {position: relative;min-height: 400px;}.gantt-container .body .item {height: 40px;padding-top: 8px;}
    ::ng-deep .devui-gantt-tips .title {font-size: 14px;color: #252b3a;line-height: 24px;font-weight: bold;margin-bottom: 15px;}
    ::ng-deep .devui-gantt-tips .content {font-size: 12px;color: #252b3a;line-height: 24px;}`]
})
class TestGanttComponent implements OnInit, OnDestroy {
    @ViewChild('ganttContainer') ganttContainer: ElementRef;
    curYear = 2020;
    list = [{
        id: '1',
        title: 'title1',
        startDate: new Date(this.curYear, 4, 5),
        endDate: new Date(this.curYear, 4, 10),
        progressRate: 30
      }];
    ganttStartDate: Date;
    ganttEndDate: Date;
    unit = GanttScaleUnit.day;
    ganttScaleWidth: string;
    ganttSacleConfigHandler: Subscription;
    currentAction: string;

    constructor(private ganttService: GanttService) { }

    ngOnInit() {
        this.ganttStartDate = new Date(this.curYear, 4, 1);
        this.ganttEndDate = new Date(this.curYear, 5, 1);
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

    onGanttBarMoveStart(info: GanttTaskInfo) {
        this.currentAction = 'onGanttBarMoveStart';
    }

    onGanttBarMoving(info: GanttTaskInfo) {
        this.currentAction = 'onGanttBarMoving';
    }

    onGanttBarResizeStart(info: GanttTaskInfo) {
        this.currentAction = 'onGanttBarResizeStart';
    }

    onGanttBarResizing(info: GanttTaskInfo) {
        this.currentAction = 'onGanttBarResizing';
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
        this.currentAction = 'onBarProgressEvent';
    }

    ngOnDestroy() {
        if (this.ganttSacleConfigHandler) {
            this.ganttSacleConfigHandler.unsubscribe();
            this.ganttSacleConfigHandler = null;
        }
    }
}

describe('gantt', () => {
    describe('basic', () => {
        let fixture: ComponentFixture<TestGanttComponent>;
        let debugEl: DebugElement;
        let component: TestGanttComponent;
        let domHelper: DomHelper<TestGanttComponent>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GanttModule, I18nModule],
                declarations: [TestGanttComponent]
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(TestGanttComponent);
            debugEl = fixture.debugElement;
            component = debugEl.componentInstance;

            domHelper = new DomHelper(fixture);
            fixture.detectChanges();
        });

        it('should init ok', () => {
            expect(component).toBeTruthy();
            const header = debugEl.query(By.css('.header')).nativeElement;
            expect(header.style.width).toBe('1600px');
            const body = debugEl.query(By.css('.body')).nativeElement;
            expect(body.style.width).toBe('1600px');

            const ganttScale = debugEl.query(By.directive(GanttScaleComponent)).nativeElement;
            expect(ganttScale.clientWidth).toBe(1600);

            const scales = ganttScale.querySelectorAll('.devui-gantt-scale');
            expect(scales.length).toBe(31);

            const ganttBar = debugEl.query(By.directive(GanttBarComponent)).nativeElement;
            const ganttBarElement = ganttBar.querySelector('.devui-gantt-bar');
            expect(ganttBarElement.style.width).toBe('300px');
            expect(ganttBarElement.style.left).toBe('200px');

            const ganttBarTrack = ganttBar.querySelector('.devui-gantt-bar-track');
            expect(ganttBarTrack.style.width).toBe('30%');

            const ganttMonthMark = debugEl.query(By.css('.devui-mark-line')).nativeElement;
            expect(ganttMonthMark.style.left).toBe('0px');

            const ganttMarkStripes = debugEl.queryAll(By.css('.devui-mark-stripe'));
            expect(ganttMarkStripes.length).toBe(5);
            expect(ganttMarkStripes[0].nativeElement.style.left).toBe('50px');
        });

        it('should mouse over&leave on bar ok', fakeAsync(() => {
            const ganttBar = debugEl.query(By.directive(GanttBarComponent)).nativeElement;
            const ganttBarElement = ganttBar.querySelector('.devui-gantt-bar');
            ganttBarElement.dispatchEvent(new Event('mouseover'));
            tick(250);
            fixture.detectChanges();

            let ganttTips = document.querySelector('.devui-gantt-tips');
            expect(ganttTips).toBeTruthy();

            const ganttScale = debugEl.query(By.directive(GanttScaleComponent)).nativeElement;
            let highLight = ganttScale.querySelector('.scale-highlight');
            expect(highLight.clientWidth).toBe(300);

            const hightLightFirstChild = highLight.firstElementChild;
            expect(hightLightFirstChild.innerText).toBe('05-05');
            expect(hightLightFirstChild.nextElementSibling.innerText).toBe('05-10');

            ganttBarElement.dispatchEvent(new Event('mouseleave'));
            tick(250);
            fixture.detectChanges();
            ganttTips = document.querySelector('.devui-gantt-tips');
            expect(ganttTips).toBeNull();

            highLight = ganttScale.querySelector('.scale-highlight');
            expect(highLight).toBeNull();
        }));

        it('should drag progress ok', fakeAsync(() => {
            const ganttBar = debugEl.query(By.directive(GanttBarComponent)).nativeElement;
            const ganttBarElement = ganttBar.querySelector('.devui-gantt-bar');

            const ganttBarProgress = ganttBarElement.querySelector('.devui-gantt-bar-progress');
            ganttBarProgress.dispatchEvent(new MouseEvent('mousedown'));
            fixture.detectChanges();
            document.dispatchEvent(new MouseEvent('mousemove', <MouseEventInit>{ clientX: 440 }));
            fixture.detectChanges();

            document.dispatchEvent(new MouseEvent('mouseup'));
            fixture.detectChanges();

            const ganttBarTrack = ganttBar.querySelector('.devui-gantt-bar-track');
            expect(ganttBarTrack.style.width).toBe('70%');
            expect(component.currentAction).toBe('onBarProgressEvent');
        }));

        it('should drag bar ok', fakeAsync(() => {
            const ganttBar = debugEl.query(By.directive(GanttBarComponent)).nativeElement;
            const ganttBarMain = ganttBar.querySelector('.devui-gantt-main');
            ganttBarMain.dispatchEvent(new MouseEvent('mousedown'));
            fixture.detectChanges();
            expect(component.currentAction).toBe('onGanttBarMoveStart');

            document.dispatchEvent(new MouseEvent('mousemove', <MouseEventInit>{ clientX: 440 }));
            fixture.detectChanges();
            expect(component.currentAction).toBe('onGanttBarMoving');

            document.dispatchEvent(new MouseEvent('mouseup'));
            fixture.detectChanges();

            const ganttBarElement = ganttBar.querySelector('.devui-gantt-bar');
            expect(ganttBarElement.style.left).toBe('650px');

            const ganttScale = debugEl.query(By.directive(GanttScaleComponent)).nativeElement;
            const highLight = ganttScale.querySelector('.scale-highlight');
            const hightLightFirstChild = highLight.firstElementChild;
            expect(hightLightFirstChild.innerText).toBe('05-14');
            expect(hightLightFirstChild.nextElementSibling.innerText).toBe('05-19');
            expect(Number(component.list[0].startDate)).toBe(1589385600000);
        }));

        it('should resize bar ok', fakeAsync(() => {
            const ganttBar = debugEl.query(By.directive(GanttBarComponent)).nativeElement;
            const ganttBarDraggers = ganttBar.querySelectorAll('.devui-gantt-dragger');
            const draggerLeft = ganttBarDraggers[0];
            const draggerRight = ganttBarDraggers[1];

            const ganttBarElement = ganttBar.querySelector('.devui-gantt-bar');

            draggerRight.dispatchEvent(new MouseEvent('mousedown'));
            fixture.detectChanges();
            expect(component.currentAction).toBe('onGanttBarResizeStart');

            document.dispatchEvent(new MouseEvent('mousemove', <MouseEventInit>{ clientX: 50 }));
            fixture.detectChanges();
            expect(component.currentAction).toBe('onGanttBarResizing');

            document.dispatchEvent(new MouseEvent('mouseup'));
            fixture.detectChanges();
            expect(ganttBarElement.style.width).toBe('350px');
            expect(Number(component.list[0].endDate)).toBe(1589126400000);

            draggerLeft.dispatchEvent(new MouseEvent('mousedown'));
            fixture.detectChanges();
            expect(component.currentAction).toBe('onGanttBarResizeStart');

            document.dispatchEvent(new MouseEvent('mousemove', <MouseEventInit>{ clientX: -50 }));
            fixture.detectChanges();
            expect(component.currentAction).toBe('onGanttBarResizing');

            document.dispatchEvent(new MouseEvent('mouseup'));
            fixture.detectChanges();
            expect(ganttBarElement.style.left).toBe('150px');
            expect(ganttBarElement.style.width).toBe('400px');
            expect(Number(component.list[0].startDate)).toBe(1588521600000);

            const ganttScale = debugEl.query(By.directive(GanttScaleComponent)).nativeElement;
            const highLight = ganttScale.querySelector('.scale-highlight');
            expect(highLight.clientWidth).toBe(400);

            const hightLightFirstChild = highLight.firstElementChild;
            expect(hightLightFirstChild.innerText).toBe('05-04');
            expect(hightLightFirstChild.nextElementSibling.innerText).toBe('05-11');
        }));
    });
});
