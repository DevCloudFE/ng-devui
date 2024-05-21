import * as datefns from 'date-fns';

export function isValidDate(date: Date): boolean {
  return datefns.isDate(date) && !isNaN(date.getTime());
}

export function parseDate(date: any, pattern?: string): Date {
  if (!date) {
    return null;
  }

  if (datefns.isDate(date)) {
    return date;
  }
  const parsedDate = pattern ? datefns.parse(date, pattern, new Date())
    : datefns.parseISO(date);
  return isValidDate(parsedDate) ? parsedDate : new Date(date);
}

export function formatDate(date: Date, pattern = 'y-MM-dd HH:mm:ss'): string {
  return isValidDate(date) ? datefns.format(date, pattern) : '';
}
