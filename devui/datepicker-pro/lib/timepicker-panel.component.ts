import { Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
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
})
export class TimepickerPanelComponent implements OnInit, OnDestroy {

  firstList: Array<TimeObj> = [];
  secondList: Array<TimeObj> = [];
  thirdList: Array<TimeObj> = [];

  hourIndex = null;
  minIndex = null;
  secIndex = null;

  typeList = ['hour', 'min', 'sec'];

  unsubscribe$ = new Subject();
  i18nText: I18nInterface['datePickerPro'];
  i18nSubscription: Subscription;

  constructor(
    private ngZone: NgZone,
    private el: ElementRef,
    private pickSrv: DatepickerProService,
    protected i18n: I18nService
  ) {}

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
    this.pickSrv.toggleEvent.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(isOpen => {
      if (isOpen) {
        setTimeout(() => {
          this.initDateList(true);
        });
      }
    });

    this.pickSrv.updateTimeChange.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(value => {
      if (this.hourIndex !== value.hour) {
        this.chooseTime('hour', value.hour);
      }

      if (this.minIndex !== value.min) {
        this.chooseTime('min', value.min);
      }

      if (this.secIndex !== value.seconds) {
        this.chooseTime('sec', value.seconds);
      }
    });

    if (this.pickSrv.isRange) {
      this.pickSrv.activeInputChange.pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(type => {
        const isNull = (type === 'start' && !this.pickSrv.curRangeDate[0]) ||
          (type === 'end' && !this.pickSrv.curRangeDate[1]);
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
  }

  initDateList(justScroll = false) {
    if (this.pickSrv.curDate) {
      this.hourIndex = this.pickSrv.curDate.getHours();
      this.minIndex = this.pickSrv.curDate.getMinutes();
      this.secIndex = this.pickSrv.curDate.getSeconds();
    }
    this.typeList.forEach(type => {
      this.chooseTime(type, this[`${type}Index`], false, justScroll);
    });
  }

  chooseTime(type: string, index: number, handle = false, justScroll = false) {
    switch (type) {
    case 'hour':
      this.hourIndex = index;
      this.firstList = new Array(24).fill(1).map((t, i) => {
        return {
          time: i < 10 ? `0${i}` : String(i),
          type: 'hour',
          active: this.hourIndex === i,
          disabled: false
        };
      });
      this.setAllScroll(index, this.pickSrv.curMin, this.pickSrv.curSec, justScroll);
      break;
    case 'min':
      this.minIndex = index;
      this.secondList = new Array(60).fill(1).map((t, i) => {
        return {
          time: i < 10 ? `0${i}` : String(i),
          type: 'min',
          active: this.minIndex === i,
          disabled: false
        };
      });
      this.setAllScroll(this.pickSrv.curHour, index, this.pickSrv.curSec, justScroll);
      break;
    case 'sec':
      this.secIndex = index;
      this.thirdList = new Array(60).fill(1).map((t, i) => {
        return {
          time: i < 10 ? `0${i}` : String(i),
          type: 'sec',
          active: this.secIndex === i,
          disabled: false
        };
      });
      this.setAllScroll(this.pickSrv.curHour, this.pickSrv.curMin, index, justScroll);
    }

    if (handle) {
      this.pickSrv.selectedTimeChange.next({
        activeInput: this.pickSrv.currentActiveInput,
        hour: this.hourIndex,
        min: this.minIndex,
        seconds: this.secIndex
      });
    }
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
      window['requestAnimationFrame'] ||
      window['mozRequestAnimationFrame'] ||
      window['msRequestAnimationFrame'] ||
      window['oRequestAnimationFrame'];
    this.ngZone.runOutsideAngular(() =>
      reqAnimFrame(() => {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) {
          return;
        }
        this.scrollTo(element, to, duration - 10);
      })
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
