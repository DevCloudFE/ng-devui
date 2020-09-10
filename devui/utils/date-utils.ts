import * as isDate_ from 'date-fns/is_date';
import * as dateParse_ from 'date-fns/parse';
import * as dateFormat_ from 'date-fns/format';
const isDate: any = isDate_;
const dateParse: any = dateParse_;
const dateFormat: any = dateFormat_;

export function isValidDate(date: Date): boolean {
  return isDate(date) && !isNaN(date.getTime());
}

export function parseDate(date: any): Date {
  if (!date) {
    return null;
  }

  if (isDate(date)) {
    return date;
  }
  const parsedDate = dateParse(date);
  return isValidDate(parsedDate) ? parsedDate : null;
}

export function formatDate(date: Date, pattern = 'YYYY-MM-DD HH:mm:ss'): string {
  return isValidDate(date) ? dateFormat(date, pattern) : '';
}
