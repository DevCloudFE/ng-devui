import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatepickerProService } from '../datepicker-pro.service';

interface TimeObj {
  time: string;
  type?: string;
  active?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'd-timepicker-panel',
  templateUrl: './timepicker-panel.component.html',
  styleUrls: ['./timepicker-panel.component.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimepickerPanelComponent implements OnInit, OnDestroy {
  firstList: Array<TimeObj> = [];
  secondList: Array<TimeObj> = [];
  thirdList: Array<TimeObj> = [];

  hourIndex = 0;
  minIndex = 0;
  secIndex = 0;

  typeList = ['hour', 'min', 'sec'];

  unsubscribe$ = new Subject<void>();
  i18nText: I18nInterface['datePickerPro'];
  i18nSubscription: Subscription;

  constructor(private el: ElementRef, private pickSrv: DatepickerProService, protected i18n: I18nService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initDateList();
    this.initObservable();
    this.setI18nText();
  }

  setI18nText() {
    this.i18nText = this.i18n.getI18nText().datePickerPro;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.datePickerPro;
    });
  }

  initObservable() {
    this.pickSrv.toggleEvent.pipe(takeUntil(this.unsubscribe$)).subscribe((isOpen) => {
      if (isOpen) {
        setTimeout(() => {
          this.initDateList(true);
          this.cdr.detectChanges();
        });
      }
    });

    this.pickSrv.updateTimeChange.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (this.hourIndex !== value.hour) {
        this.chooseTime('hour', value.hour);
      }

      if (this.minIndex !== value.min) {
        this.chooseTime('min', value.min);
      }

      if (this.secIndex !== value.seconds) {
        this.chooseTime('sec', value.seconds);
      }
      this.cdr.detectChanges();
    });

    if (this.pickSrv.isRange) {
      this.pickSrv.activeInputChange.pipe(takeUntil(this.unsubscribe$)).subscribe((type) => {
        const isNull = (type === 'start' && !this.pickSrv.curRangeDate[0]) || (type === 'end' && !this.pickSrv.curRangeDate[1]);
        if (this.hourIndex !== this.pickSrv.curHour || isNull) {
          this.chooseTime('hour', isNull ? null : this.pickSrv.curHour);
        }

        if (this.minIndex !== this.pickSrv.curMin || isNull) {
          this.chooseTime('min', isNull ? null : this.pickSrv.curMin);
        }

        if (this.secIndex !== this.pickSrv.curSec || isNull) {
          this.chooseTime('sec', isNull ? null : this.pickSrv.curSec);
        }
      });
    }

    this.pickSrv.selectedDateChange.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      const isFixTime = this.fixTime();

      this.cdr.detectChanges();

      if (isFixTime) {
        setTimeout(() => {
          this.pickSrv.selectedTimeChange.next({
            activeInput: this.pickSrv.currentActiveInput,
            hour: this.hourIndex,
            min: this.minIndex,
            seconds: this.secIndex,
          });
        });
      }
    });
  }

  initDateList(justScroll = false) {
    if (this.pickSrv.curDate) {
      this.hourIndex = this.pickSrv.curDate.getHours();
      this.minIndex = this.pickSrv.curDate.getMinutes();
      this.secIndex = this.pickSrv.curDate.getSeconds();
    }
    this.typeList.forEach((type) => {
      this.chooseTime(type, this[`${type}Index`], false, justScroll);
    });
  }

  chooseTime(type: string, index: number, handle = false, justScroll = false) {
    if (this.itemIsDisabled(type, index)) {
      return;
    }
    let fixed: boolean;
    switch (type) {
    case 'hour':
      this.hourIndex = index;
      fixed = this.fixTime(justScroll);
      this.firstList = new Array(24).fill(1).map((t, i) => {
        return {
          time: i < 10 ? `0${i}` : String(i),
          type: 'hour',
          active: this.hourIndex === i,
        };
      });
      if (!fixed) {
        this.setScroll('first', this.hourIndex, justScroll);
      }
      break;
    case 'min':
      this.minIndex = index;
      this.fixTime(justScroll);
      this.secondList = new Array(60).fill(1).map((t, i) => {
        return {
          time: i < 10 ? `0${i}` : String(i),
          type: 'min',
          active: this.minIndex === i,
        };
      });
      if (!fixed) {
        this.setScroll('second', this.minIndex, justScroll);
      }
      break;
    case 'sec':
      this.secIndex = index;
      this.thirdList = new Array(60).fill(1).map((t, i) => {
        return {
          time: i < 10 ? `0${i}` : String(i),
          type: 'sec',
          active: this.secIndex === i,
        };
      });
      this.setScroll('third', this.secIndex, justScroll);
      break;
    default:
    }

    this.cdr.detectChanges();

    if (handle) {
      this.pickSrv.selectedTimeChange.next({
        activeInput: this.pickSrv.currentActiveInput,
        hour: this.hourIndex,
        min: this.minIndex,
        seconds: this.secIndex,
      });
    }
  }

  fixTime(justScroll = false) {
    let curTime: Date;

    if (this.pickSrv.isRange) {
      const target = this.pickSrv.curRangeDate[this.pickSrv.currentActiveInput === 'start' ? 0 : 1];
      if (!target) {
        return;
      }
      curTime = new Date(target);
    } else {
      if (!this.pickSrv.curDate) {
        return;
      }
      curTime = new Date(this.pickSrv.curDate);
    }
    curTime.setHours(this.hourIndex);
    curTime.setMinutes(this.minIndex);
    curTime.setSeconds(this.secIndex);

    let isFixTime = false;

    if (curTime.getTime() < this.pickSrv.minDate.getTime()) {
      this.pickSrv.curDate = this.pickSrv.minDate;
      isFixTime = true;
    }

    if (curTime.getTime() > this.pickSrv.maxDate.getTime()) {
      this.pickSrv.curDate = this.pickSrv.maxDate;
      isFixTime = true;
    }

    if (isFixTime) {
      this.initDateList(justScroll);
    }

    return isFixTime;
  }

  itemIsDisabled(type, index) {
    let curTime: Date;
    if (this.pickSrv.isRange) {
      const target = this.pickSrv.curRangeDate[this.pickSrv.currentActiveInput === 'start' ? 0 : 1];
      if (!target) {
        return false;
      }
      curTime = new Date(target);
    } else {
      if (!this.pickSrv.curDate) {
        return false;
      }
      curTime = new Date(this.pickSrv.curDate);
    }

    if (!curTime) {
      return false;
    }

    let flag = false;
    let time;
    let isTimeBoundary = false;
    const maxTime = this.pickSrv.maxDate.getTime();
    const minTime = this.pickSrv.minDate.getTime();
    switch (type) {
    case 'hour':
      curTime.setHours(index);
      curTime.setMinutes(this.minIndex);
      time = curTime.setSeconds(this.secIndex);
      isTimeBoundary = time > maxTime ? this.pickSrv.maxDate.getHours() === index : this.pickSrv.minDate.getHours() === index;
      break;
    case 'min':
      curTime.setHours(this.hourIndex);
      curTime.setMinutes(index);
      time = curTime.setSeconds(this.secIndex);
      isTimeBoundary = time > maxTime ? this.pickSrv.maxDate.getMinutes() === index : this.pickSrv.minDate.getMinutes() === index;
      break;
    case 'sec':
      curTime.setHours(this.hourIndex);
      curTime.setMinutes(this.minIndex);
      time = curTime.setSeconds(index);
      break;
    default:
    }
    flag = time > maxTime || time < minTime;

    return flag && !isTimeBoundary;
  }

  setAllScroll(first: number, second: number, third: number, justScroll: boolean) {
    this.setScroll('first', first, justScroll);
    this.setScroll('second', second, justScroll);
    this.setScroll('third', third, justScroll);
  }

  setScroll(whichList, index, justScroll?) {
    const scroll = (22 + 8) * index;
    const duration = justScroll ? 0 : 100;
    if (this.el) {
      this.scrollTo(this.el.nativeElement.querySelector(`.devui-${whichList}-list`), scroll, duration);
    }
  }

  scrollTo(element: HTMLElement, to: number, duration: number): void {
    if (typeof window === undefined || !element) {
      return;
    }
    if (duration <= 0) {
      element.scrollTop = to;
      return;
    }
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;
    const reqAnimFrame =
      (window as any).requestAnimationFrame ||
      (window as any).mozRequestAnimationFrame ||
      (window as any).msRequestAnimationFrame ||
      (window as any).oRequestAnimationFrame;
    reqAnimFrame(() => {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) {
        return;
      }
      this.scrollTo(element, to, duration - 10);
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
