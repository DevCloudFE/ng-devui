import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { I18nService } from 'ng-devui/i18n';
import * as datefns from 'date-fns';
import { Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Pipe({
  name: 'dRelativeTime'
})
export class RelativeTimePipe implements PipeTransform, OnDestroy {
  private _destroyed$ = new Subject();
  constructor(private i18n: I18nService) {}

  transform(
    value: string | number | Date, limit: number, compareDate?: string | number | Date, weekStartsOn = 1
  ): Observable<string | number | Date> {
    if (!value) {
      return of('');
    }
    const threshold = {
      month: 3, // at least 3 months using year.
      week: 4, // at least 4 weeks using month.
      day: 6, // at least 6 days using weeks.
      hour: 6, // at least 6 hours using day.
      minute: 59, // at least 59 minutes using hour.
      second: 59 // at least 59 seconds using minute.
    };

    const now = compareDate ? new Date(compareDate) : Date.now();

    const startOfYearForTarget = datefns.startOfYear(value);
    const startOfYearForToday = datefns.startOfYear(now);
    const diffYears = datefns.differenceInYears(startOfYearForToday, startOfYearForTarget);
    const absDiffYears = Math.abs(diffYears);

    const startOfMonthForTarget = datefns.startOfMonth(value);
    const startOfMonthForToday = datefns.startOfMonth(now);
    const diffMonths = datefns.differenceInMonths(startOfMonthForToday, startOfMonthForTarget);
    const absDiffMonths = Math.abs(diffMonths);

    const startOfWeekForTarget = datefns.startOfWeek(value, { weekStartsOn });
    const startOfWeekForToday = datefns.startOfWeek(now, { weekStartsOn });
    const diffWeeks = datefns.differenceInWeeks(startOfWeekForToday, startOfWeekForTarget);
    const absDiffWeeks = Math.abs(diffWeeks);

    const startOfDayForTarget = datefns.startOfDay(value);
    const startOfDayForToday = datefns.startOfDay(now);
    const diffDays = datefns.differenceInDays(startOfDayForToday, startOfDayForTarget);
    const absDiffDays = Math.abs(diffDays);

    const diffHours = datefns.differenceInHours(now, value);
    const absDiffHours = Math.abs(diffHours);

    const diffMinutes = datefns.differenceInMinutes(now, value);
    const absDiffMinutes = Math.abs(diffMinutes);

    const diffSeconds = datefns.differenceInSeconds(now, value);
    const absDiffSeconds = Math.abs(diffSeconds);

    return this.i18n.langChange().pipe(
      map((data) => {
        if (absDiffSeconds > limit) {
          return new Date(value);
        }
        const i18nCommonText = data['relativeTime'];
        if (absDiffYears > 0 && absDiffMonths > threshold.month) {
          return  diffYears > 0 ? i18nCommonText.yearsAgo(absDiffYears) : i18nCommonText.yearsLater(absDiffYears);
        } else if (absDiffMonths > 0 && absDiffWeeks >= threshold.week) {
          return  diffMonths > 0 ? i18nCommonText.monthsAgo(absDiffMonths) : i18nCommonText.monthsLater(absDiffMonths);
        } else if (absDiffWeeks > 0 && absDiffDays > threshold.day) {
          return  diffWeeks > 0 ? i18nCommonText.weeksAgo(absDiffWeeks) : i18nCommonText.weeksLater(absDiffWeeks);
        } else if (absDiffDays > 0 && absDiffHours > threshold.hour) {
          return  diffDays > 0 ? i18nCommonText.daysAgo(absDiffDays) : i18nCommonText.daysLater(absDiffDays);
        } else if (absDiffHours > 0 && absDiffMinutes > threshold.minute) {
          return absDiffHours + (diffHours > 0 ? i18nCommonText.hoursAgo : i18nCommonText.hoursLater);
        } else if (absDiffMinutes > 0 && absDiffSeconds > threshold.second) {
          return absDiffMinutes + (diffMinutes > 0 ? i18nCommonText.minutesAgo : i18nCommonText.minutesLater);
        } else if (diffSeconds) {
          return diffSeconds > 0 ? i18nCommonText.justnow : i18nCommonText.later;
        } else {
          return '';
        }
      }),
      takeUntil(this._destroyed$)
    );
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
