import { Component, OnInit } from '@angular/core';
import { I18nFormat } from 'ng-devui/i18n';

@Component({
    selector: 'd-custom-time',
    templateUrl: './custom-time.component.html',
    standalone: false
})
export class CustomTimeComponent implements OnInit {
  limit = 3 * 12 * 30 * 24 * 60 * 60; // three years
  dates = [];
  compareTime = '2015/5/20 12:00:00';
  constructor() { }

  ngOnInit() {
    const year_relation = new Date('2014/5/20 12:00:00');
    const month_relation =  new Date('2015/6/20 12:00:00');
    const day_relation =  new Date('2015/5/19 12:00:00');
    const minute_relation =  new Date('2015/5/20 12:18:00');
    const just =  new Date('2015/5/20 12:00:30');
    const over_limit = new Date('2011/5/20 12:00:00');
    this.dates = [year_relation, month_relation, just, minute_relation, day_relation, over_limit];
  }

  getStringName(time): string {
    return I18nFormat.formatDateTime(time);
  }

}
