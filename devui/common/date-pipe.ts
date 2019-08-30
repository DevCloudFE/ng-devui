import { Pipe, PipeTransform } from '@angular/core';

import { formatDate } from 'ng-devui/utils';

@Pipe({
  name: 'dDatePipe'
})
export class DatePipe implements PipeTransform {
  transform(date: any, pattern: any): any {
    if (!date) {
      return;
    }
    return formatDate(date, pattern);
  }
}
