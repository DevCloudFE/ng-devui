import { Component, OnInit } from '@angular/core';
import { I18nFormat } from 'ng-devui/i18n';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent implements OnInit {
  limit = 3 * 12 * 30 * 24 * 60 * 60; // 转换阈值设为三年
  dates = [];
  constructor() { }

  ngOnInit() {
    const year_relation = I18nFormat.formatDateTime(new Date().setFullYear(new Date().getFullYear() - 2));
    const month_relation =  I18nFormat.formatDateTime(new Date().setMonth(new Date().getMonth() - 2));
    const day_relation =  I18nFormat.formatDateTime(new Date().setDate(new Date().getDate() + 4));
    const minute_relation =  I18nFormat.formatDateTime(new Date().setMinutes(new Date().getMinutes() + 43));
    const just =  I18nFormat.formatDateTime(new Date().setSeconds(new Date().getSeconds() - 30));
    const over_limit = I18nFormat.formatDateTime(new Date().setFullYear(new Date().getFullYear() - 4));
    this.dates = [year_relation, month_relation, just, minute_relation, day_relation, over_limit];
  }

}
