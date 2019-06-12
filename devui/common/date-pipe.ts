import { Pipe, PipeTransform } from '@angular/core';

import { formatDate } from '../utils/date-utils';

@Pipe({
  name: 'aveDatePipe'
})
export class DatePipe implements PipeTransform {
  transform(date: any, pattern: any): any {
    if (!date) {
      return;
    }
    return formatDate(date, pattern);
  }
}
