import { DateConverter } from './date-converter';
import { formatDate, parseDate } from './date-utils';

export class DefaultDateConverter implements DateConverter {

  parse(date: any, pattern?: string, locale?: string): Date {
    return parseDate(date);
  }

  format(date: Date, pattern?: string, locale?: string): string {
    return formatDate(date, pattern);
  }
}
