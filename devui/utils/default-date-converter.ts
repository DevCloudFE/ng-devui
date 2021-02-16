import { I18nFormat } from 'ng-devui/i18n';
import { DateConverter } from './date-converter';
import { parseDate } from './date-utils';

export class DefaultDateConverter implements DateConverter {

  parse(date: any, pattern?: string, locale?: string): Date {
    return parseDate(date);
  }

  format(date: Date, pattern?: string, locale?: string): string {
    return I18nFormat.formatDate(date, pattern, locale);
  }

  formatDateTime(date: Date, pattern?: string, locale?: string): string {
    return I18nFormat.formatDateTimeWithoutGMT(date, pattern, locale);
  }
}
