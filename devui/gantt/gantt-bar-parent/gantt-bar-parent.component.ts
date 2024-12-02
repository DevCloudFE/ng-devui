import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GanttService } from '../gantt.service';

@Component({
  selector: 'd-gantt-bar-parent',
  templateUrl: './gantt-bar-parent.component.html',
  styleUrls: ['./gantt-bar-parent.component.scss'],
})
export class GanttBarParentComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @ViewChild('ganttBarProgress') ganttBarProgress: ElementRef;
  @ViewChild('ganttBarTrack') ganttBarTrack: ElementRef;
  @ViewChild('ganttBarRail') ganttBarRail: ElementRef;
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() progressRate = 0;
  @Input() data: any;
  @Input() id: string;
  @Input() tip: string;

  private ganttScaleStatusHandler: Subscription;
  public tipHovered = false;
  percentage: number;
  left = 0;
  width = 0;
  private max = 100;
  private min = 0;
  public duration: string;

  constructor(private cdr: ChangeDetectorRef, private ganttService: GanttService) {}

  ngOnInit() {
    if (this.progressRate === null) {
      this.setValue(this.ensureValueInRange(null));
    }
    this.duration = this.ganttService.getDuration(this.startDate, this.endDate) + 'd';

    this.ganttScaleStatusHandler = this.ganttService.ganttScaleConfigChange.subscribe((config) => {
      if (config.startDate) {
        this.left = this.ganttService.getDatePostionOffset(this.startDate);
      }
      if (config.unit) {
        this.left = this.ganttService.getDatePostionOffset(this.startDate);
        this.width = this.ganttService.getDurationWidth(this.startDate, this.endDate);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const { progressRate, startDate, endDate } = changes;
    if (progressRate && this.progressRate > 0) {
      this.updateTrackAndHandle();
    }

    if (startDate) {
      this.left = this.ganttService.getDatePostionOffset(this.startDate);
      this.width = this.ganttService.getDurationWidth(this.startDate, this.endDate);
    }

    if (endDate) {
      this.width = this.ganttService.getDurationWidth(this.startDate, this.endDate);
    }
  }

  ngAfterViewInit() {
    if (this.progressRate && this.progressRate > 0) {
      this.updateTrackAndHandle();
    }
  }

  private setValue(value: number | null): void {
    if (this.progressRate !== value) {
      this.progressRate = value;
      this.updateTrackAndHandle();
    }
  }

  private ensureValueInRange(value: number | null): number {
    let safeValue;
    if (!this.valueMustBeValid(value)) {
      safeValue = this.min;
    } else {
      safeValue = this.clamp(this.min, value as number, this.max);
    }
    return safeValue;
  }

  private valueMustBeValid(value: number): boolean {
    return !isNaN(typeof value !== 'number' ? parseFloat(value) : value);
  }

  private clamp(min: number, n: number, max: number) {
    return Math.max(min, Math.min(n, max));
  }

  private updateTrackAndHandle(): void {
    const value = this.progressRate;
    const offset = this.valueToOffset(value);
    this.updateStyle(offset / 100);
    this.cdr.markForCheck();
  }

  private valueToOffset(value: number): number {
    return ((value - this.min) / (this.max - this.min)) * 100;
  }

  private updateStyle(percentage) {
    this.percentage = Math.min(1, Math.max(0, percentage));
    if (this.ganttBarTrack && this.ganttBarTrack.nativeElement) {
      this.ganttBarTrack.nativeElement.style.width = `${this.percentage * 100}%`;
    }

    if (this.ganttBarProgress && this.ganttBarProgress.nativeElement) {
      this.ganttBarProgress.nativeElement.style.left = `${this.percentage * 100}%`;
    }
  }

  ngOnDestroy(): void {
    if (this.ganttScaleStatusHandler) {
      this.ganttScaleStatusHandler.unsubscribe();
      this.ganttScaleStatusHandler = null;
    }
  }
}
