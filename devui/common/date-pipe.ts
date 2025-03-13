import { Pipe, PipeTransform } from '@angular/core';

import { I18nFormat } from 'ng-devui/i18n';

@Pipe({
    name: 'dDatePipe',
    standalone: false
})
export class DatePipe implements PipeTransform {
  transform(date: any, pattern: any): any {
    if (!date) {
      return;
    }
    return I18nFormat.formatDate(date, pattern);
  }
}
